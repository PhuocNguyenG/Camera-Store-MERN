import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row } from "antd";

import ButtonGroup from "antd/lib/button/button-group";
import { addCart, delCart } from "../redux/action";

export function Cart() {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const handleAdd = (item) => {
    dispatch(addCart(item));
  };
  const handleDell = (item) => {
    dispatch(delCart(item));
  };
  const emptyCart = () => {
    return (
      <>
        <div>
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              Giỏ hàng trống !!!
            </Col>
          </Row>
        </div>
      </>
    );
  };
  const cartItem = (product) => {
    return (
      <>
        <Row
          justify="center"
          style={{
            marginBottom: "10px",
            border: "1px solid black",
            width: "fit-content",
            margin:"5px auto"
          }}
        >
          <Col span={6} style={{width: "200px",
                  height: "200px" }}>
            <div style={{width: "200px",
                  height: "200px", textAlign: "center" }}>
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "contain",
                }}
                src={product.prodPicture[0]}
                alt={product.prodName}
              />
            </div>
          </Col>
          <Col span={10} style={{width:"700px", alignSelf: "center", textAlign: "center" }}>
            <div className="item-cart-title">{product.prodName}</div>
            <div className="item-cart-category">
              <a>Loại: </a>
              {product.prodCate}
            </div>

            <NumberFormat
              value={(product.prodPrice) }
              className="item-cart-price"
              thousandSeparator={true}
              displayType={"text"}
              renderText={(value, props) => (
                <div {...props}>
                  {" "}
                  <a> Đơn giá: </a>
                  {value} VNĐ
                </div>
              )}
            />
          </Col>
          <Col span={4} style={{ alignSelf: "center", textAlign: "center" }}>
            <div className="item-cart-quantity">{product.qty}</div>
            <ButtonGroup>
              <Button onClick={() => handleDell(product)}>
                <MinusOutlined />
              </Button>
              <Button onClick={() => handleAdd(product)}>
                <PlusOutlined />
              </Button>
            </ButtonGroup>
            <NumberFormat
              value={(product.qty * product.prodPrice)}
              className="item-cart-sump"
              thousandSeparator={true}
              displayType={"text"}
              renderText={(value, props) => (
                <div {...props}>
                  {" "}
                  <a>Tổng: </a>
                  {value} VNĐ
                </div>
              )}
            />
          </Col>
        </Row>
      </>
    );
  };
  const [sumPrice, setSumPrice] = useState(0);

  useEffect(() => {
    setSumPrice(state.reduce((a, v) => (a = a + v.qty * v.prodPrice), 0));
  }, [state]);

  const buttons = () => {
    return (
      <>
        <Row style={{marginBottom:"50px"}}>
          <Col span={5} style={{ marginLeft: "auto" }}>
            <div style={{fontSize:"25px"}}>Tổng tiền:</div>
            <NumberFormat
              value={sumPrice}
              className="item-cart-price"
              thousandSeparator={true}
              displayType={"text"}
              renderText={(value, props) => (
                <div {...props}>
                  {value} VNĐ
                </div>
              )}
            />
            <NavLink to={"/thanh-toan"}>
              <Button className="btnAdd-product-detail">Thanh toán</Button>
            </NavLink>
          </Col>
        </Row>
      </>
    );
  };
  return (
    <>
      <Layout style={{ paddingTop: "20px", background: "rgb(247 247 247)" }}>
        {state.length === 0 && emptyCart()}
        {state.length !== 0 && state.map(cartItem)}
        {state.length !== 0 && buttons()}
      </Layout>
    </>
  );
}
