import { Col, Card, Grid, Text, Row } from "@nextui-org/react";

function TeamPostCard(props) {
  const { post, user, resultData } = props;
  var p1_Points;
  var p2_Points;
  var p3_Points;

  // console.log(post);

  resultData != undefined &&
    resultData.results != undefined &&
    resultData.results.map((result) => {
      if (result.id === post.p1.id) {
        // console.log(post.p1.name + " : " + result.points);
        p1_Points = result.points;
      }
      if (result.id === post.p2.id) {
        // console.log(post.p2.name + " : " + result.points);
        p2_Points = result.points;
      }
      if (result.id === post.p3.id) {
        // console.log(post.p3.name + " : " + result.points);
        p3_Points = result.points;
      }
    });

  return (
    <ul>
      <Grid.Container gap={1} key={`${post.email} + ${post.p1.id}`} sm="12">
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
                <Text color={user.email === post.email ? "warning" : ""}>
                  {user.email === post.email ? "Your team" : post.name}
                </Text>
                <Text>{post.updatedTime}</Text>
              </Col>
              <Col>
                <Text color={post.p1.mvp && "success"}>{post.p1.name}</Text>
                <Text color={post.p2.mvp && "success"}>{post.p2.name}</Text>
                <Text color={post.p3.mvp && "success"}>{post.p3.name}</Text>
              </Col>
              {p1_Points != undefined &&
                p2_Points != undefined &&
                p3_Points != undefined && (
                  <Col>
                    <Text color={post.p1.mvp && "success"}>{p1_Points}</Text>
                    <Text color={post.p2.mvp && "success"}>{p2_Points}</Text>
                    <Text color={post.p3.mvp && "success"}>{p3_Points}</Text>
                  </Col>
                )}
            </Row>
            {p1_Points != undefined &&
              p2_Points != undefined &&
              p3_Points != undefined && (
                <Row>
                  <Col></Col>
                  <Col
                    css={{
                      color: "yellow",
                      fontWeight: "bold",
                      background: "$blue200",
                    }}
                  >
                    Total:
                  </Col>
                  <Col
                    css={{
                      color: "yellow",
                      fontWeight: "bold",
                      background: "$blue200",
                    }}
                  >
                    {p1_Points + p2_Points + p3_Points}
                  </Col>
                </Row>
              )}
          </Card.Body>
        </Card>
      </Grid.Container>
    </ul>
  );
}

export default TeamPostCard;
