import {
  Spacer,
  Col,
  Card,
  Grid,
  Text,
  Button,
  Row,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth-context";
import { getDate_dd_month_yyyy, getDate_wwwddmmyyyy } from "./utils/date-utils";
import { currentMatchDay } from "./utils/mock-utils";

function MatchDetails(props) {
  const router = useRouter();
  const { user } = useAuth();
  // let bdColor = "gray";
  const { matchData } = props;
  const { match1_posts, match2_posts } = props.userPosts;

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

  function handleMatchClick(match, team1_id, team2_id) {
    const dateObj = new Date(data.date);
    const date_dd_month_yyyy = getDate_dd_month_yyyy(dateObj);
    router.push(
      `/function/team-selection-page/?date=${date_dd_month_yyyy}&match=${match}&team1=${team1_id}&team2=${team2_id}`
    );
  }

  var today = getDate_wwwddmmyyyy(new Date());

  //mock date for development
  today = currentMatchDay;

  return (
    <>
      {data && (
        <>
          <Card
          isPressable
          isHoverable
            // css={{ borderColor: data.date === today ? "yellow" : "" }}
            // variant="bordered"
          >
            <Spacer y={0.5} />
            <Text size={15} b color="#ff4ecd">
              {data.date}
            </Text>
            <Spacer y={0.5} />
            <Row>
              <Col>
                <Text>Match - 1</Text>
              </Col>
              <Col>
                <Button
                  disabled={data.date != today}
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
            <Spacer y={0.5} />
            {data.match2_team1 && (
              <>
                <Row>
                  <Col>
                    <Text>Match - 2</Text>
                  </Col>
                  <Col>
                    <Button
                      disabled={data.date != today}
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
                <Spacer y={0.5} />
              </>
            )}
          </Card>
          <Spacer y={1} />
          {match1_posts && (
            <ul>
              <Text color="warning">Match 1</Text>
              {/* <Spacer x={0.5}/> */}
              {match1_posts &&
                match1_posts.map((post) => (
                  <Grid.Container
                    gap={1}
                    key={`${post.email} + ${post.p1.id}`}
                    sm="12"
                  >
                    <Card
                      isPressable
                      isHoverable
                      variant="bordered"
                      css={{
                        mw: "600px",
                        borderColor: "blue  ",
                        // backgroundColor:"black"
                      }}
                    >
                      <Card.Body>
                        <Row align="center">
                          <Col>
                            <Text
                              color={
                                user.email === post.email
                                  ? "warning"
                                  : ""
                              }
                            >
                              {user.email === post.email
                                ? "Your team"
                                : post.name}
                            </Text>
                            <Text >{post.updatedTime}</Text>
                          </Col>
                          <Col>
                            <Text color={post.p1.mvp && "success"}>
                              {post.p1.name}
                            </Text>
                            <Text color={post.p2.mvp && "success"}>
                              {post.p2.name}
                            </Text>
                            <Text color={post.p3.mvp && "success"}>
                              {post.p3.name}
                            </Text>
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
              <Text color="warning">Match 2</Text>
              {match2_posts &&
                match2_posts.map((post) => (
                  <Grid.Container
                    gap={1}
                    key={`${post.email} + ${post.p1.id}`}
                    sm="12"
                  >
                    <Card
                      isPressable
                      isHoverable
                      variant="bordered"
                      css={{
                        mw: "600px",
                        borderColor: "violet",
                        // backgroundColor:"black"
                      }}
                    >
                      <Card.Body>
                        <Row align="center">
                          <Col>
                            <Text
                              color={
                                user.email === post.email
                                  ? "warning"
                                  : ""
                              }
                            >
                              {user.email === post.email
                                ? "Your team"
                                : post.name}
                            </Text>
                            <Text>{post.updatedTime}</Text>
                          </Col>
                          <Col>
                          <Text color={post.p1.mvp && "success"}>
                              {post.p1.name}
                            </Text>
                            <Text color={post.p2.mvp && "success"}>
                              {post.p2.name}
                            </Text>
                            <Text color={post.p3.mvp && "success"}>
                              {post.p3.name}
                            </Text>
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
