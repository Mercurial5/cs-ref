import { useFormik } from "formik";

const useForm = ({ values, schema, ...params }) => {
  return useFormik({
    initialValues: values,
    validationSchema: schema,
    validateOnChange: false,
    ...params,
  });
};

export { useForm };
