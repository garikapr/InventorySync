import { Flex, Image } from "@chakra-ui/react";
import React from "react";

const LogoHeader: React.FC = () => {
  return (
    <Flex align="center" direction="column" mb={2}>
    <Image
    src="/Waves.png"
    alt="InventorySync Logo"
    maxW="400px"
    width="100%"
    objectFit="contain"
    mb={2}
    />
    </Flex>
  );
};

export default LogoHeader;