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

	return (
		<div>
			<Skyway room_id = {data.room_id} nickname = {data.nickname} />
			<Transcript sake = {data.sake} tame = {data.tame} />
		</div>
	)
};

export default Video;
