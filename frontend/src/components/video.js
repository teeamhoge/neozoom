import React, { useState, useEffect } from "react";


import Transcript from "./transcript"
import Skyway from './skyway.js'

const Video = (props) => {

	const data = props.location.state;

	/*
	 * type definition of data
	 * {
	 *	room_id: string,
	 *	nickname: string,
	 *	sake: bool,
	 *	tame: bool,
	 * }
	*/

	const [ users, setUsers ] = useState([])


	useEffect(() => {

		const url = "ws://localhost:8080/ws/neozoom"

		let websocket = new WebSocket(url)

		websocket.onopen = () =>{
			websocket.send(JSON.stringify(data))
		}

		websocket.onmessage = (event) => {
			const data = JSON.parse(event.data)

			switch(data["msg"]){
				case "newuser":
					setUsers([...users, data["user"]])
					break

				case "roomusers":
					if(data["users"] === null){
						console.log("anyone in this room")
						break
					}
					setUsers(data["users"])
					break

				default:
					console.log("msg can't understand")
			}
			
		}
	}, [])
	



	return (
		<div>
			<Skyway room_id = {data.room_id} nickname = {data.nickname} />
			<Transcript />
		</div>
	)
};

export default Video;
