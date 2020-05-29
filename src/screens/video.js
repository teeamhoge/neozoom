import React from "react";
import Transcript from "./transcript"


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

	//TODO: connect skyway with data.room_id

	return (
		<div>
			<Transcript />
		</div>
	)
};

export default Video;
