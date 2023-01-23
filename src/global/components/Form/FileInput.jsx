import { forwardRef } from "react";

const FileInput = forwardRef((props, ref) => {
  return <input type="file" ref={ref} {...props} />;
});

export { FileInput };
