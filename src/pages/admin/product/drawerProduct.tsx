import { css } from "@emotion/react";
import { RootState } from "@src/store";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useSelector } from "react-redux";

const customStyleModal = css`
  .custom-modal .ant-modal-content {
    padding: 15px !important; /* Overrides the global padding */
  }
`;
const { Option } = Select;
interface TypeProps {
  showModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
  form: any;
  handleSubmit: (value: {
    image: string;
    title: string;
    price: number;
    weight: number;
    desc: string;
    compound: string[];
    calories: number;
    categoryId: number;
  }) => Promise<void>;
  editProductId: number | null;
}

const DrawerProduct: React.FC<TypeProps> = ({
  handleOk,
  handleCancel,
  isModalOpen,
  form,
  handleSubmit,
  editProductId,
}) => {
  const { category, isLoadingCategory, isErrorCategory } = useSelector(
    (state: RootState) => state.dataCategory
  );
  return (
    <div>
      <Modal
        className="custom-modal"
        css={customStyleModal}
        style={{ padding: "15px", top: "10px" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name="image" label="Image">
            <Input />
          </Form.Item>
          <Form.Item name="title" label="Name">
            <Input />
          </Form.Item>
          <Row gutter={32}>
            <Col>
              <Form.Item name="price" label="price">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="weight" label="weight">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="desc" label="desc">
            <Input />
          </Form.Item>
          <Form.Item name="compound" label="compound">
            <Input />
          </Form.Item>
          <Form.Item name="calories" label="calories">
            <Input />
          </Form.Item>
          <Form.Item name="categoryId" label="Category">
            <Select>
              {category.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div className="flex gap-3 justify-end">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              style={{
                backgroundColor: "#ffab08",
                border: "0px",
                color: "white",
              }}
              htmlType="submit"
            >
              {editProductId ? "Edit" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default DrawerProduct;
