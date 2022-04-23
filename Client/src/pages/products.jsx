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

function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(productsState$);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  //pop-up modal create product
  const openCreateProdModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  //get products
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
    <main>
      <Layout style={{ background: "white" }}>
        <Button
          onClick={() => openCreateProdModal()}
          style={{ marginLeft: "84%" }}
        >
          Thêm sản phẩm
        </Button>

        <CreateProdModal />
        <div style={{ margin: "0 auto" }}>
          <ShowProducts />
        </div>
      </Layout>
    </main>
  );
}
export { Products };
