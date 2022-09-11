import { Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Spinner
      variant="dot"
      thickness="5px"
      speed="0.5s"
      color="blue.500"
      size="xl"
      position="absolute"
      inset={0}
      m="auto"
    />
  );
}
