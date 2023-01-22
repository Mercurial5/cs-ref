import React from "react";
import ReactChildren from "react-children-utilities";
import { Input, Textarea, Select } from "./index";

const uniqueId = (() => {
  let value = Date.now();

  return () => {
    value++;
    return value;
  };
})();

const Field = ({ element, required, requiredElement, params, children, ...props }) => {
  const Element = ReactChildren.deepFind(children, (child) => {
    if (child) {
      let isInputElements =
        child.type === Input || child.type === Textarea || child.type === Select;

      return isInputElements;
    }
  });

  const RequiredElement = requiredElement ?? <span className="text-rose-700">&nbsp;*</span>;

  const id = `id-${uniqueId()}`;

  return (
    <>
      <label htmlFor={id} {...props}>
        {element}
        {!!required && RequiredElement}
      </label>

      {ReactChildren.deepMap(children, (child) => {
        if (child) {
          let isInputElements =
            child.type === Input || child.type === Textarea || child.type === Select;

          if (isInputElements) {
            return React.cloneElement(child, {
              ...child.params,
              id,
            });
          }

          let isErrorElement = child.type === FieldError;

          if (isErrorElement) {
            return React.cloneElement(child, {
              ...child.params,
              name: Element?.props?.name,
              params,
            });
          }
        }

        return child;
      })}
    </>
  );
};

export { Field };

const FieldError = ({ name, params, ...props }) => {
  if (!(params.touched?.[name] && params.errors?.[name])) return null;

  return <div {...props}>{params.errors?.[name]}</div>;
};

export { FieldError };
