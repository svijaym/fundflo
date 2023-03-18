import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    organization: "",
    profilePic: "",
  });
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    setLoading(true);
    fetch("https://fdbackend2.onrender.com/users")
      .then((res) => res.json())
      .then((res) => setData(res.users));
    console.log(data);
    setLoading(false);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    fetch("https://fdbackend2.onrender.com/users/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((res) => console.log(res.new_user));
    alert("User added succesfully");
  };
  return (
    <Box
      w="90%"
      margin="auto"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Heading as='h3' size='lg'>Admin Dashboard</Heading>
      <Box
        w="300px"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <form>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter user Name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter user email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter user password"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Role</FormLabel>
            <Input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter user role"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>organization</FormLabel>
            <Input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Enter user organization"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>profilePic</FormLabel>
            <Input
              type="text"
              id="profilePic"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
              placeholder="Enter user profilePic"
            />
          </FormControl>
          <Button colorScheme="orange" onClick={handleSubmit}>
            Add User
          </Button>
        </form>
      </Box>
      <Heading as='h3' size='lg'>Registered Users</Heading>
      <Box w="80%">
        {loading && (
          <Stack w="800px">
            <Heading>......Loading</Heading>
            <Skeleton height="30px" />
          </Stack>
        )}
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing={10}>
          {data?.map((d) => (
            <Box
              w="70%"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              margin="auto"
            >
              <Image src={d.profilePic} />
              <Text>Name: {d.name}</Text>
              <Text>Role: {d.role}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Dashboard;
