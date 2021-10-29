import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Error from "./components/Error";
import Gallery from "./components/Gallery";
import HeaderMenu from "./components/HeaderMenu";
import History from "./components/History";
import Start from "./components/Start";
import Statistics from "./components/Statistics";
import Vote from "./components/Vote";

function App() {
  return (
    <div className="App">
      <header>
        <HeaderMenu />
      </header>
      <main>
        <Switch>
          <Route path="/" exact>
            <Start />
          </Route>
          <Route path="/vote">
            <Vote />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/">
            <Error />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
