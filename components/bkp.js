import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";

function PlayerList(props) {
  const squad = props.squad;
  console.log(squad);
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "BATTING STYLE", uid: "battingStyle" },
    { name: "BOWLING STYLE", uid: "bowlingStyle" },
    // {name: "HEADER", uid: "isHeader"}
  ];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    // console.log('switch ck:'+columnKey,'value: '+ user[columnKey])
    switch (columnKey) {
      case "name":
        return (
          <User
            squared
            src={`http://i.cricketcb.com/stats/img/faceImages/${user.id}.jpg`}
            name={cellValue}
            css={{ p: 0 }}
          >
            {user.role}
          </User>
        );

      case "battingStyle":
        return (
          <Col>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.battingStyle}
              </Text>
            </Row>
          </Col>
        );

      case "bowlingStyle":
        return (
          <Col>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.bowlingStyle}
              </Text>
            </Row>
          </Col>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div className="container">
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={squad}>
          {squad.map((player) =>
            player.isHeader ? (
              <Table.Row key={player.id} css={{background: 'gray'}}>
                <Table.Cell key={player.id}></Table.Cell>
                <Table.Cell key={player.id}><h1>{player.name}</h1></Table.Cell>
                <Table.Cell key={player.id}></Table.Cell>
              </Table.Row>
            ) : (
              <Table.Row key={player.id}>
                {(columnKey) => (
                  <Table.Cell key={columnKey}>
                    {renderCell(player, columnKey)}
                  </Table.Cell>
                )}
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export default PlayerList;
