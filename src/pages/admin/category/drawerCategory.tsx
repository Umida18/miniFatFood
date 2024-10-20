import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { AutoForm, FieldType } from "@src/components/autoForm";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  UploadFile,
} from "antd";
import { Dispatch, SetStateAction } from "react";

const { Option } = Select;

interface TypeProps {
  handleOk: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
  form: any;
  handleSubmit: (value: Record<string, any>) => void;
  editCategoryId: number | null;
  previewUrl: string | null;
  setPreviewUrl: Dispatch<SetStateAction<string | null>>;
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const options = [
  { value: "input", label: "Input" },
  { value: "textarea", label: "Textarea" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio" },
  { value: "datetime", label: "DateTime" },
  { value: "file", label: "File" },
];

const DrawerCategory: React.FC<TypeProps> = ({
  handleOk,
  handleCancel,
  isModalOpen,
  form,
  handleSubmit,
  editCategoryId,
  previewUrl,
  setPreviewUrl,
  setFileList,
}) => {
  const fields: FieldType[] = [
    {
      label: "Title",
      name: "name",
      span: 24,
      rules: [{ required: true, message: "Please fill out this field." }],
    },
    {
      label: "Icon",
      name: "image",
      span: 24,
      rules: [{ required: true, message: "Please provide an icon!" }],
    },
  ];

  return (
    <Drawer
      width="600px"
      title={editCategoryId ? "Edit Category" : "Add New Category"}
      onClose={handleCancel}
      open={isModalOpen}
      extra={
        <Space>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={() => form.submit()} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <AutoForm fields={fields} form={form} handleSubmit={handleSubmit} />
    </Drawer>
  );
};

export default DrawerCategory;
