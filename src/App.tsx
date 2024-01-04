import React, { useState, useEffect } from 'react';
import { key } from './apiKey';

interface Match {
  id: any;
  name: any;
  win: any;
}

function App() {
  const [matches, setMatches] = useState<{ id: any; name: any; win: any; }[]>([]);
  const [matchIds, setMatchIds] = useState([]);
  const [summonerName, setSummonerName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state


  let puuid:any;

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        setIsLoading(true); // Set loading to true when initiating API calls
        fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${key}`)//get puuid from summoner name, replace this with accountV1 get account by riotID
        .then(response => response.json())
        .then(res => {
          puuid = res.puuid;
          return fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${key}`);//get list of matchIds from puuid, this should in theory remain the same.
        })
        .then(response => response.json())
        .then(res => {
          console.log(res);
          // Update state with the fetched data if needed
          setMatchIds(res);
          return res;
        })
        .then(async (res) => {
          console.log("ids " + res);
          let matchData: Match[] = [];
        
          // Use Promise.all to parallelize asynchronous operations
          await Promise.all(res.map(async (matchId:any, index:any) => {
            try {
              const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${key}`);
              const data = await response.json();
              let participants = data.info.participants;
        
              for (let i = 0; i < participants.length; i++) {
                console.log(participants[i].puuid);
                if (puuid === participants[i].puuid) {
                  console.log('found');
                  matchData[index] = {
                    'id': matchId,
                    'name': participants[i].championName,
                    'win': participants[i].win,
                  };
                }
              }
            } catch (error) {
              console.error('Error fetching match details:', error);
            }
          }));
        
          setMatches(matchData.filter(Boolean)); // Filter out potential undefined elements
        })
        .catch(error => {
          console.error(error);
        });
      } catch (error) {
        console.error('Error:', error);
        // Handle errors as needed
      } finally {
        setIsLoading(false); // Set loading to false when API calls complete
      }
    }
  };



  return (
    <div className="App">
      <h1>Welcome to Dive!</h1>

      {/* Input box for summoner name */}
      <input
        type="text"
        placeholder="Enter Summoner Name"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      {/* Display loading message */}
      {isLoading && <p>Loading...</p>}

      {/* Display the match IDs */}
      <div>
        <h2>Match History:</h2>
        <ul>
          {matches.map(match => (
            <li style={{color:  match.win ? "deepskyblue " : "red"}} key={match.id}>{match.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;