import React, { useState, useEffect } from 'react';
import { key } from './apiKey';
import Navbar from './components/Navbar';
import Matchhistory from './components/Matchhistory';

interface Match {
  id: any;
  name: any;
  win: any;
}

function App() {
  const [show, setShow] = useState(false);
  const [summonerName, setSummonerName] = useState('');
  const [refresh, setRefresh] = useState(0);




  return (
    <div className="App">
      <Navbar />
      <h1>Welcome to Dive!</h1>

      {/* Input box for summoner name */}
      <input
        type="text"
        placeholder="Enter Summoner Name"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (show) {
              // Refresh the component by updating the refresh value
              setRefresh(refresh + 1);
              
            } else {
              setShow(true);
            }
          }
        }}
      />

      {/* Display loading message */}

      {/* Display the match IDs */}

      {show && <Matchhistory summonerName = {summonerName} refresh={refresh} />}
      {/* <div>
        <h2>Match History:</h2>
        <ul>
          {matches.map(match => (
            <li style={{color:  match.win ? "deepskyblue " : "red"}} key={match.id}>{match.name}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default App;