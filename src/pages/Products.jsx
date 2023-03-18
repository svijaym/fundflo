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
import React, { useState, useEffect } from "react";
const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    imageurl: "",
  });
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    setLoading(true);
    fetch("https://fdbackend2.onrender.com/products/getproducts")
      .then((res) => res.json())
      .then((res) => setData(res.products));
    console.log(data);
    setLoading(false);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    fetch("https://fdbackend2.onrender.com/products/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((res) => console.log(res.product));
    alert("Product added succesfully");
  };
  return (
    <div>
      <Heading> Products Dashboard</Heading>
      <div>{loading ? ".....Loading" : null}</div>
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
              placeholder="Enter Product Name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="Number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter Product Quantity"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="Number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter Product Price"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Imageurl</FormLabel>
            <Input
              type="text"
              id="imageurl"
              name="imageurl"
              value={formData.imageurl}
              onChange={handleChange}
              placeholder="Enter Product imageurl"
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Add Product
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
            <Box w="100px">
              <Image src={d.profilePic} />
              <Text>Name: {d.name}</Text>
              <Text>Role: {d.role}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
};

export default Products;
