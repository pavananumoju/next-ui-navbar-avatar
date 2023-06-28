import TeamDetails from "./team-detail";

function TeamList(props) {
  return (
    <div className="flex justify-center ">
      <div>
        <div className="flex justify-center items-center m-6">Teams 2023</div>
        <ul>
          {props.teams.map((team) => (
            <TeamDetails key={team.squadId} team={team} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamList;
