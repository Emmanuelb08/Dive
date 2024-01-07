import React, { useState, useEffect } from 'react';
import {key} from '../apiKey';

type Props = {
    summonerName:string
    refresh:number
}

interface Match {
    id: any;
    name: any;
    win: any;
  }

const Matchhistory: React.FC<Props> = ({summonerName, refresh}) => {

    
  const [matches, setMatches] = useState<{ id: any; name: any; win: any; }[]>([]);
  const [matchIds, setMatchIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state


  let puuid:any;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${key}`);
        const res = await response.json();
        puuid = res.puuid;
        const matchIdsResponse = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${key}`);
        const matchIdsRes = await matchIdsResponse.json();
        setMatchIds(matchIdsRes);
        const matchData = await Promise.all(matchIdsRes.map(async (matchId: any, index: any) => {
          try {
            const matchResponse = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${key}`);
            const matchData = await matchResponse.json();
            let participants = matchData.info.participants;
            for (let i = 0; i < participants.length; i++) {
              if (puuid === participants[i].puuid) {
                return {
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
        setMatches(matchData.filter(Boolean));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Call the function to fetch data when the component is rendered
  }, [refresh]); // Ensure useEffect runs when refresh changes


    return (  
        <div>
        <h2>Match History:</h2>
        <ul>
          {matches.map(match => (
            <li style={{color:  match.win ? "deepskyblue " : "red"}} key={match.id}>{match.name}</li>
          ))}
        </ul>
      </div>
    );
}
 
export default Matchhistory;