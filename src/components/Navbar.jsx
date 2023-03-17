import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState("Login");
  const navigate = useNavigate();
  function handleHome() {
    navigate("/");
  }
  function handleLogin() {
    navigate("/login");
    setShow("Logout");
  }
  function handleDashboard() {
    navigate("/dashboard");
  }
  function handleProducts() {
    navigate("/products");
  }
  function handleLogout() {
    fetch("https://fdbackend2.onrender.com/users/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Remove JWT token from local storage
    localStorage.removeItem("token");
    setShow("Login");
  }

  return (
    <>
      <Box bg={useColorModeValue("cyan", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box onClick={handleHome}>
              <Image src="https://www.fundflo.ai/images/logo.svg" />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Box onClick={handleDashboard} fontSize="xl">
                Dashboard
              </Box>
              <Box onClick={handleProducts} fontSize="xl">
                Products
              </Box>
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={"https://i.ibb.co/VL94j8H/user.png"} />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={show === "Login" ? handleLogin : handleLogout}
                >
                  {show}
                </MenuItem>
                <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleProducts}>Products</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Box onClick={handleDashboard} fontSize="xl">
                Dashboard
              </Box>
              <Box onClick={handleProducts} fontSize="xl">
                Products
              </Box>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
