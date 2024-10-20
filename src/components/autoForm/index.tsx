import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import React from "react";
import type { FormInstance, SelectProps } from "antd";
import { Rule } from "antd/es/form";

export type FieldType = {
  label: string | React.ReactNode;
  name: string;
  type?: "input" | "select" | "checkbox" | "number" | "password";
  options?: SelectProps["options"];
  span?: number;
  rules?: Rule[];
};

type FormValues = {
  name: string;
  image?: string;
};

export const Field = ({
  field,
  columnSize,
}: {
  field: FieldType;
  columnSize?: number;
}) => {
  if (!field.type) field.type = "input";

  const getElement = () => {
    switch (field.type) {
      case "input":
        return <Input />;
      case "select":
        return <Select options={field.options} />;
      case "number":
        return <InputNumber className="w-full" />;
      case "password":
        return <Input.Password />;
    }
  };

  return (
    <Col
      span={field.span ?? 24 / (columnSize ?? 2)}
      xs={24}
      sm={24}
      md={12}
      lg={field.span}
      xl={field.span}
    >
      <Form.Item name={field.name} label={field.label} rules={field.rules}>
        {getElement()}
      </Form.Item>
    </Col>
  );
};

export const AutoForm = ({
  fields,
  columnSize,
  form,
  handleSubmit,
}: {
  fields: FieldType[];
  columnSize?: number;
  form: FormInstance<any>;
  handleSubmit: (value: Record<string, any>) => void;
}) => {
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={[16, 0]}>
        {fields.map((field, index) => (
          <Field key={index} field={field} columnSize={columnSize} />
        ))}
      </Row>
    </Form>
  );
};
