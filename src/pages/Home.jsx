import React from "react";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  function handleSignup() {
    navigate("/signup");
  }

  return (
    <Box p={10}>
      <Heading>Welcome to fundflo Technologies,a fintech company</Heading>
      <Heading as='h3' size='lg'>Admin Dashboard</Heading>
      <br />
      <Image src="https://user-images.githubusercontent.com/101625055/226087434-a5cda9a3-7614-4d37-a265-bff8e26a63b7.jpg" />
      <Heading as="h4" size="md">
        Please register or login to explore the application
      </Heading>
      <br />
      <Text fontSize="xl">Don't have account? register yourself</Text>
      <br />
      <Button colorScheme="orange" onClick={handleSignup} size="lg">
        Get Started
      </Button>
      <br />

      <br />
      <Box display="flex" justifyContent="center" alignContent="center">
        <Image src="https://user-images.githubusercontent.com/101625055/226087422-053cec1c-c8b1-4ea8-88e5-5b471cb91136.svg" />
      </Box>
    </Box>
  );
};

export default Home;
