import { Col, Text, Button, Row } from "@nextui-org/react";
import { useRouter } from "next/router";
import { getDate_dd_month_yyyy } from "./utils/date-utils";

function MatchCardRow(props) {
  const { data, today, t1id, t2id, t1sid, t2sid, match } = props;
  const router = useRouter();
  function handleMatchClick(match, team1_id, team2_id) {
    const dateObj = new Date(data.date);
    const date_dd_month_yyyy = getDate_dd_month_yyyy(dateObj);
    router.push(
      `/function/team-selection-page/?date=${date_dd_month_yyyy}&match=${match}&team1=${team1_id}&team2=${team2_id}`
    );
  }

  return (
    <Row>
      <Col>
        <Text>{match === "m1" ? "Match - 1" : "Match - 2"}</Text>
      </Col>
      <Col>
        <Button
          disabled={data.date != today}
          size="sm"
          // auto
          onPress={() => handleMatchClick(match, t1id, t2id)}
        >
          {t1sid} vs {t2sid}
        </Button>
      </Col>
    </Row>
  );
}

export default MatchCardRow;
