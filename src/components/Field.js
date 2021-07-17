import React, { Component, cloneElement } from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    const { registerField } = this.context;
    this.unregisterField = registerField(this);
  }

  componentWillUnmount() {
    if (this.unregisterField) {
      this.unregisterField();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const { name } = this.props;
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: event => {
        const newValue = event.target.value;
        setFieldsValue({ [name]: newValue });
      }
    };
  };

  render() {
    const { children } = this.props;
    const returnChildNode = cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
