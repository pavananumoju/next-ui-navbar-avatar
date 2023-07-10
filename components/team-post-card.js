import { Col, Card, Grid, Text, Row } from "@nextui-org/react";

function TeamPostCard(props) {

const posts = props.posts;
const user = props.user;

  return (
    <ul>
      <Text color="warning">{props.match}</Text>
      {posts &&
        posts.map((post) => (
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
                </Row>
              </Card.Body>
            </Card>
          </Grid.Container>
        ))}
    </ul>
  );
}

export default TeamPostCard;
