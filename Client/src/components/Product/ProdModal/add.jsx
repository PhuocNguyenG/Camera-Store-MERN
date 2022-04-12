import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  Col,
  Layout,
  Row,
  Button,
  Modal,
  Input,
  Tooltip,
  Form,
  Select,
  Switch,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createProduct } from "../../../redux/action";
import { modalState$ } from "../../../redux/selectors";
import { hideModal } from "../../../redux/action";
import NumberFormat from "react-number-format";

export function CreateProdModal() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    prodName: "",
    prodPrice: "",
    prodPicture: [],
    prodCate: "",
    prodDesc: "",
  });
  const { isShow } = useSelector(modalState$);
  const [img, setImg] = useState([]);

  const onSubmit = React.useCallback(async () => {
    console.log({ data });
    setData({ ...data, prodPicture: img });
    dispatch(createProduct.createProductRequest(data));
    onClose();
  }, [data, dispatch]);
  const onClose = React.useCallback(() => {
    dispatch(hideModal());
    setData({
      prodName: "",
      prodPrice: "",
      prodPicture: [],
      prodCate: "",
      prodDesc: "",
    });
    setImg([]);
  }, [dispatch]);

  const CreateProd = (
    <div>
      <Form>
        <Row gutter={[8, 8]} style={{width:"fit-content"}}>
          <Col span={10} style={{ background: "#f7f7f7" }}>
            <div style={{ minHeight: "fit-content", padding: "8px" }}>
              {img.map((e) => {
                return <img src={`${e}`} alt="Picture" />;
              })}
            </div>
            <img src="" alt="Picture" />
          </Col>
          <Col span={14} style={{ background: "white", paddingLeft: "20px" }}>
            <div style={{ padding: "8px" }}>
              <Form.Item style={{ margin: "10px" }}>
                <Input
                  value={data.prodName}
                  onChange={(e) =>
                    setData({ ...data, prodName: e.target.value })
                  }
                  placeholder="Tên sản phẩm"
                />
              </Form.Item>
              <Form.Item style={{ margin: "10px" }}>
                <Select
                  placeholder="Loại sản phẩm"
                  onChange={(e) =>
                    setData({
                      ...data,
                      prodCate: e,
                    })
                  }
                >

                  <Select.Option value="Máy ảnh">Máy ảnh</Select.Option>
                  <Select.Option value="Máy quay phim">
                    Máy quay phim
                  </Select.Option>
                  <Select.Option value="Ống kính">Ống kính</Select.Option>
                  <Select.Option value="Tay cầm">Tay cầm (gimbal)</Select.Option>

                </Select>
              </Form.Item>
              <Form.Item style={{ margin: "10px" }}>
                <Input.TextArea
                  placeholder="Mô tả"
                  className="description-product-detail"
                  value={data.prodDesc}
                  onChange={(e) =>
                    setData({ ...data, prodDesc: e.target.value })
                  }
                  autoSize={true}
                />
              </Form.Item>
              <Form.Item style={{ margin: "10px" }}>
                <NumberFormat
                  value={data.prodPrice}
                  className=""
                  thousandSeparator={true}
                  displayType={"text"}
                  renderText={(value, props) => (
                    <div {...props}>{value} VNĐ</div>
                  )}
                />
                <Input
                  value={data.prodPrice}
                  onChange={(e) =>
                    setData({ ...data, prodPrice: e.target.value })
                  }
                  placeholder="Giá sản phẩm"
                />
              </Form.Item>
              <Form.Item style={{ margin: "10px" }}>
                <FileBase64
                  accept="image/*"
                  multiple={true}
                  type="file"
                  value={data.prodPicture}
                  onDone={async (base64) => {
                    await base64.forEach((element) => {
                      img.push(element.base64);
                    });
                    setData({ ...data, prodPicture: img });
                  }}
                />
              </Form.Item>
              <Form.Item
                style={{ margin: "10px" }}
                label="Trạng thái"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <div onClick={onSubmit} style={{ float: "right" }}>
                <Button className="btnAdd-product-detail">Thêm sản phẩm</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );

  return (
    <>
      <div>
        <Modal visible={isShow} onCancel={onClose} footer={false}>
          <Layout
            style={{ paddingTop: "20px", background: "rgb(247 247 247)" }}
          >
            <div>{CreateProd}</div>
          </Layout>
        </Modal>
      </div>
    </>
  );
}
