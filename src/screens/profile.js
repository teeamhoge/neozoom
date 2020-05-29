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


const Profile = () => {

	const [ nickname, setNickname ] = useState("")
	const [ tame, setTame ] = useState(false)
	const [ sake, setSake ] = useState(false)
	
	const classes = useStyles()

	return (
		<div className = {classes.root}>
			<Paper evaluation = {3}>
				<div>
					<TextField
						id="nickname"
						label="表示名"
						variant="outlined"
					/>
				</div>

				<div>

					<Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
					<Typography variant = "body2" >タメ口OK</Typography>

					<Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
					<Typography variant = "body2" >酒煽りOK</Typography>

				</div>

				<Button variant="contained" color="primary">
					入室する
				</Button>
			</Paper>
		</div>
	)
};

export default Profile;
