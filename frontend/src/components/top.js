import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "5em",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    flexWrap: "wrap",
    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(40),
    //   height: theme.spacing(40),
    // },
  },
}));

const Top = () => {
  const classes = useStyles();
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    const unique_id = uuidv4();
    const room_url = `${window.location.protocol}//${window.location.host}/profile?id=${unique_id}`;
    setUrl(room_url);
  };

  const copyURL = () => {
    if (navigator.clipboard) {
      setCopied(true);
      navigator.clipboard.writeText(url);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className={classes.root}>
      <Paper evaluation={3}>
        <div style={{ padding: "3em" }}>
          {url === "" && (
            <Typography variant="h6" gutterBottom>
              ビデオチャットを作成します。
              <br />
              ボタンを押すと、共有用のURLが発行されます。
            </Typography>
          )}

          {url !== "" ? (
            <div style={{ padding: "2em" }}>
              <Typography variant="h6" gutterBottom>
                URLが発行されました。参加者に共有してくださいね！
              </Typography>
              <div style={{ height: "2em" }} />
              <Typography variant="h6" gutterBottom>
                URL:&nbsp; {url}
              </Typography>
              <div style={{ height: "2em" }} />
              <Button onClick={copyURL} variant="contained" color="primary">
                Copy
              </Button>
              <div
                style={{
                  height: "2em",
                  opacity: copied ? 1 : 0,
                  color: "green",
                }}
              >
                copied!
              </div>
            </div>
          ) : (
            <>
              <div style={{ height: "2em" }} />
              <Button variant="contained" color="primary" onClick={handleClick}>
                発行する
              </Button>
            </>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Top;
