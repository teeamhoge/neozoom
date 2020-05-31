import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
    cursor: "pointer",
  },
}));

const Header = (props) => {
  const classes = useStyles();

  const handleClick = () => {
    window.location.href = "/";
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={handleClick}
        >
          NeoZoom
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
