package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type userData struct {
	Conn     *websocket.Conn
	RoomID   string `json:room_id`
	Nickname string `json:"nickname"`
	Tame     bool   `json:"tame"`
	Sake     bool   `json:"sake"`
}

var (
	upgrader websocket.Upgrader
	rooms    map[string][]userData
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
		rooms[data.RoomID] = append(rooms[data.RoomID], data)

	}

}

func main() {

	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	fmt.Println("hello")
}
