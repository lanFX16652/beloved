import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, setUser } from "../../store/userSlice";
import axios from "axios";

const Login = () => {
  const [form] = Form.useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRedux = useSelector(selectUser);

  const onFinish = async (values) => {
    try {
      const result = await axios.post("http://localhost:5000/login", {
        email: values.email,
        password: values.password,
      });
      setCurrentUser(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch(setUser(result.data));
    } catch (error) {
      if (error.response.status === 403) {
        return setErrorMessage("You are forbidden");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (userRedux) {
      navigate("/");
    }
  }, [userRedux, navigate]);

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
