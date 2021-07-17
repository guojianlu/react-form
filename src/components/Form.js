import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

export default function Form(props) {
  const [form] = useForm(props.form);

  form.setCallback({
    onFinish: props.onFinish || (() => {}),
    onFinishFailed: props.onFinishFailed || (() => {})
  });

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        form.submit();
      }}
    >
      <FieldContext.Provider value={form}>
        {props.children}
      </FieldContext.Provider>
    </form>
  );
}
