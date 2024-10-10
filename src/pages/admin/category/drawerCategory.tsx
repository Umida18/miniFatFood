import { css } from "@emotion/react";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Upload,
  UploadProps,
  UploadFile,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useState } from "react";

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
  handleSubmit: (value: { name: string; image?: string }) => Promise<void>;
  editCategoryId: number | null;
  previewUrl: string | null;
  uploadProps: UploadProps;
  fileList: UploadFile[];
  setPreviewUrl: Dispatch<SetStateAction<string | null>>;
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>;
}

const DrawerCategory: React.FC<TypeProps> = ({
  handleOk,
  handleCancel,
  isModalOpen,
  form,
  handleSubmit,
  editCategoryId,
  uploadProps,
  previewUrl,
  setPreviewUrl,
  setFileList,
}) => {
  const [previewImage, setPreviewImage] = useState<string>("");

  const removeImage = () => {
    setPreviewImage("");
    setPreviewUrl(null);
    setFileList([]);
    form.setFieldsValue({ image: undefined });
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
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="image">
            {previewUrl ? (
              <div>
                <Image
                  src={previewUrl}
                  alt="Uploaded Image"
                  style={{ maxWidth: "100%" }}
                />
                <Button
                  icon={<DeleteOutlined />}
                  onClick={removeImage}
                  style={{ marginTop: "10px", color: "red" }}
                >
                  Delete Image
                </Button>
              </div>
            ) : (
              <Upload {...uploadProps}>Upload img</Upload>
            )}
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
