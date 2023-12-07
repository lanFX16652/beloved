import React, { useState, useEffect } from "react";
import classes from "./Detailpage.module.css";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { useParams } from "react-router-dom";
import axiosInstance from "../../APIs/axiosInstance";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { postAddItem, selectCartLoading } from "../../store/cartSlice";
import { selectUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Detailpage = () => {
  const params = useParams();
  const user = useSelector(selectUser);
  const [productDetail, setProductDetail] = useState();
  const [imgActive, setImgActive] = useState();
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const outOfStock =
    productDetail?.quantity === 0 || amount === productDetail?.quantity;

  const increaseHandler = () => {
    setAmount(amount + 1);
  };

  const decreaseHandler = () => {
    if (amount === 0) {
      setAmount(0);
    } else {
      setAmount(amount - 1);
    }
  };

  const addToCartHandler = () => {
    if (user) {
      dispatch(
        postAddItem({
          productId: params.productId,
          qty: amount,
        })
      ).then(() => {
        notification.open({
          type: "success",
          message: "Add To Cart Success",
        });
      });
    } else {
      notification.open({
        type: "error",
        message: "Please login",
      });
    }
  };

  useEffect(() => {
    axiosInstance
      .post("/product-detail", {
        productId: params.productId,
      })
      .then((result) => {
        console.log(result);
        setProductDetail(result.data?.productDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (productDetail) {
      setImgActive(productDetail.images[0]);
    }
  }, [productDetail]);

  return (
    <div className={classes["detailpage-wrapper"]}>
      <Row>
        <Col xs={14}>
          <Row>
            <Col xs={6}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[...Array(4).keys()].map((index) => {
                  const src = productDetail
                    ? productDetail?.images[`${index}`]
                    : "";

                  if (!src) return <></>;

                  return (
                    <img
                      style={{ width: "10vh" }}
                      key={src}
                      src={src}
                      alt={productDetail?.name}
                      onClick={() => setImgActive(src)}
                    />
                  );
                })}
              </div>
            </Col>
            <Col xs={12}>
              <img
                className={classes.image}
                alt={productDetail?.name}
                src={imgActive}
              />
            </Col>
          </Row>
        </Col>

        <Col xs={10}>
          <div>
            <h1>{productDetail?.name}</h1>
            <h5>{productDetail?.price}</h5>
            <p>{productDetail?.description}</p>
            <h6>CATEGORY: {productDetail?.category}</h6>
            <h6>STOCK:{productDetail?.quantity}</h6>
            <Form>
              <Form.Item>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Input defaultValue="Combine input and button" />
                  <div className={classes["qty-group"]}>
                    <Button type={"text"} onClick={decreaseHandler}>
                      <CaretLeftOutlined />
                    </Button>
                    <span className={classes.quantity}>{amount}</span>
                    <Button
                      disabled={outOfStock}
                      type={"text"}
                      onClick={increaseHandler}
                    >
                      <CaretRightOutlined />
                    </Button>
                  </div>
                  <Button onClick={addToCartHandler} type="primary">
                    Add To Cart
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Detailpage;
