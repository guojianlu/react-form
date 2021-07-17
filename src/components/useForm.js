import React from "react";

class FormStore {
  constructor() {
    // 存储数据
    this.store = {};
    // 存储下Field 实例
    this.fieldEntities = [];
    // 存储Form回调函数
    this.callbacks = {};
  }

  registerField = entity => {
    this.fieldEntities.push(entity);
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  setCallback = callback => {
    this.callbacks = { ...this.callbacks, ...callback };
  };

  getFieldValue = name => {
    return this.store[name];
  };

  setFieldsValue = newStore => {
    this.store = { ...this.store, ...newStore };
    // 更新组件
    this.fieldEntities.forEach(entity => {
      const { name } = entity.props;
      Object.keys(newStore).forEach(key => {
        if (name === key) {
          entity.onStoreChange();
        }
      });
    });
  };

  validate = () => {
    const err = [];
    this.fieldEntities.forEach(entity => {
      const { name, rules } = entity.props;
      const value = this.getFieldValue(name);
      const rule = rules && rules[0];
      if (rule && rule.required && (value === undefined || value === "")) {
        //  出错
        err.push({
          [name]: rule.message,
          value
        });
      }
    });
    return err;
  };

  submit = () => {
    const err = this.validate();
    // 在这里校验 成功的话 执行onFinish ，失败执行onFinishFailed
    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length === 0) {
      onFinish(this.store);
    } else if (err.length > 0) {
      onFinishFailed(err);
    }
  };

  getForm = () => {
    return {
      submit: this.submit,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerField: this.registerField,
      setCallback: this.setCallback
    };
  };
}

export default function useForm(form) {
  const formRef = React.useRef();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}
