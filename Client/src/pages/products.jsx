import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Col, Layout, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { addCart, hideModal, showModal } from "../redux/action";
import NumberFormat from "react-number-format";
import { CreateProdModal } from "../components/Product/ProdModal/add";
import {
  modalState$,
  productDetailState$,
  productsState$,
} from "../redux/selectors";
import * as actions from "../redux/action";
import axios from "axios";
import * as api from "../api";

export function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector(productsState$);

  const dispatch = useDispatch();

  //add prod to cart
  const addProduct = (product) => {
    dispatch(addCart(product));
  };
  //pop-up modal create prod
  const openCreateProdModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.getProducts.getProductsRequest());
    // const getProducts = async () => {
    //   setLoading(true);
    // const response = await api.fetchProducts();
    //   const responses = await axios.get("http://localhost:5000/product/category", {});
    //   if (componentMounted) {
    //     setFilter(await products);
    //     setLoading(false);
    //     console.log(products);
    //   }
    //   return () => {
    //     componentMounted = false;
    //   };
    // };
    // getProducts();
  }, [dispatch]);

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);
  const Loading = () => {
    return (
      <>
        <div style={{ margin: "16px" }}>
          <Row gutter={[8, 8]} style={{ justifyContent: "center" }}>
            <Col span={4} style={{ margin: "17px" }}>
              <Skeleton width={240} height={380} />
            </Col>
            <Col span={4} style={{ margin: "17px" }}>
              <Skeleton width={240} height={380} />
            </Col>
            <Col span={4} style={{ margin: "17px" }}>
              <Skeleton width={240} height={380} />
            </Col>
            <Col span={4} style={{ margin: "17px" }}>
              <Skeleton width={240} height={380} />
            </Col>
            <Col span={4} style={{ margin: "17px" }}>
              <Skeleton width={240} height={380} />
            </Col>
          </Row>
        </div>
      </>
    );
  };

  // const FilterProducts = (cate) => {
  //   const updateProducts = data.filter((x) => x.category === cate);
  //   setFilter(updateProducts);
  // };

  const ShowProducts = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            style={{ margin: "0 5px" }}
            onClick={() => setFilter(products)}
          >
            Tất cả
          </Button>
          {/* {dataCate.map((cate, index) => {
            return (
              <div key={index}>
                <Button
                  style={{ margin: "0 5px" }}
                  onClick={() => FilterProducts(cate)}
                >
                  {cate}
                </Button>
              </div>
            );
          })} */}
        </div>

        <Row gutters={16} style={{ justifyContent: "center" }}>
          {products.map((product) => {
            return (
              <div key={product._id}>
                <Col span={5} style={{ margin: "10px" }}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    loading={loading}
                    className="box-card-list"
                    bodyStyle={{
                      width: 240,
                      height: 380,
                      padding: 0,
                      borderRadius: "3px",
                    }}
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
      <Layout style={{ background: "white" }}>
        <Button
          onClick={() => openCreateProdModal()}
          style={{ marginLeft: "84%" }}
        >
          Thêm sản phẩm
        </Button>

        <CreateProdModal />
        <div style={{ margin: "0 auto" }}>
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </Layout>
    </>
  );
}
