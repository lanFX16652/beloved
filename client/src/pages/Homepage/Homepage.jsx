import React from "react";
import classes from "./Homepage.module.css";
import { Col, Divider, Row, Card } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={classes.banner}>
        {/* <img
          style={{ width: "100%" }}
          src="https://images.unsplash.com/photo-1488693161025-5f967b74de89?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="banner"
        /> */}
      </div>
      <div>
        <Divider
          orientation="left"
          style={{ color: "grey", fontStyle: "italic" }}
        >
          Find new owners for vintage and timeless classics
        </Divider>
        <h1>NEW RARE FIND</h1>
        <div style={{ textAlign: "center" }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={
                  <img
                    alt="Prada Fairy Bag"
                    src="http://www.purseblog.com/images/prada-fairy-bag.jpg"
                  />
                }
              >
                <Meta title="Prada Fairy Bag" />
              </Card>
            </Col>
            <Col className="gutter-row" span={8}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={
                  <img
                    alt="Dior Loves John' Saddle Bag"
                    src="https://i.pinimg.com/564x/42/44/41/4244417a9a32d0e477fb08d3e6738c8f.jpg"
                  />
                }
              >
                <Meta title="Dior Loves John' Saddle Bag" />
              </Card>
            </Col>
            <Col className="gutter-row" span={8}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={
                  <img
                    alt="Louis Vuitton Drouot"
                    src="https://i.pinimg.com/564x/f1/48/bd/f148bdba22d4c6ea58c82a498629986e.jpg"
                  />
                }
              >
                <Meta title="Louis Vuitton Drouot" />
              </Card>
            </Col>
            {/* <Col className="gutter-row" span={6}>
              <div style={style}>col-6</div>
            </Col> */}
          </Row>
          <Divider orientation="left"></Divider>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
