import { Container, Spacer, Text, Row, Col } from "@nextui-org/react";
import { getDocFromDB } from "@/components/utils/firebase-db-utils";
import MatchDetails from "@/components/match-details";

function Fixtures(props) {
  // console.log(props.fixtures);
  const { fixtures } = props;
  // console.log(fixtures);
  return (
    <Container justify="center" align="center">
      <Spacer y={2} />
      <Text>Fixtures 2023</Text>
      <Spacer y={0.5} />
      <Row gap={0.5}>
        <Col>
          <Text size={12}>Date</Text>
        </Col>
        <Col>
          <Text size={12}>Match 1</Text>
        </Col>
        <Col>
          <Text size={12}>Match 2</Text>
        </Col>
      </Row>
      <ul>
        {fixtures.map((data,index) => (
          <MatchDetails key={index} matchData={data} />
        ))}
      </ul>
    </Container>
  );
}

export async function getStaticProps() {
  const docSnap = await getDocFromDB("Fixtures", "2023");
  return { props: { fixtures: docSnap.data().matchDetails } };
}

export default Fixtures;
