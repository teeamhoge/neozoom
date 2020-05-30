import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Top from "./components/top";
import Video from "./components/video";
import Profile from "./components/profile";
import Header from "./components/header"

function App() {
  return (
    <BrowserRouter>
      <div className="mainFlex">
				<Header />
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
