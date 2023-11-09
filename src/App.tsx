import { useState, useEffect} from 'react';
import './App.css';

function App() {

  const [matches, setMatches] = useState([]);
  const [matchIds, setMatchIds] = useState([]);
  
  let puuid = '';

  useEffect(()=> {
    fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Cranius%20Maximus?api_key=RGAPI-5935eb9a-04fc-4685-82e0-d9b2bcb99281')
    .then(response => response.json())
    .then(res => puuid = res.puuid)
    .then(res => console.log(puuid))

    fetch('https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/2sE9ZrUxlk96A_WeMcksUpfSQ-qnsxayDu5VYbMaLpPORvQal1hlT5N09ww8n6edF2o7_Ngv6YyBgg/ids?start=0&count=20&api_key=RGAPI-5935eb9a-04fc-4685-82e0-d9b2bcb99281')
    .then(response => response.json())
    .then(res => console.log(res))
  }, [])
  return (
    <div className="App">
      Welcome to Dive!
    </div>
  );
}

export default App;
