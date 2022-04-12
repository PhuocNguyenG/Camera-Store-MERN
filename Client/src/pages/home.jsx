import React, { useEffect, useState } from "react";
import { Layout, Carousel, Divider, Row, Col, Card, Button } from "antd";
import images from "../api/image";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import NumberFormat from "react-number-format";
import * as actions from "../redux/action";
import { productsState$ } from "../redux/selectors";

const { Content } = Layout;

const bannerStyle = {
  width: "fit-content",
  height: "300px",
  margin: "0 auto",
};
export function Home() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };
  const products = useSelector(productsState$);
  useEffect(() => {
    dispatch(actions.getProducts.getProductsRequest());
  }, []);

  const ShowProducts = () => {
    return (
      <>
        <Row gutters={16} style={{ justifyContent: "center" }}>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <Col span={5} style={{ margin: "10px" }}>
                  <Card
                    hoverable
                    loading={loading}
                    bodyStyle={{
                      width: 240,
                      height: 380,
                      padding: 0,
                      borderRadius: "3px",
                    }}
                    className="box-card-list"
                  >
                    <div style={{ height: "320px" }}>
                      <NavLink to={`/san-pham/${product._id}`}>
                        <img
                          style={{
                            width: "100%",
                            height: "240px",
                            padding: "5px",
                          }}
                          src={product.prodPicture[0]}
                          alt={product.prodName}
                        />
                        <div>
                          <div className="titleProduct">{product.prodName}</div>
                          <NumberFormat
                            value={product.prodPrice}
                            className="priceProduct"
                            thousandSeparator={true}
                            displayType={"text"}
                            renderText={(value, props) => (
                              <div {...props}>{value} VNĐ</div>
                            )}
                          />
                        </div>
                      </NavLink>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => addProduct(product)}
                        className="btnCart"
                      >
                        <FontAwesomeIcon icon={faCartPlus} size="2x" />
                        Thêm vào giỏ
                      </Button>
                    </div>
                  </Card>
                </Col>
              </div>
            );
          })}
        </Row>
      </>
    );
  };
  return (
    <>
      <Layout>
        <Content>
          <Carousel effect="fade" autoplay>
            {images.map(({ src }) => {
              return (
                <div key={src}>
                  <div>
                    <div style={{ background: "black" }}>
                      <img style={bannerStyle} src={src} alt="banner" />
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
          <Divider orientation="center">Sản phẩm mới nhất</Divider>
          {loading ? <Loading /> : <ShowProducts />}
        </Content>
      </Layout>
    </>
  );
}
