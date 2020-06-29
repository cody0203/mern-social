import React from "react";
import { Input, Form } from "antd";

const CustomInput = ({ label, name, rules, type }) => {
  let input = <Input />;

  if (type === "password") {
    input = <Input.Password />;
  }

  return (
    <Form.Item label={label} name={name} rules={rules}>
      {input}
    </Form.Item>
  );
};

export default CustomInput;
