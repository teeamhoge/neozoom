import React, { useEffect, useRef, useState } from "react";
import Peer from "skyway-js";
import { CallEnd, MicOff, Mic } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const peer = new Peer({
  key: "20f9e00a-7027-405e-9e2b-865f62c65268",
});

peer.on("error", (e) => console.error(e));
let a;

const Skyway = (props) => {
  const { room_id, nickname } = props;

  const [room, setRoom] = useState(null); // どっかのルームに入ってるかどうか
  const [muted, setMuted] = useState(false);
  const localVideo = useRef();
  const remoteVideos = useRef();
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => createStream(), []); //eslint-disable-line

  const createStream = async () => {
    await navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: { max: 400 }, height: { max: 300 } },
      })
      .then((i) => {
        localVideo.current.muted = true;
        localVideo.current.srcObject = i;
        localVideo.current.playsInline = true;
        localVideo.current.play().catch(console.error);
        if (room_id) enterRoom(i);
      })
      .catch(console.error);
  };

  if (!room_id) {
    return <div>共有リンクからはいってね！</div>;
  }

  const enterRoom = async (localStream) => {
    if (peer.open && room) clearTimeout(a);
    if (!peer.open) {
      console.log("peer not ready");
      a = setTimeout(() => enterRoom(localStream), 500);
    } else if (!room) {
      try {
        console.log("joining room");
        const room = await peer.joinRoom(room_id, {
          mode: "sfu",
          stream: localStream,
        });
        console.log("room object set");
        setRoom(room);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const handleLeave = () => {
    if (!room) {
      alert("部屋に参加してなかったよ");
      return;
    }
    room.close();
    console.log("I left");
    setRoom(null);
    history.push("/");
  };

  const handleMute = () => {
    console.log("mute", !muted);
    if (localVideo) localVideo.current.muted = !muted;
    setMuted(!muted);
  };

  if (room && !loaded) {
    setLoaded(true);
    console.log("eventlistener listening");
    room.on("peerJoin", (peerId) => console.log(`${peerId} joined`));

    room.on("peerLeave", (peerId) => {
      console.log(`${peerId} leaved`);
      if (
        !Array.from(remoteVideos.current.children)
          .map((i) => i.dataset.peerId)
          .includes(peerId)
      )
        return;
      try {
        const remoteVideo = remoteVideos.current.querySelector(
          `[data-peer-id=${peerId}]`
        );
        console.log(remoteVideo);
        remoteVideo.remove();
      } catch (e) {
        console.warn(e);
      }
    });

    room.on("stream", async (stream) => {
      if (
        Array.from(remoteVideos.current.children)
          .map((i) => i.dataset.peerId)
          .includes(stream.peerId)
      )
        return;

      const newDiv = document.createElement("div");
      const newVideo = document.createElement("video");
      newDiv.setAttribute("data-peer-id", stream.peerId);
      newDiv.setAttribute("style", "width:30vh;padding:1em;");
      newVideo.srcObject = stream;
      newVideo.playsInline = true;
      newVideo.setAttribute(
        "style",
        "transform: rotateY(180deg);objectFit: contain;height:100%;width:100% "
      );
      newDiv.append(newVideo);
      remoteVideos.current.append(newDiv);
      await newVideo.play().catch(console.error);
    });

    room.once("close", () => {
      Array.from(remoteVideos.current.children).forEach((remoteVideo) => {
        remoteVideo.remove();
      });
    });
  }

  return (
    <div
      style={{
        width: "70vw",
        height: "100%",
        minHeight: "100vh",
        display: "inline-block",
        backgroundColor: "#333",
      }}
    >
      {room && <h3>{room.name} で会話中</h3>}
      <div className="container">
        <div className="room">
          自分
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <div
              className="remote-streams"
              style={{ display: "flex", flexWrap: "wrap" }}
              id="js-remote-streams"
              ref={remoteVideos}
            >
              <div
                style={{
                  display: "inline-block",
                  // height: "100px",
                  width: "30vw",
                  padding: "1em",
                  position: "relative",
                }}
              >
                <video
                  ref={localVideo}
                  style={{
                    transform: "rotateY(180deg)",
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                ></video>
                {muted && (
                  <p
                    style={{
                      position: "absolute",
                      bottom: "1em",
                      right: "1em",
                      backgroundColor: "grey",
                      color: "white",
                      margin: 0,
                      padding: "5px",
                    }}
                  >
                    muted
                  </p>
                )}
                <div style={styles.myName}>{nickname}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={styles.fixedBottomBar}>
        <div
          style={{ ...styles.Icon, ...styles.muteIcon }}
          onClick={handleMute}
        >
          {muted ? (
            <MicOff className={`muteIcon`} />
          ) : (
            <Mic className={`muteIcon`} />
          )}
        </div>
        <div
          style={{ ...styles.Icon, ...styles.callend }}
          onClick={handleLeave}
        >
          <CallEnd className="callEndIcon" />
        </div>
      </div>
    </div>
  );
};

export default Skyway;

const styles = {
  fixedBottomBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "70vw",
    height: "60px",
    backgroundColor: "#111",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  callend: {
    backgroundColor: "#c62828",
  },
  muteIcon: {
    backgroundColor: "#424242",
    marginRight: "2em",
  },
  Icon: {
    padding: "0.5em",
    borderRadius: "50%",
    width: "2em",
    textAlign: "center",
    cursor: "pointer",
  },
  myName: {
    position: "absolute",
    bottom: "1em",
    left: "1em",
    backgroundColor: "grey",
    color: "white",
    margin: 0,
    padding: "5px",
  },
};
