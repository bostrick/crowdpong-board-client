
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "mobx-react";

import { Layout } from "./components/Layout";
import { Board } from "./components/Board";
import { Game } from "./stores/game";
import { KeyboardDriver } from "./drivers/keyboard";

import "./style.css";

let w = window as any;
const game = new Game(w.crowdpong_globals.api_base);
const kbd = new KeyboardDriver(game);

const App = () => (
  <Provider game={game}>
    <Layout />
  </Provider>
)

game.start();

ReactDOM.render(<App />, document.getElementById("app"));
