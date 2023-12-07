import React from "react";
import { Row, Col, Button, Form, Input, notification } from "antd";
import { useNavigate, useDispatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, selectCart, selectTotalPrice } from "../../store/cartSlice";
import { createOrder } from "../../store/orderSlice";

const Cartpage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalPrice = useSelector(selectTotalPrice);
  console.log("totalPrice", totalPrice);
  const [form] = Form.useForm();

  const orderSubmit = (values) => {
    dispatch(
      createOrder({
        fullname: values.fullname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        cart: cart,
        totalPrice: totalPrice,
      })
    ).then(() => {
      notification.open({
        type: "success",
        message: "Create order success",
      });
    });
  };

  return (
    <div>
      <Col xs={12}>
        <Form
          form={form}
          size="middle"
          layout="vertical"
          name="fullname"
          onFinish={orderSubmit}
        >
          <Form.Item
            label="FULLNAME"
            name="fullname"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="EMAIL" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="PHONE NUMBER"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ADDRESS"
            name="address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Button disabled={cart.length === 0} htmlType="submit">
            Place Order
          </Button>
        </Form>
      </Col>
      <Col xs={12}>
        <div>
          <h3>YOUR ORDER</h3>
          <Row>
            {cart.map((item) => (
              <>
                {" "}
                <Col xs={6}>{item.product.name}</Col>
                <Col xs={6}>
                  {item.product.price} x {item.quantity}{" "}
                </Col>
              </>
            ))}
            <h2>TOTAL PRICE: {totalPrice} </h2>
          </Row>
        </div>
      </Col>
    </div>
  );
};

export default Cartpage;
