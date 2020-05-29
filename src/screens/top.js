import React from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(24),
      height: theme.spacing(24),
    },
  },
}));

const Top = () => {

	const classes = useStyles();

	return (
		<div className = {classes.root}>
			<Paper evaluation = {0} >
				<Button variant = "contained" color = "primary">
					発行する
				</Button>
				<Typography variant = "h6" gutterBottom>発行ボタンを押してください</Typography>
				<Typography variant = "h6" gutterBottom>
					URL:
				</Typography>
			</Paper>
		</div>
	)
};

export default Top;
