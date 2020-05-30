package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type userData struct {
	Conn     *websocket.Conn
	IsConn   bool
	RoomID   string `json:"room_id"`
	Nickname string `json:"nickname"`
	Tame     bool   `json:"tame"`
	Sake     bool   `json:"sake"`
}

type MsgNewUser struct {
	User userData `json:"user"`
	Msg  string   `json:"msg"`
}

type MsgRoomUsers struct {
	Users []userData `json:"users"`
	Msg   string     `json:"msg"`
}

var (
	upgrader websocket.Upgrader
	rooms    map[string][]userData
	userChan chan userData
)

func wsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("open")
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal("connect websocket failed")
	}

	defer conn.Close()

	for {
		data := userData{}
		err := conn.ReadJSON(&data)
		if err != nil {
			log.Print("read message failed")
			break
		}

		fmt.Println("connected new user ", data.RoomID, data.Nickname)

		//register user to room
		data.Conn = conn
		data.IsConn = true

		fmt.Println(data)
		userChan <- data
	}

}

func joinUser() {
	for {
		fmt.Println("waiting for new user....")
		newUser := <-userChan
		fmt.Println(newUser)

		data := rooms[newUser.RoomID]
		fmt.Println(data)

		//broadcast new user data to users exists in room
		for _, usr := range data {

			if !usr.IsConn {
				continue
			}

			err := usr.Conn.WriteJSON(MsgNewUser{
				User: newUser,
				Msg:  "newuser",
			})

			if err != nil {
				log.Print("error occurred while sending new user data to room user")
				usr.Conn.Close()
				usr.IsConn = false
			}
		}

		//add new user to room, send exists user data to new user

		err := newUser.Conn.WriteJSON(MsgRoomUsers{
			Users: data,
			Msg:   "roomusers",
		})
		if err != nil {
			log.Print("error occured while sending users data in room to new user")
			continue
		}

		rooms[newUser.RoomID] = append(rooms[newUser.RoomID], newUser)

	}
}

func main() {

	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}

	userChan = make(chan userData)
	rooms = make(map[string][]userData)
	go joinUser()

	http.HandleFunc("/ws/neozoom", wsHandler)
	fmt.Println("neozoom websocket server starting on port 8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("error starting websocket server : ", err)
		return
	}
}
