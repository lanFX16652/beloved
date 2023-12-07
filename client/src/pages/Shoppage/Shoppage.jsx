import React, { useState, useEffect } from "react";
import classes from "./Shoppage.module.css";
import { Col, Divider, Row, Card } from "antd";
import axiosInstance from "../../APIs/axiosInstance";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const Shoppage = () => {
  const [productList, setProductList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/product-list")
      .then((result) => {
        console.log(result);
        setProductList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className={classes.banner} />

      <div>
        <Divider
          orientation="left"
          style={{ color: "grey", fontStyle: "italic" }}
        >
          Pre-lived-and-loved Fashion Accessories{" "}
        </Divider>

        <Row
          style={{ textAlign: "center" }}
          className={classes["product-list-wrapper"]}
        >
          {productList?.products?.map((product) => (
            <Col key={product?._id} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={product?.name} src={product?.images[0]} />}
                onClick={() => navigate(`/detailpage/${product?._id}`)}
              >
                <Meta title={product?.name} description={product?.price} />
              </Card>
            </Col>
          ))}
        </Row>

        <Divider orientation="left"></Divider>
      </div>
    </div>
  );
};

export default Shoppage;
