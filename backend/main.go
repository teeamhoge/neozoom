package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var (
	upgrader websocket.Upgrader
	rooms    map[string][]*websocket.Conn
)

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal("connect websocket failed")
	}

	defer conn.Close()

}

func main() {

	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	fmt.Println("hello")
}
