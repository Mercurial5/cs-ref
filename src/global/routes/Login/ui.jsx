import { useForm, Form, Field, FieldError, Input } from "../../ui/Form";
import * as user from "../../api/user";
import * as yup from "yup";

const LoginForm = ({ children, ...props }) => {
  const login = user.scripts.login();

  const form = useForm({
    values: {
      email: "",
      password: "",
    },

    schema: yup.object({
      email: yup
        .string()
        .required("Это поле обязательное!")
        .email("Пожалуйста, введите адрес почты"),
      password: yup.string().required("Это поле обязательное!"),
    }),

    onSubmit: login.handle,
  });

  return (
    <Form params={form} {...props}>
      {typeof children === "function" ? children(login.query) : children}
    </Form>
  );
};

const LoginUI = () => (
  <>
    <LoginForm>
      {({ isLoading, isError }) => (
        <>
          <Field>
            <Input name="email" />
            <FieldError />
          </Field>

          <Field>
            <Input name="password" type="password" />
            <FieldError />
          </Field>

          <div className={`${isError && !isLoading ? "" : "hidden"}`}>
            Неверный логин или пароль
          </div>

          <button type="submit">{!isLoading ? "Войти" : "Вход"}</button>
        </>
      )}
    </LoginForm>
  </>
);

export default LoginUI;
