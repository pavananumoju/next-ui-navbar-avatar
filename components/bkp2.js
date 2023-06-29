import { Table, Row, Col, User, Text } from "@nextui-org/react";

function PlayerList(props) {
  const squad = props.squad;
  // console.log(squad);
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "battingStyle",
      label: "BATTING STYLE",
    },
    {
      key: "bowlingStyle",
      label: "BOWLING STYLE",
    },
  ];

  return (
    <div className="container">
      <Table
         bordered
         shadow={false}
         aria-label="Example static bordered collection table"
         css={{
           height: "auto",
           minWidth: "100%",
         }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={squad}>
          {(item) =>
            item.isHeader ? (
              <Table.Row key={item.name}>
                <Table.Cell></Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            ) : (
              <Table.Row key={item.name}>
                {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    </div>
  );
}

export default PlayerList;
