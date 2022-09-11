import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { IconType } from "react-icons";
import {
  MdHome,
  MdOutlineAddCircle,
  MdOutlineListAlt,
  MdPayments,
} from "react-icons/md";
import ColorSwitch from "../ColorSwitch";
import NavItem from "./NavItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface AltLinks {
  name: string;
  href: string;
  icon: IconType;
}
interface LinkItemProps {
  name: string;
  altLinks: AltLinks[];
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: "Müşteri",
    altLinks: [
      { name: "Müşteri Listesi", icon: MdOutlineListAlt, href: "/customers" },
      {
        name: "Müşteri Ekle",
        icon: MdOutlineAddCircle,
        href: "/customers/create",
      },
    ],
  },
  {
    name: "Sipariş",
    altLinks: [
      { name: "Sipariş Listesi", icon: MdOutlineListAlt, href: "/orders" },
      {
        name: "Sipariş Ekle",
        icon: MdOutlineAddCircle,
        href: "/orders/create",
      },
    ],
  },
  {
    name: "Ödeme",
    altLinks: [{ name: "Ödeme Listesi", icon: MdPayments, href: "/payment" }],
  },
];

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      py="5"
      {...rest}
    >
      <Flex h="full" flexDirection="column" justifyContent="space-between">
        <Stack>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />

          <NavItem icon={MdHome} href={"/"}>
            Anasayfa
          </NavItem>

          {LinkItems.map((link, idx) => (
            <Stack key={idx}>
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text fontWeight="medium" fontSize="lg">
                      {link.name}
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel>
                    {link.altLinks.map((altLink) => (
                      <NavItem
                        key={altLink.name}
                        icon={altLink.icon}
                        href={altLink.href}
                      >
                        {altLink.name}
                      </NavItem>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
          ))}
        </Stack>

        <Stack pl="5">
          <ColorSwitch />
        </Stack>
      </Flex>
    </Box>
  );
}
