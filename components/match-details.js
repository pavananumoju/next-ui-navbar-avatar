import { Spacer, Col, Card, Grid, Text, Button, Row } from "@nextui-org/react";
import { useRouter } from "next/router";

function MatchDetails(props) {
  const router = useRouter();

  const { matchData } = props;
  const { match1_posts, match2_posts } = props.userPosts;
  // console.log(match1_posts)

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

  function handleMatchClick(match, team1_id, team2_id) {
    // console.log(team1_id, team2_id);
    const dateObj = new Date(data.date);
    const formattedDate = dateObj
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
      .replace(/ /g, "_");
    router.push(
      `/select-demo/?date=${formattedDate}&match=${match}&team1=${team1_id}&team2=${team2_id}`
    );
  }

  return (
    <>
      {data && (
        <>
          <Text size={15} color="#ff4ecd">
            {data.date}
          </Text>
          <Spacer y={1} />

          <Row>
            <Col>
              <Text>Match - 1</Text>
            </Col>
            <Col>
              <Button
                size="sm"
                // auto
                onPress={() =>
                  handleMatchClick(
                    "m1",
                    data.match1_team1_Id,
                    data.match1_team2_Id
                  )
                }
              >
                {data.match1_team1} vs {data.match1_team2}
              </Button>
            </Col>
          </Row>
          <Spacer y={1} />
          {data.match2_team1 && (
            <Row>
              <Col>
                <Text>Match - 2</Text>
              </Col>
              <Col>
                <Button
                  size="sm"
                  // auto
                  onPress={() =>
                    handleMatchClick(
                      "m2",
                      data.match2_team1_Id,
                      data.match2_team2_Id
                    )
                  }
                >
                  {data.match2_team1} vs {data.match2_team2}
                </Button>
              </Col>
            </Row>
          )}
          <Spacer y={1} />
          {match1_posts && (
            <ul>
              <Text>Match 1</Text>
              {match1_posts &&
                match1_posts.map((post) => (
                  <Grid.Container gap={1}>
                    <Card
                      isPressable
                      isHoverable
                      variant="bordered"
                      css={{ mw: "600px" }}
                    >
                      <Card.Body>
                        <Row align="center">
                          <Col css={{ display: "flex" }}>
                            <Text color="warning">{post.email}</Text>
                          </Col>
                          <Col>
                            <Text>{post.p1.name}</Text>
                            <Text>{post.p2.name}</Text>
                            <Text>{post.p3.name}</Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Grid.Container>
                ))}
            </ul>
          )}

          <Spacer y={1} />

          {match2_posts && (
            <ul>
              <Text>Match 2</Text>
              {match2_posts &&
                match2_posts.map((post) => (
                  <Grid.Container gap={1}>
                    <Card
                      isPressable
                      isHoverable
                      variant="bordered"
                      css={{ mw: "600px" }}
                    >
                      <Card.Body>
                        <Row align="center">
                          <Col css={{ display: "flex" }}>
                            <Text color="warning">{post.email}</Text>
                          </Col>
                          <Col>
                            <Text>{post.p1.name}</Text>
                            <Text>{post.p2.name}</Text>
                            <Text>{post.p3.name}</Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Grid.Container>
                ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default MatchDetails;
