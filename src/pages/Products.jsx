import { Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
const Products = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://fdbackend2.onrender.com/products")
      .then((res) => res.json())
      .then((res) => setData(res.data));
    console.log(data);
  }, [data]);
  return (
    <div>
      <Heading>Users Dashboard</Heading>
      <div>
        {data?.map((d) => (
          <div>{d.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Products;
