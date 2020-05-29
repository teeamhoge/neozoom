import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Top from "./screens/top";
import Video from "./screens/video";
import Profile from "./screens/profile";

function App() {
  return (
    <BrowserRouter>
      <div className="mainFlex">
        <Switch>
          <Route exact path="/" component={Top} />
          <Route exact path="/video" component={Video} />
          <Route exact path="/profile" component={Profile} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
