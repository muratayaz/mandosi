import { Flex, FlexProps, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ReactText } from "react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
export default function NavItem({
  icon,
  children,
  href,
  ...rest
}: NavItemProps) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="24"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        <Text fontWeight="medium" fontSize="lg">
          {children}
        </Text>
      </Flex>
    </Link>
  );
}
