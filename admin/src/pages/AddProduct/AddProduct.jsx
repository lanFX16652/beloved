import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import axios from "axios";
import axiosInstance from "../../API/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [mediaIds, setMediaIds] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onSelectFiles = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (!selectedFile) return;

    const formData = new FormData();
    // formData.append("image", selectedFile);
    for (const file of event.target.files) {
      formData.append("image", file);
    }
    axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY1OGNmMGZjMmQwNGJiYjdlN2FjNjMiLCJ1c2VybmFtZSI6ImxhbiIsImVtYWlsIjoibGFuQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkNVRycnlsdjg4eUJLWUw5Y0JuaGN6Ty5PSk9IR0taeWRxNS9adk90TS5WWjA3anlrRHZTajIiLCJfX3YiOjAsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMTMyNDQ1N30.nFIT0n_3HDaN74j4Pr4HYiqElVSte6OM6V1jAGcSv6I",
        },
      })
      .then((response) => {
        console.log(response);
        setMediaIds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinish = (values) => {
    axiosInstance
      .post("/add-product", {
        name: values?.name,
        brand: values?.brand,
        price: values?.price,
        quantity: values?.quantity,
        category: values?.category,
        description: values?.description,
        mediaIds: mediaIds,
      })
      .then((result) => {
        console.log(result);
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Form
        name="add-new"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 20,
        }}
        style={{
          maxWidth: 800,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Typography.Title>Add New Product</Typography.Title>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your item's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[
            {
              required: true,
              message: "Please input your item's brand!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your item's price!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item required label="Quantity" name="quantity">
          <Input
            min={1}
            type="number"
            placeholder="Enter Quantity of product"
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please input your item's category!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item required label="Description" name="description">
          <Input.TextArea
            rows={6}
            placeholder="Please input your item's description!"
          />
        </Form.Item>

        <input
          type="file"
          multiple
          accept=".png, .jpeg, .jpg"
          onChange={onSelectFiles}
        />

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
