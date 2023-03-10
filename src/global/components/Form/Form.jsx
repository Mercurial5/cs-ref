import React from "react";
import ReactChildren from "react-children-utilities";
import { Field, FieldLabel, FieldError, Input, FileInput, Textarea, Select } from "./index";

const Form = ({ params, elements, children, ...props }) => {
  const Elements = {
    Field: elements?.Field ?? Field,
    FieldLabel: elements?.FieldLabel ?? FieldLabel,
    FieldError: elements?.FieldError ?? FieldError,
    Input: elements?.Input ?? Input,
    FileInput: elements?.FileInput ?? FileInput,
    Textarea: elements?.Textarea ?? Textarea,
    Select: elements?.Select ?? Select,
  };

  return (
    <form onSubmit={params.handleSubmit} {...props}>
      {ReactChildren.deepMap(children, (child) => {
        if (child) {
          let isInputElements =
            child.type === Elements.Input ||
            child.type === Elements.Textarea ||
            child.type === Elements.Select;

          if (isInputElements) {
            const value = params.values[child.props?.name];
            const onChange = (e) => child.props?.onChange && child.props?.onChange(e);
            const onBlur = (e) => child.props?.onBlur && child.props?.onBlur(e);

            return React.cloneElement(child, {
              ...child.props,
              value,
              onChange: (e) => onChange(e) & params.handleChange(e),
              onBlur: (e) => onBlur(e) & params.handleBlur(e),
            });
          }

          let isFileInputElement = child.type === Elements.FileInput;

          if (isFileInputElement) {
            return React.cloneElement(child, {
              ...child.props,
              onChange: (e) => params.setFieldValue(child.props?.name, e.currentTarget.files[0]),
              onDelete: () => params.setFieldValue(child.props?.name, null),
            });
          }

          let isFieldElement = child.type === Elements.Field;

          if (isFieldElement) {
            return React.cloneElement(child, {
              ...child.props,
              params,
              elements,
            });
          }
        }

        return child;
      })}
    </form>
  );
};

export { Form };
