import React from "react";
import ReactChildren from "react-children-utilities";
import { Input, FileInput, Select, Textarea } from "./index";

const uniqueId = (() => {
  let value = Date.now();
  return () => ++value;
})();

const Field = ({ params, elements, children, ...props }) => {
  const Elements = {
    Field: elements?.Field ?? Field,
    FieldLabel: elements?.FieldLabel ?? FieldLabel,
    FieldError: elements?.FieldError ?? FieldError,
    Input: elements?.Input ?? Input,
    FileInput: elements?.FileInput ?? FileInput,
    Textarea: elements?.Textarea ?? Textarea,
    Select: elements?.Select ?? Select,
  };

  const Element = ReactChildren.deepFind(children, (child) => {
    if (child) {
      let isInputElements =
        child.type === Elements.Input ||
        child.type === Elements.FileInput ||
        child.type === Elements.Textarea ||
        child.type === Elements.Select;

      return isInputElements;
    }
  });

  const id = `id-${uniqueId()}`;

  return (
    <div {...props}>
      {ReactChildren.deepMap(children, (child) => {
        if (child) {
          let isInputElements =
            child.type === Elements.Input ||
            child.type === Elements.FileInput ||
            child.type === Elements.Textarea ||
            child.type === Elements.Select;

          if (isInputElements) {
            return React.cloneElement(child, {
              ...child.props,
              id,
            });
          }

          let isLabelElement = child.type === Elements.FieldLabel;

          if (isLabelElement) {
            return React.cloneElement(child, {
              ...child.props,
              htmlFor: id,
            });
          }

          let isErrorElement = child.type === Elements.FieldError;

          if (isErrorElement) {
            return React.cloneElement(child, {
              ...child.props,
              name: Element?.props?.name,
              params,
            });
          }
        }

        return child;
      })}
    </div>
  );
};

export { Field };

const FieldLabel = ({ required, requiredElement, children, ...props }) => {
  const RequiredElement = requiredElement ?? <span className="text-rose-700">&nbsp;*</span>;

  return (
    <label {...props}>
      {children}
      {!!required && RequiredElement}
    </label>
  );
};

export { FieldLabel };

const FieldError = ({ name, params, ...props }) => {
  if (!(params.touched?.[name] && params.errors?.[name])) return null;

  // console.log(name);

  return <div {...props}>{params.errors?.[name]}</div>;
};

export { FieldError };
