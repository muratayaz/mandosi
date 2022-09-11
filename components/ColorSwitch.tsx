import { Flex, Icon, Switch, useColorMode } from "@chakra-ui/react";
import { MdDarkMode, MdWbSunny } from "react-icons/md";

export default function ColorSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleDarkModeChange = () => {
    toggleColorMode();
  };

  return (
    <Flex gap="20px" align="center">
      <Icon
        fontSize="24"
        _groupHover={{
          color: "white",
        }}
        as={colorMode === "light" ? MdDarkMode : MdWbSunny}
      />
      <Switch
        id="dark-theme-switch"
        size="lg"
        onChange={handleDarkModeChange}
        isChecked={colorMode === "dark"}
      />
    </Flex>
  );
}
