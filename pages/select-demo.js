import TeamSelect from "@/components/team/team-select";
import { useRouter } from "next/router";

const SelectionPage = () => {
  const router = useRouter();

  const { team1, team2 } = router.query;

  return <TeamSelect teams={[team1, team2]} />;
};

export default SelectionPage;
