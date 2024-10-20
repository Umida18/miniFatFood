import { css } from "@emotion/react";
import { RootState } from "@src/store";
import { AutoForm, FieldType } from "@src/components/autoForm";
import { Button, Drawer, Modal, Select, Space } from "antd";
import { useSelector } from "react-redux";

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
  handleSubmit: (value: Record<string, any>) => void;
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
  const { category } = useSelector((state: RootState) => state.dataCategory);

  const fields: FieldType[] = [
    {
      label: "Image",
      name: "image",
      span: 24,
      rules: [{ required: true, message: "Image is required!" }],
    },
    {
      label: "Name",
      name: "title",
      span: 24,
      rules: [{ required: true, message: "Title is required!" }],
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      span: 12,
      rules: [{ required: true, message: "Price is required!" }],
    },
    {
      label: "Weight",
      name: "weight",
      type: "number",
      span: 12,
      rules: [{ required: true, message: "Weight is required!" }],
    },
    {
      label: "Description",
      name: "desc",
      span: 24,
      rules: [{ required: true, message: "Description is required!" }],
    },
    {
      label: "Compound",
      name: "compound",
      span: 24,
      rules: [{ required: true, message: "Compound is required!" }],
    },
    {
      label: "Calories",
      name: "calories",
      type: "number",
      span: 24,
      rules: [{ required: true, message: "Calories are required!" }],
    },
    {
      label: "Category",
      name: "categoryId",
      type: "select",
      options: category.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      span: 24,
      rules: [{ required: true, message: "Category is required!" }],
    },
  ];

  return (
    <div>
      <Drawer
        width="600px"
        title={
          editProductId ? "Редактировать продукт" : "Добавить новый продукт"
        }
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
    </div>
  );
};

export default DrawerProduct;
