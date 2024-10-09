import { css } from "@emotion/react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const customStyleModal = css`
  .custom-modal .ant-modal-content {
    padding: 15px !important; /* Overrides the global padding */
  }
`;

interface TypeProps {
  showModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
  form: any;
  handleSubmit: (value: { name: string; image: string }) => Promise<void>;
  editCategoryId: number | null;
}

const DrawerCategory: React.FC<TypeProps> = ({
  handleOk,
  handleCancel,
  isModalOpen,
  form,
  handleSubmit,
  editCategoryId,
}) => {
  const onSubmit = (values: { name: string; image: any }) => {
    handleSubmit({
      ...values,
      image: values.image?.fileList?.[0]?.originFileObj || null,
    });
  };

  return (
    <div>
      <Modal
        className="custom-modal"
        css={customStyleModal}
        style={{ padding: "15px" }}
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              maxCount={1} // Limit to one image
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
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
              {editCategoryId ? "Edit" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default DrawerCategory;
