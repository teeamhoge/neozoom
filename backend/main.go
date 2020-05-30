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
	RoomID   string `json:room_id`
	Nickname string `json:"nickname"`
	Tame     bool   `json:"tame"`
	Sake     bool   `json:"sake"`
}

var (
	upgrader websocket.Upgrader
	rooms    map[string][]userData
	userChan chan userData
)

func wsHandler(w http.ResponseWriter, r *http.Request) {
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

		//register user to room
		data.Conn = conn
		data.IsConn = true

	}

}

func joinUser() {
	for {
		newUser := <-userChan

		//broadcast new user data to users exists in room
		for _, usr := range rooms[newUser.RoomID] {

			if !usr.IsConn {
				continue
			}

			err := usr.Conn.WriteJSON(newUser)

			if err != nil {
				log.Print("error occurred while sending new user data to room user")
				usr.Conn.Close()
				usr.IsConn = false
			}
		}

		//add new user to room, send exists user data to new user

	}
}

func main() {

	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}

	http.HandleFunc("/ws/neozoom", wsHandler)
	fmt.Println("neozoom websocket server starting...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("error starting websocket server : ", err)
		return
	}
}
