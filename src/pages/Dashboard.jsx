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
    fetch("http://localhost:8080/users/adduser", {
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
    <div>
      <Heading>Admin Dashboard</Heading>
      <Box w="300px">
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
      <div>
        {loading && (
          <Stack w="800px">
            <Heading>......Loading</Heading>
            <Skeleton height="30px" />
          </Stack>
        )}
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing={10}>
          {data?.map((d) => (
            <div>{d.name}</div>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
};

export default Dashboard;
