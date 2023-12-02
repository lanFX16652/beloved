import React from "react";
import { Table, Button } from "antd";
import { NavLink } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <NavLink to="/add-product">
        <Button>Add New</Button>
      </NavLink>
      <Table></Table>
    </div>
  );
};

export default Products;
