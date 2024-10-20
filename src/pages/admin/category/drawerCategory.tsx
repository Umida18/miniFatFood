import { AutoForm, FieldType } from "@src/components/autoForm";
import { Button, Drawer, Space } from "antd";
import { Dispatch, SetStateAction } from "react";

interface TypeProps {
  handleOk: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
  form: any;
  handleSubmit: (value: Record<string, any>) => void;
  editCategoryId: number | null;
  previewUrl: string | null;
  setPreviewUrl: Dispatch<SetStateAction<string | null>>;
}

const DrawerCategory: React.FC<TypeProps> = ({
  handleCancel,
  isModalOpen,
  form,
  handleSubmit,
  editCategoryId,
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
