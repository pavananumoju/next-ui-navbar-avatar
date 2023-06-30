import { Container, Text, Spacer, Button } from "@nextui-org/react";

function PageNotFound() {
  return (
    <Container justify="center" align="center">
      <Spacer y={6} />
      <Text h3>You landed on 404 page</Text>
      <Spacer y={1} />
      <Text>Click below to login</Text>
      <Spacer y={0.5} />
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
}

export default PageNotFound;
