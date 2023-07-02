import {
    getDataFromAPI,
    getDocFromDB,
  } from "@/components/utils/firebase-db-utils";
  import { Button, Grid, Spacer, Container } from "@nextui-org/react";
  import { useRouter } from "next/router";
  import React, { useState } from "react";
  import { useParams } from 'next/navigation'
  
  async function SelectionPage(props) {
    
    const params = useParams();
    console.log('params are: '+params);
    const router = useRouter();
  
  
      const team1SquadId = (await getDocFromDB("Teams", "971")).data().squadId;
    const team2SquadId = (await getDocFromDB("Teams", "58")).data().squadId;
  
    const list1 = (await getDocFromDB("Squads", team1SquadId.toString()))
      .data()
      .player.filter((row) => !row.isHeader);
  
    const CSK = (await getDocFromDB("Squads", team2SquadId.toString()))
      .data()
      .player.filter((row) => !row.isHeader);
  
    // const { list1, list2 } = props;
  
    const [selectedItems, setSelectedItems] = useState([]);
  
    const handleItemClick = (listName, itemId) => {
      const item =
        listName === "list1"
          ? list1.find((item) => item.id === itemId)
          : list2.find((item) => item.id === itemId);
  
      if (isItemSelected(itemId)) {
        // Remove the item if it is already selected
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
      // console.log("remove :" + itemId);
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== itemId)
      );
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
  
    return (
      <Container justify="center" align="center">
        <ul>
          {selectedItems.map((item) => {
            let colorclass = "";
            const l1 = list1.filter((e) => e.id === item.id);
            const l2 = list2.filter((e) => e.id === item.id);
            if (!l1.length) colorclass = "secondary";
            if (!l2.length) colorclass = "primary";
  
            // console.log(item.id, colorclass);
            return (
              <Button
                key={item.id}
                size="sm"
                color={colorclass}
                css={{ margin: 10 }}
                onPress={() => handleSelectedItemClick(item.id)}
              >
                {item.name}
              </Button>
            );
          })}
        </ul>
  
        {isAtLeastOneFromEachList ? (
          <p>At least one item selected from each list</p>
        ) : (
          <p>Please select at least one item from each list</p>
        )}
        <Spacer y={5} />
        <Grid.Container>
          <Grid xs={6} justify="center">
            <ul>
              {list1.map((item) => (
                <Button
                  size="sm"
                  key={item.id}
                  css={{ margin: 10 }}
                  onClick={() => handleItemClick("list1", item.id)}
                  className={isItemSelected(item.id) ? "selected" : ""}
                >
                  {item.name}
                </Button>
              ))}
            </ul>
          </Grid>
          <Grid xs={6} justify="center">
            <ul>
              {list2.map((item) => (
                <Button
                  color="secondary"
                  size="sm"
                  css={{ margin: 10 }}
                  key={item.id}
                  onClick={() => handleItemClick("list2", item.id)}
                  className={isItemSelected(item.id) ? "selected" : ""}
                >
                  {item.name}
                </Button>
              ))}
            </ul>
          </Grid>
        </Grid.Container>
  
        <Spacer y={5} />
        <Button
          ghost
          size="sm"
          auto
          // color={"primary"}
          onPress={() => {
            router.push("/login");
            // getDataFromAPI('test');
          }}
        >
          Login
        </Button>
      </Container>
    );
  };
  
  // export async function getStaticProps(context) {
  //   const team1 = context.query.team1;
  //   const team2 = context.query.team2;
  
  //   const team1SquadId = (await getDocFromDB("Teams", team1)).data().squadId;
  //   const team2SquadId = (await getDocFromDB("Teams", team2)).data().squadId;
  
  //   const SRH = (await getDocFromDB("Squads", team1SquadId.toString()))
  //     .data()
  //     .player.filter((row) => !row.isHeader);
  
  //   const CSK = (await getDocFromDB("Squads", team2SquadId.toString()))
  //     .data()
  //     .player.filter((row) => !row.isHeader);
  
  //   return { props: { list1: SRH, list2: CSK } };
  // }
  
  export default SelectionPage;
  