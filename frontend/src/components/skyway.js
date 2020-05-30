import React from "react"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

	app: {
		// 'backgroundColor' : "#ededed",
		// backgroundColor: 'green',

		'position': 'fixed',
		'width': theme.spacing(200),
		'height': '100%',
	}
}));



const Skyway = (props) => {
	
	const room_id = props.room_id
	const nickname = props.nickname


	const classes = useStyles()

	//TODO: connect skyway with room_id and nickname, display video windows in this component

	return (
		<div className = {classes.app}>
			here is skyway video windows room_id : {room_id}, nickname : {nickname}
		</div>
	)

}
export default Skyway;
