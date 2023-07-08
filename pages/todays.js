import { Container, Spacer, Text } from "@nextui-org/react";
import {
  getDocFromDB,
  getDocsFromDB,
  getDocsWithQuery,
} from "@/components/utils/firebase-db-utils";
import MatchDetails from "@/components/match-details";

function Todays(props) {
  const { fixtures, posts } = props;
  // console.log(fixtures);
  return (
    <Container justify="center" align="center">
      <Spacer y={1} />
      <Text>Todays Matches</Text>
      <Spacer y={1} />
      <MatchDetails matchData={fixtures[0]} userPosts={posts} />
    </Container>
  );
}

export async function getStaticProps() {
  const date = new Date(2023, 3, 2);
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

  const formattedDate1 = date
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
    .replace(/ /g, "_");

  const match1_posts = [];
  const match2_posts = [];
  const querySnapshot1 = await getDocsFromDB("/Posts/02_April_2023/m1");
  const querySnapshot2 = await getDocsFromDB("/Posts/02_April_2023/m2");

  querySnapshot1.forEach((doc) => {
    match1_posts.push(doc.data());
  });
  querySnapshot2.forEach((doc) => {
    match2_posts.push(doc.data());
  });

  return {
    props: { fixtures: matchDetails, posts: { match1_posts, match2_posts } },
  };
}

export default Todays;
