import React from "react";
import {BrowserRouter, HashRouter} from "react-router-dom";
import { Router } from "./router";

import './App.scss';

function App() {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

export default App

