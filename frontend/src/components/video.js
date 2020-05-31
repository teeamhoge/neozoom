import React, { Component } from "react";

import Transcript from "./transcript";
import Skyway from "./skyway.js";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      myProfile: this.props.location.state,
    };
  }

  componentDidMount() {
    const url = "ws://3.112.42.97:8080/ws/neozoom";
		console.log(url)
    let websocket = new WebSocket(url);

    websocket.onopen = () => {
      websocket.send(JSON.stringify(this.state.myProfile));
    };

    websocket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log(msg);

      switch (msg["msg"]) {
        case "newuser":
          const newUsrs = [...this.state.users, msg.user];
          this.setState({
            users: newUsrs,
          });
          break;

        case "roomusers":
          if (msg.users === null) {
            break;
          }
          this.setState({
            users: msg.users,
          });

          break;

        default:
          console.log("msg can't understand", event);
          break;
      }
    };
  }

  render() {
    console.log(this.state.myProfile);
    console.log(this.state.users);
    return (
      <div style={{ position: "relative" }}>
        <Skyway
          room_id={this.state.myProfile.room_id}
          nickname={this.state.myProfile.nickname}
        />

        <Transcript users={this.state.users} />
      </div>
    );
  }
}

export default Video;
