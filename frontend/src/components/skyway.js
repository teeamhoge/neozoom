import React from "react"

const Skyway = (props) => {
	
	const room_id = props.room_id
	const nickname = props.nickname

	//TODO: connect skyway with room_id and nickname, display video windows in this component

	return (
		<div>
			here is skyway video windows room_id : {room_id}, nickname : {nickname}
		</div>
	)

}
export default Skyway;
