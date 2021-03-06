import React, { useState, useEffect } from "react";
import { TinySegmenter } from "./tiny_segmenter";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  app: {
    backgroundColor: "#ededed",
    marginBottom: "70px",
    width: "30vw",
    // position: "fixed",
    // width: theme.spacing(48),
    height: "100vh",
    // right: 0,
    // top: 0,
  },
}));

const segmenter = new TinySegmenter();

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "ja-JP"; // 日本語対応
recognition.interimResults = true; // 発言の途中でも認識結果を得ることができる
recognition.continuous = true; // 認識する時間を半永久的に

function Transcript(props) {
  const [talk, setTalk] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    recognition.start();
  }, []);

  const [messages, setMessages] = useState([]);

  const classes = useStyles();

  const { alertMessage, setAlertMessage } = props;

  let finalTranscript = "";
  let tamepattern = ["です", "ます"];
  let sakepattern = ["飲め", "飲みな", "飲ま", "飲み", "酒飲", "酒飲み"];

  recognition.onresult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      let transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript = transcript;
        setTalk(interimTranscript);
      }
    }
    let text = segmenter.segment(finalTranscript).join(" | ");
    if (text) setResult([...result, text]);

    //Check Tame
    for (let i = 0; i < tamepattern.length; i++) {
      if (interimTranscript.indexOf(tamepattern[i]) > -1) {
        for (const user of props.users) {
          if (!user.tame) {
            setMessages([
              ...messages,
              `${user.nickname}さんがタメ語で話して欲しいと思っているかも知れません`,
            ]);
          }
        }
      }
    }

    //Check Sake
    for (let i = 0; i < sakepattern.length; i++) {
      if (interimTranscript.indexOf(sakepattern[i]) > -1) {
			
        for (const user of props.users) {
          if (!user.sake) {
						setMessages([
							...messages,
							`${user.nickname}さんがお酒煽りを嫌がっているかも知れません`,
						]);

          }
         }
      }
    }
  };

  return (
    <div className={classes.app}>
      <div id="result-div">
				<span style={{fontSize: "48px"}}>{result}</span> <span style={{ color: "#999", fontSize:"48px" }}>{talk}</span>
      </div>
      <div className={classes.messages}>
        {messages.map((val) => {
          return (
            <div>
							<span style={{ color: "red", fontSize: "32" }}>{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Transcript;
