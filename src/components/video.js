import React from "react";
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

	//TODO: connect to websocket server

	return (
		<div>
			<Skyway room_id = {data.room_id} nickname = {data.nickname} />
			<Transcript />
		</div>
	)
};

export default Video;
