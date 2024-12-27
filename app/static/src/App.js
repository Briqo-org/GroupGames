import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GameLobby from "./components/GameLobby";
import TriviaGame from "./components/TriviaGame";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lobby/:sessionId" element={<GameLobby />} />
        <Route path="/game/:sessionId" element={<TriviaGame />} />
      </Routes>
    </Router>
  );
};

export default App;
