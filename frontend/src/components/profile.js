import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(40),
    //   height: theme.spacing(40),
    // },
    marginTop: "5em",
  },
}));

const Profile = (props) => {
  const [nickname, setNickname] = useState("");
  const [tame, setTame] = useState(false);
  const [sake, setSake] = useState(false);

  const classes = useStyles();

  const urlParams = new URLSearchParams(window.location.search);

  const handleChangeTame = () => {
    setTame(!tame);
  };

  const handleChangeSake = () => {
    setSake(!sake);
  };

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleClick = () => {
    if (!nickname) {
      alert("あだ名を入力してね！");
      return;
    }
    const data = {
      room_id: urlParams.get("id"),
      nickname: nickname,
      tame: tame,
      sake: sake,
    };

    props.history.push({
      pathname: "/video",
      state: data,
    });
  };

  return (
    <div className={classes.root}>
      <Paper evaluation={3}>
        <div style={{ padding: "2em" }}>
          <div style={{ padding: "1em 0" }}>
            <TextField
              id="nickname"
              label="表示名"
              variant="outlined"
              onChange={handleChangeNickname}
            />
          </div>

          <div>
            <p style={{ display: "inline-block" }} variant="body2">
              タメ口OK
            </p>
            <Checkbox
              inputProps={{ "aria-label": "uncontrolled-checkbox" }}
              onChange={handleChangeTame}
              checked={tame}
              color="primary"
            />
          </div>
          <div>
            <p style={{ display: "inline-block" }} variant="body2">
              酒煽りOK
            </p>
            <Checkbox
              inputProps={{ "aria-label": "uncontrolled-checkbox" }}
              onChange={handleChangeSake}
              checked={sake}
              color="primary"
            />
          </div>
          <p>
            デフォルトでビデオがONになるので
            <br />
            気を付けてください★
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button variant="contained" color="primary" onClick={handleClick}>
              入室する
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Profile;
