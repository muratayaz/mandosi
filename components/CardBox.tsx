import { Flex, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

export default function CardBox({ link, icon, color, title, value }) {
  const textColor = useColorModeValue("white", "gray.800");
  const bgColor = useColorModeValue("gray.800", "white");
  return (
    <Link href={link}>
      <Flex
        cursor="pointer"
        p={5}
        w="full"
        maxW="2xs"
        bg={bgColor}
        justifyContent="space-between"
        flexWrap="wrap"
        borderRadius="lg"
      >
        <Stack>
          <Text fontSize="md" fontWeight="bold" color={textColor}>
            {title}
          </Text>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            {value}
          </Text>
        </Stack>
        <Icon as={icon} fontSize="32" color={color} />
      </Flex>
    </Link>
  );
}
