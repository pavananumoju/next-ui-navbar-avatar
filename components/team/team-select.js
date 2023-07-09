import React, { useEffect, useState } from "react";
import {
  getDocFromDB,
  getDocRef,
  setDocToDB,
} from "@/components/utils/firebase-db-utils";
import { useAuth } from "@/context/auth-context";
import {
  Button,
  Grid,
  Spacer,
  Container,
  Text,
  User,
  Row,
  Col,
  Radio,
  Image,
  Loading,
} from "@nextui-org/react";
import { useRouter } from "next/router";

function TeamSelect(props) {
  const { user } = useAuth();
  const router = useRouter();

  const [selectedItems, setSelectedItems] = useState([]);

  const { date, match, team1, team2 } = props.teamProps;
  // const dt = new Date(date);

  // console.log(date, match, team1, team2);

  // const formattedDate = dt.toLocaleDateString("en-GB", {
  //   year: "numeric",
  //   month: "long",
  //   day: "2-digit",
  // });
  // console.log("submitting user team for " + formattedDate);

  const [list1, setList1] = useState();
  const [list2, setList2] = useState();
  const [isloading, setIsLoading] = useState(false);
  const [displayMsg, setDisplayMsg] = useState();
  const [team1SName, setTeam1SName] = useState();
  const [team2SName, setTeam2SName] = useState();
  const [checked, setChecked] = useState("");

  useEffect(() => {
    if (team1 != undefined && team2 != undefined) {
      const test = getSquadsForTeams(team1, team2).then((data) => {
        setList1(data.list1);
        setList2(data.list2);
        setTeam1SName(data.team1SName);
        setTeam2SName(data.team2SName);
        return;
      });
    }
  }, []);

  if (list1 === undefined || list2 === undefined) {
    return (
      <Container justify="center" align="center">
        <Spacer y={2} />
        <div>
          <Loading size="lg" color="warning" />
        </div>
      </Container>
    );
  }

  const handleItemClick = (listName, itemId) => {
    const item =
      listName === "list1"
        ? list1.find((item) => item.id === itemId)
        : list2.find((item) => item.id === itemId);

    if (isItemSelected(itemId)) {
      // Remove the item if it is already selected
      console.log("already selected, please select other player");
      //   setSelectedItems((prevSelectedItems) =>
      //     prevSelectedItems.filter((selectedItem) => selectedItem.id !== itemId)
      //   );
    } else if (
      selectedItems.length === 3 ||
      (listName === "list1" &&
        countItemsFromList(selectedItems, "list1") >= 2) ||
      (listName === "list2" && countItemsFromList(selectedItems, "list2") >= 2)
    ) {
      // If the maximum selection limit is reached or if more than two items from list1 are selected, return without adding the item
      return;
    } else {
      // Add the item to the selected items
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }
  };

  const isItemSelected = (itemId) => {
    return selectedItems.some((selectedItem) => selectedItem.id === itemId);
  };

  function handleSelectedItemClick(itemId) {
    console.log("remove :" + itemId);
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem.id !== itemId)
    );
    setChecked("");
  }

  const countItemsFromList = (selectedItems, listName) => {
    return selectedItems.filter((selectedItem) => {
      if (listName === "list1") {
        return list1.some((item) => item.id === selectedItem.id);
      } else if (listName === "list2") {
        return list2.some((item) => item.id === selectedItem.id);
      }
      return false;
    }).length;
  };

  const isAtLeastOneFromEachList =
    list1.some((item) => isItemSelected(item.id)) &&
    list2.some((item) => isItemSelected(item.id));

  function handleUserTeamSubmission() {
    setIsLoading(true);

    var options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedTime = new Date().toLocaleTimeString("en-US", options);

    options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = new Date().toLocaleDateString("en-US", options);

    const docRef = getDocRef(`Posts/${date}/${match}`, user.email);
    const email = user.email;
    const team = {
      match: match,
      email: email,
      name: user.displayName,
      p1: {
        id: selectedItems[0].id,
        name: selectedItems[0].name,
        mvp: checked === selectedItems[0].id ? true : false,
      },
      p2: {
        id: selectedItems[1].id,
        name: selectedItems[1].name,
        mvp: checked === selectedItems[1].id ? true : false,
      },
      p3: {
        id: selectedItems[2].id,
        name: selectedItems[2].name,
        mvp: checked === selectedItems[2].id ? true : false,
      },
      updatedDate: formattedDate,
      updatedTime: formattedTime,
    };

    setDocToDB(docRef, team).then((x) => {
      setDisplayMsg("Submit success");
      setIsLoading(false);
    });

    router.push("/todays");
  }

  return (
    <Container justify="center" align="center">
      <Text color="warning" b size="$md">
        {match === "m1" ? "Match 1" : "Match 2"}
      </Text>
      <ul>
        <Radio.Group label="Your Selection" onChange={setChecked}>
          {selectedItems.map((item) => {
            let colorclass = "";
            const l1 = list1.filter((e) => e.id === item.id);
            const l2 = list2.filter((e) => e.id === item.id);
            if (!l1.length) colorclass = "secondary";
            if (!l2.length) colorclass = "primary";

            return (
              <Row css={{ margin: 5 }} key={item.id}>
                <Col>
                  <Radio
                    value={item.id}
                    color={colorclass}
                    css={{ alignItems: "center" }}
                  >
                    <Text color={colorclass}>{item.name}</Text>
                  </Radio>
                </Col>
                <Col>
                  <Button
                    size={"xs"}
                    color={colorclass}
                    onPress={() => handleSelectedItemClick(item.id)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Radio.Group>
      </ul>

      {isAtLeastOneFromEachList ? (
        <p></p>
      ) : (
        <p>Please select at least one item from each list</p>
      )}

      {selectedItems.length < 3 ? (
        <p>Please select 3 players</p>
      ) : displayMsg ? (
        <Text color="success" b>
          {displayMsg}
        </Text>
      ) : isloading ? (
        <Loading />
      ) : (
        <>
          <Spacer y={2} />

          <Button
            color="warning"
            ghost
            onClick={handleUserTeamSubmission}
            disabled={!checked}
          >
            Submit
          </Button>
        </>
      )}

      <Spacer y={2} />
      <Grid.Container>
        <Grid xs={6} md={6} lg={6} justify="center">
          <ul align="center">
            <Text color="primary" b>
              {team1SName}{" "}
            </Text>
            {list1.map((item) => (
              <li key={item.id}>
                <Button
                  // bordered
                  light
                  size="sm"
                  color="primary"
                  css={{ margin: 10, height: "auto" }}
                  onPress={() => handleItemClick("list1", item.id)}
                >
                  {/* <Image
                    showSkeleton
                    width={25}
                    height={25}
                    src={`https://i.cricketcb.com/stats/img/faceImages/${item.id}.jpg`}
                    alt="Default Image"
                    // objectFit="cover"
                  />
                  <Spacer x={0.5} />
                  {item.name} */}
                  <User
                    key={item.id}
                    bordered
                    color="primary"
                    // css={{ margin: 2 }}
                    size="lg"
                    // onClick={() => handleItemClick("list1", item.id)}
                    src={`https://i.cricketcb.com/stats/img/faceImages/${item.id}.jpg`}
                    name={item.name}
                    description={item.role}
                  />
                </Button>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid xs={6} md={6} lg={6} justify="center">
          <ul align="center">
            <Text color="secondary" b>
              {team2SName}{" "}
            </Text>
            {list2.map((item) => (
              <li key={item.id}>
                <Button
                  // ghost
                  // align="left"
                  // shadow
                  light
                  color="secondary"
                  // bordered
                  size="sm"
                  css={{ margin: 10, height: "auto" }}
                  key={item.id}
                  onPress={() => handleItemClick("list2", item.id)}
                  // className={isItemSelected(item.id) ? "selected" : ""}
                >
                  {/* <Image
                    showSkeleton
                    width={25}
                    height={25}
                    src={`https://i.cricketcb.com/stats/img/faceImages/${item.id}.jpg`}
                    alt="Default Image"
                    // objectFit="cover"
                  />
                  <Spacer x={0.5} />
                  {item.name} */}
                  <User
                    // css={{"padding-top":100, "padding-bottom":50 }}
                    key={item.id}
                    bordered
                    color="secondary"
                    // css={{ margin: 2 }}
                    size="lg"
                    // onClick={() => handleItemClick("list2", item.id)}
                    src={`https://i.cricketcb.com/stats/img/faceImages/${item.id}.jpg`}
                    name={item.name}
                    description={item.role}
                  />
                </Button>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

async function getSquadsForTeams(team1, team2) {
  const team1SquadId = (await getDocFromDB("Teams", team1.toString())).data()
    .squadId;

  const team2SquadId = (await getDocFromDB("Teams", team2.toString())).data()
    .squadId;

  const team1SName = (await getDocFromDB("IPLTeams", team1.toString())).data()
    .teamSName;

  const team2SName = (await getDocFromDB("IPLTeams", team2.toString())).data()
    .teamSName;

  const list1 = (await getDocFromDB("Squads", team1SquadId.toString()))
    .data()
    .player.filter((row) => !row.isHeader);

  const list2 = (await getDocFromDB("Squads", team2SquadId.toString()))
    .data()
    .player.filter((row) => !row.isHeader);

  team1SName != undefined &&
    team2SName != undefined &&
    console.log(team1SName, team2SName);

  return { team1SName, list1, team2SName, list2 };
}

export default TeamSelect;
