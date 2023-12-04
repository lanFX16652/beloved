import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../API/axiosInstance";

const Products = () => {
  const [products, setProducts] = useState();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (detail, record) => (
        <img
          src={record?.images[0]}
          alt={record?.name}
          style={{ width: "80px" }}
        />
      ),
    },
  ];

  useEffect(() => {
    axiosInstance
      .get("/product-list")
      .then((result) => {
        console.log(result);
        setProducts(result?.data?.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <NavLink to="/add-product">
        <Button>Add New</Button>
      </NavLink>
      <Table columns={columns} dataSource={products}></Table>
    </div>
  );
};

export default Products;
