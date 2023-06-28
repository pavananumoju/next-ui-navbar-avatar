import TeamList from "@/components/team/teams-list";
import ProtectedRoute from "@/layout/components/protected-route";
import { db } from "@/firebase/firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

const DUMMY_TEAMS = [
  { teamId: 1, teamName: "Sunrisers Hyderabad", teamCode: "SRH" },
  { teamId: 2, teamName: "Sunrisers Hyderabad", teamCode: "KKR" },
  { teamId: 3, teamName: "Sunrisers Hyderabad", teamCode: "CSK" },
  { teamId: 4, teamName: "Sunrisers Hyderabad", teamCode: "RCB" },
];

function TeamsPage(props) {
  const { teams } = props;
  return (
    <ProtectedRoute>
      <TeamList teams={teams} />
    </ProtectedRoute>
  );
}

export async function getStaticProps() {
  //make DB call to get the teams list and return as props no need to revalidate
  //   const res = await fetch(
  //     "https://cricbuzz-cricket.p.rapidapi.com/series/v1/5945/squads",
  //     {
  //       headers: {
  //         "X-RapidAPI-Key": "e3a774ef7cmshbdc22cb0186c6b8p16fdbbjsn6a99a1ad3518",
  //         "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
  //       },
  //     }
  //   );
  //   const data = await res.json();

  //   for (var i=1; i<data.squads.length; i++) {
  //     console.log('squadType: '+data.squads[i].squadType);
  //       const teamSet = {
  //         squadId: data.squads[i].squadId,
  //         teamId: data.squads[i].teamId,
  //         squadType: data.squads[i].squadType
  //       };
  //     setDoc(doc(db, "Teams", data.squads[i].teamId.toString()), teamSet);
  //  }

  const querySnapshot = await getDocs(collection(db, "Teams"));
  let teams = [];
  querySnapshot.forEach((doc) => {
    teams.push(doc.data());
  });

  // console.log(teams);
  return { props: { teams: teams } };
}

export default TeamsPage;
