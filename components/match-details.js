import {
  Button,
  Container,
  Spacer,
  Text,
  Card,
  Row,
  Col,
} from "@nextui-org/react";

function MatchDetails(props) {
  const { matchData } = props;
  const mdm = matchData.matchDetailsMap;
  // console.log(mdm);
  const data =
    mdm != undefined
      ? {
          date: mdm.key,
          team01: mdm.match[0].matchInfo.team1.teamSName,
          team02: mdm.match[0].matchInfo.team2.teamSName,
          team11: mdm.match[1] && mdm.match[1].matchInfo.team1.teamSName,
          team12: mdm.match[1] && mdm.match[1].matchInfo.team2.teamSName,
        }
      : null;
  // console.log(data);
  return (
    <>
      {data && (
        <>
          <Row gap={0} key={data}>
            <Col>
              <Text size={12}>{data.date}</Text>
            </Col>
            <Col>
              <Button size="xs">
                {data.team01} vs {data.team02}
              </Button>
            </Col>
            <Col>
              {data.team11 && (
                <Button size="xs">
                  {data.team11} vs {data.team12}
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
