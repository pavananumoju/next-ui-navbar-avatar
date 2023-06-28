import Link from "next/link";
import { db } from "@/firebase/firebase";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import PlayerList from "@/components/player-list";

function TeamPage(props) {
    const {squad} = props;
    // console.log(squad);
  return (
    <div>
      <Link href="/teams" className="flex justify-center mt-2">All Teams</Link>
      <PlayerList squad={squad}/>
    </div>
  );
}

export async function getStaticProps(context) {
  const { squadId } = context.params;
//   console.log(squadId);
//   getDataFromAPI(squadId);
    const teamData = await getDataFromDB(squadId);
  return { props: {squad: teamData} };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

async function getDataFromDB (squadId) {
    // const querySnapshot = await getDocs(collection(db, "Squads", squadId));
    const ref = doc(db, "Squads", squadId);
    const docSnap = await getDoc(ref);

    // if (docSnap.exists()) {
    //     // Convert to City object
    //     const city = docSnap.data();
    //     // Use a City instance method
    //     console.log(city);
    //   } else {
    //     console.log("No such document!");
    //   }

    // let teams = [];
    // querySnapshot.forEach((doc) => {
    //   teams.push(doc.data());
    // });
    // console.log(teams);
    return docSnap.data().player;
}

const getDataFromAPI = (squadId) => {
  //   console.log("getting data...");

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
      //   console.log(data);
      setDoc(doc(db, "Squads", `${squadId}`), data);
    });
};

export default TeamPage;
