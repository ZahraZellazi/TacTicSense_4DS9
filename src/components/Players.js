// src/components/Players.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './players.css';

export function Players() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/players');
        setPlayers(response.data.slice(0, 4)); // Display only 4 players
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="players-wrapper">
      <h2>Players</h2>
      <div className="players-grid">
        {players.map(player => (
          <div key={player.ID} className="player-card">
            <img src={player.Image_URL} alt={player.Name} className="player-image" />
            <h3>{player.Name}</h3>
            <p>Age: {player.Age}</p>
            <p>Overall Rating: {player.Overall_rating}</p>
            <p>Potential: {player.Potential}</p>
            <p>Team & Contract: {player.Team_Contract}</p>
            <p>Best Position: {player.Best_Position}</p>
            {/* Add more player details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
