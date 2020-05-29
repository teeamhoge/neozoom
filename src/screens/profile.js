import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(40),
      height: theme.spacing(40),
    },
  },
}));


const Profile = (props) => {

	const [ nickname, setNickname ] = useState("")
	const [ tame, setTame ] = useState(false)
	const [ sake, setSake ] = useState(false)

	const classes = useStyles()
	
	const urlParams = new URLSearchParams(window.location.search)


	const handleChangeTame = () => {
		setTame(!tame)
	}

	const handleChangeSake = () => {
		setSake(!sake)
	}

	const handleChangeNickname = (e) => {
		setNickname(e.target.value)
	}

	const handleClick = () => {
		const data = {
			room_id: urlParams.get("id"),
			nickname: nickname,
			tame: tame,
			sake: sake,
		}
		
		props.history.push({
			pathname: '/video',
			state: data,
		})
	}
	
		return (
		<div className = {classes.root}>
			<Paper evaluation = {3}>
				<div>
					<TextField
						id="nickname"
						label="表示名"
						variant="outlined"
						onChange = {handleChangeNickname}
					/>
				</div>

				<div>

					<Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} onChange = {handleChangeTame} checked = {tame}/>
					<Typography variant = "body2" >タメ口OK</Typography>

					<Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} onChange = {handleChangeSake} checked = {sake}/>
					<Typography variant = "body2" >酒煽りOK</Typography>

				</div>

				<Button variant="contained" color="primary" onClick = {handleClick}>
					入室する
				</Button>
			</Paper>
		</div>
	)
};

export default Profile;
