import React, { useEffect } from "react";
import Form, { Field } from "./components";
import "./style.css";

const Input = props => {
  return <input {...props} />;
};

const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };

export default function App() {
  const [form] = Form.useForm();

  const onFinish = val => {
    console.log("onFinish", val);
  };

  const onFinishFailed = val => {
    console.log("onFinishFailed", val);
  };

  useEffect(() => {
    console.log("form", form);
    form.setFieldsValue({ username: "default" });
  }, []);

  return (
    <div>
      <div>MyRcFieldForm</div>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="please input username" />
        </Field>
        <Field name="password" rules={[passwordRules]}>
          <Input placeholder="please input username" />
        </Field>
        <button>Submit</button>
      </Form>
    </div>
  );
}
