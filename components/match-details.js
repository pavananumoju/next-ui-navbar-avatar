import {
  Button,
  Container,
  Spacer,
  Text,
  Card,
  Row,
  Col,
} from "@nextui-org/react";
import { useRouter } from "next/router";

function MatchDetails(props) {
  const router = useRouter();

  const { matchData } = props;
  const mdm = matchData.matchDetailsMap;
  // console.log(mdm);
  const data =
    mdm != undefined
      ? {
          date: mdm.key,
          match1_team1_Id: mdm.match[0].matchInfo.team1.teamId,
          match1_team2_Id: mdm.match[0].matchInfo.team2.teamId,
          match1_team1: mdm.match[0].matchInfo.team1.teamSName,
          match1_team2: mdm.match[0].matchInfo.team2.teamSName,
          match2_team1_Id: mdm.match[1] && mdm.match[1].matchInfo.team1.teamId,
          match2_team2_Id: mdm.match[1] && mdm.match[1].matchInfo.team2.teamId,
          match2_team1: mdm.match[1] && mdm.match[1].matchInfo.team1.teamSName,
          match2_team2: mdm.match[1] && mdm.match[1].matchInfo.team2.teamSName,
        }
      : null;
  // console.log(data);

  function handleMatchClick(team1_id, team2_id) {
    // console.log(team1_id, team2_id);
    router.push(`/select-demo/?team1=${team1_id}&team2=${team2_id}`);
  }

  return (
    <>
      {data && (
        <>
          <Row gap={0} key={data}>
            <Col>
              <Text size={12}>{data.date}</Text>
            </Col>
            <Col>
              <Button
                size="xs"
                onClick={() => handleMatchClick(
                  data.match1_team1_Id,
                  data.match1_team2_Id
                )}
              >
                {data.match1_team1} vs {data.match1_team2}
              </Button>
            </Col>
            <Col>
              {data.match2_team1 && (
                <Button
                  size="xs"
                  onClick={() => handleMatchClick(
                    data.match2_team1_Id,
                    data.match2_team2_Id
                  )}
                >
                  {data.match2_team1} vs {data.match2_team2}
                </Button>
              )}
            </Col>
          </Row>

          <Spacer y={0.5} />
        </>
      )}
    </>
  );
}

export default MatchDetails;
