import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // Update with your backend URL

const GameLobby = ({ sessionId }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("joinLobby", { sessionId });

    socket.on("updatePlayers", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId]);

  return (
    <div className="game-lobby">
      <h2>Game Lobby</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameLobby;
