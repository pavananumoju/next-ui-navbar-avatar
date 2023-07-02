import { Container, Spacer, Text } from "@nextui-org/react";
import { getDocFromDB } from "@/components/utils/firebase-db-utils";
import MatchDetails from "@/components/match-details";

function Todays(props) {
  const { fixtures } = props;
//   console.log(fixtures[0]);
  return (
    <Container justify="center" align="center">
      <Spacer y={2} />
      <Text>Todays Matches</Text>
      <MatchDetails matchData={fixtures[0]} />
    </Container>
  );
}

export async function getStaticProps() {
  const date = new Date(2023, 3, 1);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
  });
//   console.log(formattedDate);
  const docSnap = await getDocFromDB("Fixtures", "2023");
  const allMatchesDetails = docSnap.data().matchDetails;
  const matchDetails = allMatchesDetails.filter((matchData) => {
    {
      return (
        matchData.matchDetailsMap &&
        matchData.matchDetailsMap.key === formattedDate
      );
    }
  });
  return { props: { fixtures: matchDetails } };
}

export default Todays;
