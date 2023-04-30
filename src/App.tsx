import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";

import './App.scss';

function App() {
  return (
    <BrowserRouter basename="/react-concurrency">
      <Router />
    </BrowserRouter>
  );
}

export default App

