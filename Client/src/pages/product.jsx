import { Col, Layout, Row, Button, Typography, Input } from "antd";
import NumberFormat from "react-number-format";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import { NavLink, useParams } from "react-router-dom";
import * as actions from "../redux/action";
import { productsState$, productDetailState$ } from "../redux/selectors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as api from "../api";

export function Product() {
  const id = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState([]);
  const product = useSelector(productDetailState$);
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const delProduct = (id) => {
    dispatch(actions.delProduct.delProductRequest(id));
    navigate("/san-pham");
  };
  useEffect(() => {
    dispatch(actions.getProductDetail.getProductDetailRequest(id));
    // const getProduct = async () => {
    // setLoading(true);

    // setLoading(false);
    // };
    // getProduct();
  }, [dispatch]);
  // console.log(product);
  //anim loading
  const Loading = () => {
    return (
      <>
        <Row gutter={[8, 8]}>
          <Col span={14}>
            <div style={{ minHeight: "100vh", padding: "8px" }}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Skeleton height={400} width={418} />
                </Col>
                <Col span={12}>
                  <Skeleton height={400} width={418} />
                </Col>
                <Col span={12}>
                  <Skeleton height={400} width={418} />
                </Col>
                <Col span={12}>
                  <Skeleton height={400} width={418} />
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={10} style={{ background: "white" }}>
            <div style={{ padding: "8px" }}>
              <Skeleton height={50} width={500} />
              <Skeleton height={50} width={200} />
              <Skeleton height={200} width={500} />
              <div className="price-product-detail">
                <Skeleton height={50} width={200} />
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  };
  const ShowProduct = () => {
    setImg(product.prodPicture);
    return (
      <div>
        <Row gutter={[8, 8]}>
          <Col span={14} style={{ background: "#f7f7f7" }}>
            <div style={{ minHeight: "100vh", padding: "8px" }}>
              <Row gutter={[8, 8]}>
                {(img || []).map((e) => (
                  <>
                    <Col span={12}>
                      <div
                        style={{
                          height: "400px",
                          width: "418px",
                          textAlign: "center",
                        }}
                      >
                        <img
                          style={{
                            height: "400px",
                            width: "418px",
                            objectFit: "contain",
                          }}
                          src={`${e}`}
                          alt={product.prodName}
                        ></img>
                      </div>
                    </Col>
                  </>
                ))}
              </Row>
            </div>
          </Col>
          <Col span={10} style={{ background: "white", paddingLeft: "20px" }}>
            <div style={{ padding: "8px" }}>
              <div className="title-product-detail">{product.prodName}</div>
              <div className="category-product-detail">
                Loại: {product.prodCate}
              </div>
              <div className="description-product-detail">
                {product.prodDesc}
              </div>
              <Input.TextArea className="description-product-detail"
              value={product.prodDesc}
              bordered={false}
              autoSize={true}
              readOnly={true}
              />

              <NumberFormat
                value={product.prodPrice}
                className="price-product-detail"
                thousandSeparator={true}
                displayType={"text"}
                renderText={(value, props) => <div {...props}>{value} VNĐ</div>}
              />
              <Button
                className="btnAdd-product-detail"
                onClick={() => addProduct(product)}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
            <div>
              <NavLink to={`/san-pham/cap-nhat/${product._id}`}>
                <Button
                  className="btnAdd-product-detail"
                  style={{ float: "right" }}
                >
                  Cập nhật sản phẩm
                </Button>
              </NavLink>
            </div>
            <div className="clearfix"></div>
            <div>
              <Button
                className="btnAdd-product-detail"
                onClick={() => delProduct(product._id)}
                style={{ float: "right" }}
              >
                Xóa sản phẩm
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <>
      <div>
        <Layout style={{ paddingTop: "20px", background: "rgb(247 247 247)" }}>
          {loading ? <Loading /> : <ShowProduct />}
        </Layout>
      </div>
    </>
  );
}
