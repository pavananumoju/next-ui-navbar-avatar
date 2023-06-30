import { db } from "@/firebase/firebase";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import PlayerList from "@/components/player-list";
import { useRouter } from "next/router";
import { Button, Container, Spacer } from "@nextui-org/react";

function TeamPage(props) {
  const router = useRouter();
  const { squad } = props;
  // console.log(squad);
  return (
      <Container justify="center" align="center" gap={0}>
        <Spacer y={1} />
        <Button
          shadow
          color="success"
          onPress={() => {
            router.push("/teams");
          }}
          auto
          ghost
        >
          All Teams
        </Button>
        <PlayerList squad={squad} />
      </Container>
  );
}

export async function getStaticProps(context) {
  const { squadId } = context.params;
  //   getDataFromAPI(squadId);
  const teamData = await getDataFromDB(squadId);
  return { props: { squad: teamData } };
}

export async function getStaticPaths() {
  const querySnapshot = await getDocs(collection(db, "Teams"));
  let teams = [];
  querySnapshot.forEach((doc) => {
    teams.push(doc.data());
  });

  const paths = teams.map((team) => {
    return { params: { squadId: team.squadId.toString() } };
  });

  return { paths, fallback: true };
}

async function getDataFromDB(squadId) {
  const ref = doc(db, "Squads", squadId);
  const docSnap = await getDoc(ref);

  return docSnap.data().player;
}

const getDataFromAPI = (squadId) => {
  fetch(
    `https://cricbuzz-cricket.p.rapidapi.com/series/v1/5945/squads/${squadId}`,
    {
      headers: {
        "X-RapidAPI-Key": "e3a774ef7cmshbdc22cb0186c6b8p16fdbbjsn6a99a1ad3518",
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      setDoc(doc(db, "Squads", `${squadId}`), data);
    });
};

export default TeamPage;
