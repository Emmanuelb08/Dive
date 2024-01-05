import React from "react";

type Props = {
    summonerName:string
}

const Matchhistory: React.FC<Props> = ({summonerName}) => {
    return (  
        <div> Match History {summonerName} </div>
    );
}
 
export default Matchhistory;