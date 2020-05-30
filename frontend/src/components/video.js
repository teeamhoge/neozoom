import React, { Component } from "react";


import Transcript from "./transcript"
import Skyway from './skyway.js'


class Video extends Component {
	constructor(props) {
		super(props)
		this.state = {
			users: [],
			myProfile: this.props.location.state,
		}
	}

	componentDidMount(){


		const url = "ws://localhost:8080/ws/neozoom"

		let websocket = new WebSocket(url)

		websocket.onopen = () =>{
			websocket.send(JSON.stringify(this.state.myProfile))
		}

		websocket.onmessage = (event) => {
			const msg = JSON.parse(event.data)
			console.log(msg)

			switch(msg["msg"]){
				case "newuser":
					const newUsrs = [ ...this.state.users, msg.user ]
					this.setState({
						users: newUsrs
					})
					break;
				
				case "roomusers":
					if( msg.users === null ){
						break
					}
					this.setState({
						users: msg.users
					})

					break


				default:
					console.log("msg can't understand", event)
					break;
			}

		}

	}


	render(){
		console.log(this.state.myProfile)
		console.log(this.state.users)
		return(
			<div>

				<Skyway room_id = {this.state.myProfile.room_id} nickname = {this.state.myProfile.nickname} />

				<Transcript users = {this.state.users} />
			</div>
		)
	}
}



//
// const Video = (props) => {
//
// 	const data = props.location.state;
//
// 	/*
// 	 * type definition of data
// 	 * {
// 	 *	room_id: string,
// 	 *	nickname: string,
// 	 *	sake: bool,
// 	 *	tame: bool,
// 	 * }
// 	*/
//
// 	const [ users, setUsers ] = useState()
// 	console.log("initialized", users)
// 	useEffect(() => {
// 		console.log("use effect")
// 		setUsers([])
// 		const url = "ws://localhost:8080/ws/neozoom"
//
// 		let websocket = new WebSocket(url)
//
// 		websocket.onopen = () =>{
// 			websocket.send(JSON.stringify(data))
// 		}
//
// 		websocket.onmessage = (event) => {
// 			const data = JSON.parse(event.data)
//
// 			switch(data["msg"]){
// 				case "newuser":
// 					console.log(users)
// 					let newUsr = JSON.parse(JSON.stringify(users))
// 					console.log(newUsr)
// 					newUsr.push("hoge")
// 					console.log(newUsr)
// 					setUsers(newUsr)
// 					break;
//
// 				// case "roomusers":
// 				// 	if(data["users"] === null){
// 				// 		console.log("anyone in this room")
// 				// 		break
// 				// 	}
// 				// 	setUsers(["justdoit"])
// 				// 	break
//
// 				default:
// 					console.log("msg can't understand", event)
// 					break;
// 			}
// 				
// 		}}, [])
// 		
// 	
//
//
//
// 	return (
// 		
// 		<div>
// 			<button type = "button" onClick = {() => {console.log(users)}} >check</button>
// 			<Skyway room_id = {data.room_id} nickname = {data.nickname} />
// 		</div>
//
// 	)
// };
//
export default Video;
