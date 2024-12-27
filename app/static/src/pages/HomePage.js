import React, { useState } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();

  const startGame = async () => {
    try {
      // Call backend to start a new game session
      const response = await fetch("/start-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostName: "Host" }),
      });
      const data = await response.json();
      setSessionId(data.session_id);
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Could not start a new game. Please try again.");
    }
  };

  const goToLobby = () => {
    navigate(`/lobby/${sessionId}`);
  };

  return (
    <div className="home-page">
      <h1>Group Games</h1>
      <button onClick={startGame}>Start New Game</button>
      {sessionId && (
        <div className="qr-code">
          <QRCodeCanvas value={`${window.location.origin}/join/${sessionId}`} />
          <button onClick={goToLobby}>Go to Lobby</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
