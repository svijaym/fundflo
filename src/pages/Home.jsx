import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  function handleSignup() {
    navigate("/signup");
  }
  function handleLogin() {
    navigate("/login");
  }
  return (
    <Box p={20}>
      <Heading>Welcome to fundflo Technologies</Heading>
      <br />
      <Heading as="h4" size="md">
        Please register or login to explore the application
      </Heading>
      <br />
      <Text fontSize='xl'>Don't have account? register yourself</Text>
      <br />
      <Button colorScheme='linkedin' onClick={handleSignup} size='lg'>Signup</Button>
      <br />
      <br />
      <Text>OR</Text>
      <br />
      <Text fontSize='xl'>Already a user? login now</Text>
      <br />
      <Button colorScheme='orange' onClick={handleLogin} size='lg'>Login</Button>
    </Box>
  );
};

export default Home;
