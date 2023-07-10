import { Spacer, Col, Card, Grid, Text, Button, Row } from "@nextui-org/react";
// import { useRouter } from "next/router";
import { useAuth } from "@/context/auth-context";
import { getDate_dd_month_yyyy, getDate_wwwddmmyyyy } from "./utils/date-utils";
import { currentMatchDay } from "./utils/mock-utils";
import MatchCardRow from "./match-card-row";
import TeamPostCard from "./team-post-card";

function MatchDetails(props) {
  // const router = useRouter();
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
            <MatchCardRow
              match={"m1"}
              data={data}
              t1id={data.match1_team1_Id}
              t2id={data.match1_team2_Id}
              t1sid={data.match1_team1}
              t2sid={data.match1_team2}
              today={today}
            />
            <Spacer y={0.5} />
            {data.match2_team1 && (
              <>
                <MatchCardRow
                  match={"m2"}
                  data={data}
                  t1id={data.match2_team1_Id}
                  t2id={data.match2_team2_Id}
                  t1sid={data.match2_team1}
                  t2sid={data.match2_team2}
                  today={today}
                />
                <Spacer y={0.5} />
              </>
            )}
          </Card>
          <Spacer y={1} />
          {match1_posts && (
            <TeamPostCard posts={match1_posts} user={user} match={"Match 1"} />
          )}

          <Spacer y={1} />

          {match2_posts && (
            <TeamPostCard posts={match2_posts} user={user} match={"Match 2"} />
          )}
        </>
      )}
    </>
  );
}

export default MatchDetails;
