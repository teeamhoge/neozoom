import React, { useState } from "react";

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
const useStyles = makeStyles((theme) => ({
  root: {
    //display: 'flex',
		textAlign: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(40),
      height: theme.spacing(40),
    },
  },
}));

const Top = () => {

	const classes = useStyles();
	const [ url, setUrl ] = useState("")

	const handleClick = () => {
		
		const unique_id = uuidv4();
		const room_url = `${window.location.protocol}//${window.location.host}/profile?id=${unique_id}`
		setUrl(room_url)

	}


	const copyURL = () => {
		if(navigator.clipboard){
			navigator.clipboard.writeText(url);
		}
	}

	return (
		<div className = {classes.root}>
			<Paper evaluation = {3} >
				<Button variant = "contained" color = "primary" onClick = {handleClick}>
					発行する
				</Button>

				{ url == "" &&
					<Typography variant = "h6" gutterBottom>
						発行ボタンを押してください
					</Typography>
				}

				{ url != "" &&
					<div>
						<Typography variant = "h6" gutterBottom>
							発行されました
						</Typography>
						<Typography variant = "h6" gutterBottom>
							URL:{url}
						</Typography>
						<Button onClick = {copyURL}>Copy</Button>
					</div>
				}
				
			</Paper>
		</div>
	)
};

export default Top;