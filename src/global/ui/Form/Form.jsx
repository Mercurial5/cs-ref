import React from "react";
import ReactChildren from "react-children-utilities";
import { Field, Input, Textarea, Select } from "./index";

const Form = ({ params, children, ...props }) => {
  return (
    <form onSubmit={params.handleSubmit} {...props}>
      {ReactChildren.deepMap(children, (child) => {
        if (child) {
          let isInputElements =
            child.type === Input || child.type === Textarea || child.type === Select;

          if (isInputElements) {
            return React.cloneElement(child, {
              ...child.params,
              value: params.values[params.name],
              onChange: params.handleChange,
              onBlur: params.handleBlur,
            });
          }

          let isInfoElement = child.type === Field;

          if (isInfoElement) {
            return React.cloneElement(child, {
              ...child.params,
              params,
            });
          }
        }

        return child;
      })}
    </form>
  );
};

export { Form };
