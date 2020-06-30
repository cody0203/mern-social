import React from 'react';
import { Input, Form } from 'antd';

const { TextArea } = Input;

const CustomInput = ({ label, name, rules, type }) => {
  let input = <Input />;

  if (type === 'password') {
    input = <Input.Password />;
  }

  if (type === 'textarea') {
    input = <TextArea rows={4} />;
  }

  return (
    <Form.Item label={label} name={name} rules={rules}>
      {input}
    </Form.Item>
  );
};

export default CustomInput;
