import { Card, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

function TeamDetails(props) {
  const teamData = props.team;
  const router = useRouter();

  return (
    <li>
      <Card isPressable isHoverable variant="bordered" css={{ mw: "600px"}} onClick={()=>{router.push(`/teams/${teamData.squadId}`)}}>
        <Card.Body>
          {teamData.squadId} - {teamData.squadType} - {teamData.teamId}
        </Card.Body>
      </Card>
    </li>
  );
}

export default TeamDetails;
