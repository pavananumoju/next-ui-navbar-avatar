import Player from "./player";

function PlayerList(props) {
  const squad = props.squad;
  return (
    <div>
      <ul>
        {squad.map((player) => (
          <Player key={player.id} player={player}/>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
