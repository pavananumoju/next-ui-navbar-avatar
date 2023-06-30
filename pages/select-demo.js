import { Button, Grid, Spacer, Container } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SelectionPage = () => {

const router = useRouter();

  const [list1, setList1] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
    { id: 6, name: "Item 6" },
  ]);

  const [list2, setList2] = useState([
    { id: 7, name: "Item 7" },
    { id: 8, name: "Item 8" },
    { id: 9, name: "Item 9" },
    { id: 10, name: "Item 10" },
    { id: 11, name: "Item 11" },
    { id: 12, name: "Item 12" },
  ]);

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
    console.log("remove :" + itemId);
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
      <Grid.Container>
        <Grid xs={6}>
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
        <Grid xs={6}>
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

      {/* <h2>Selected Items</h2> */}
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
          <Button
            ghost
            size="sm"
            auto
            // color={"primary"}
            onPress={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
    </Container>
  );
};

export default SelectionPage;
