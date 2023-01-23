import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Form, Field, FieldLabel, FieldError, Input } from "../components/Form";
import { useStore } from "../api/user/store";
import { useLoginQuery } from "../api/user/queries";
import { useTokenUpdate } from "../api/tools/axios";
import * as yup from "yup";

const LoginView = () => (
  <div className="min-h-screen sm:py-16 grid grid-cols-1 lg:grid-cols-2 bg-white sm:bg-zinc-900">
    <div className="hidden lg:flex justify-center items-center">
      <svg className="w-96 h-96 mb-8 2xl:-mr-32" viewBox="0 0 52 50" fill="none">
        <path
          className="fill-zinc-700 stroke-zinc-700"
          strokeWidth="0.24"
          d="M3 3.476C3 3.213 3.213 3 3.477 3h38.619a.476.476 0 1 1 0 .951H3.954V41.53a.476.476 0 0 1-.954 0V3.476ZM8.721 46.524c0-.262.214-.475.477-.475H47.34V8.47a.476.476 0 0 1 .954 0v38.054a.476.476 0 0 1-.477.476H9.198a.476.476 0 0 1-.477-.476ZM47.672 4.531a.475.475 0 0 0 .01-.672.478.478 0 0 0-.673-.012L3.622 45.707a.475.475 0 0 0-.011.672.478.478 0 0 0 .674.012L47.672 4.53Z"
        />
        <path
          className="fill-zinc-700 stroke-zinc-700"
          strokeWidth="0.24"
          d="M15.855 9.892h-1.71a2.117 2.117 0 0 0-.27-.743 2 2 0 0 0-1.156-.899 2.61 2.61 0 0 0-.8-.118c-.51 0-.96.127-1.353.383-.393.252-.701.623-.924 1.113-.222.486-.333 1.08-.333 1.783 0 .714.11 1.316.333 1.806.226.486.534.854.924 1.104.393.246.842.369 1.348.369.28 0 .543-.037.787-.11.246-.075.467-.186.662-.332a2.03 2.03 0 0 0 .782-1.268l1.71.009c-.064.444-.203.86-.416 1.25-.21.389-.486.732-.828 1.03-.34.295-.74.526-1.197.694a4.477 4.477 0 0 1-1.523.246c-.822 0-1.557-.19-2.203-.57-.646-.38-1.155-.93-1.527-1.647-.372-.717-.557-1.578-.557-2.581 0-1.007.187-1.867.562-2.582.375-.717.885-1.266 1.531-1.646.646-.38 1.378-.57 2.194-.57.522 0 1.006.073 1.454.219.448.146.847.36 1.198.643.35.28.638.623.864 1.03.228.405.378.867.448 1.387ZM41.242 35.491c.317.222.497.532.54.93h1.632a2.43 2.43 0 0 0-.444-1.395 2.846 2.846 0 0 0-1.184-.953c-.5-.231-1.082-.347-1.746-.347-.655 0-1.242.116-1.76.347a2.96 2.96 0 0 0-1.23.962 2.404 2.404 0 0 0-.448 1.446c0 .669.223 1.206.668 1.61.448.401 1.057.7 1.828.898l1.065.274c.336.085.628.183.878.292.253.106.45.24.59.401.14.158.212.36.215.602a1.122 1.122 0 0 1-.243.703 1.572 1.572 0 0 1-.658.465c-.277.11-.6.164-.97.164a2.74 2.74 0 0 1-.96-.16 1.596 1.596 0 0 1-.69-.483 1.413 1.413 0 0 1-.301-.812h-1.669c.025.62.186 1.147.485 1.578.302.432.72.76 1.252.986.537.224 1.17.337 1.898.337.75 0 1.388-.116 1.915-.347.53-.234.935-.558 1.216-.971.28-.417.42-.899.42-1.446 0-.404-.076-.757-.228-1.058a2.35 2.35 0 0 0-.622-.77 3.594 3.594 0 0 0-.882-.53 6.044 6.044 0 0 0-1.02-.333l-.877-.219a5.557 5.557 0 0 1-.572-.168 2.615 2.615 0 0 1-.516-.247 1.21 1.21 0 0 1-.37-.365.943.943 0 0 1-.133-.506c.003-.234.072-.442.206-.625.134-.182.327-.326.58-.433a2.34 2.34 0 0 1 .91-.16c.503 0 .911.111 1.225.333Z"
        />
      </svg>
    </div>

    <div className="flex justify-center sm:items-center">
      <LoginFormLogic className="max-w-[500px] w-full px-6 sm:px-14 py-20 lg:-ml-24 xl:-ml-80 sm:rounded-lg sm:bg-white">
        {({ isLoading, isError }) => (
          <>
            <h2 className="mb-12 text-4xl text-gray-800 font-bold">Личный кабинет</h2>

            <Field className="mb-6 flex flex-col">
              <FieldLabel className="mb-2 text-sm sm:text-base text-gray-600">Почта</FieldLabel>

              <Input
                className="w-full px-4 py-2 sm:py-3 border-2 border-zinc-200 rounded  text-base sm:text-lg text-black focus:bg-zinc-200 autofill:bg-zinc-200 autofill:shadow-[inset_0_0_0px_1000px_rgb(248,248,248)] focus:outline-none transition ease-in-out duration-150"
                name="email"
                type="text"
                autoFocus
              />

              <FieldError className="mt-3 text-sm sm:text-base text-rose-700" />
            </Field>

            <Field className="mb-6 flex flex-col">
              <FieldLabel className="mb-2 text-sm sm:text-base text-gray-600">Пароль</FieldLabel>

              <Input
                className="w-full px-4 py-2 sm:py-3 border-2 border-zinc-200 rounded  text-base sm:text-lg text-black focus:bg-zinc-200  autofill:shadow-[inset_0_0_0px_1000px_rgb(248,248,248)] focus:outline-none transition ease-in-out duration-150"
                name="password"
                type="password"
              />

              <FieldError className="mt-3 text-sm sm:text-base text-rose-700" />
            </Field>

            <div className={`mt-2 text-rose-700 ${isError ? "" : "hidden"}`}>
              Неверный логин или пароль!
            </div>

            <button
              className={`w-full py-3 sm:py-4 mt-12 mb-8 flex justify-center items-center rounded text-center text-lg text-white font-semibold shadow-lg transition ease-in-out duration-150 select-none ${
                !isLoading ? "bg-zinc-900" : "bg-zinc-800"
              }`}
              type="submit"
              disabled={isLoading}
            >
              <div role="status">
                <svg
                  className={`${
                    isLoading ? "" : "hidden"
                  } w-5 h-5 -ml-3 mr-3 text-gray-200 animate-spin dark:text-zinc-100 fill-zinc-500`}
                  viewBox="0 0 100 101"
                  aria-hidden="true"
                  fill="none"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>

              {!isLoading ? "Войти" : "Вход"}
            </button>
          </>
        )}
      </LoginFormLogic>
    </div>
  </div>
);

const LoginFormLogic = ({ children, ...props }) => {
  const navigate = useNavigate();
  const user = useStore();

  useEffect(() => {
    if (user) navigate("/panel", { replace: true });
  }, [user]);

  const query = useLoginQuery();
  const update = useTokenUpdate();

  useEffect(() => {
    if (query.data) {
      update(query.data.auth_token);
      navigate("/panel", { replace: false });
    }
  }, [query.data]);

  const handleLogin = (data) => {
    if (!data.email || !data.password) return;
    query.mutate(data);
  };

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

    onSubmit: handleLogin,
  });

  return (
    <Form params={form} {...props}>
      {typeof children === "function"
        ? children({
            isLoading: query.isLoading,
            isError: query.isError,
          })
        : children}
    </Form>
  );
};

export default LoginView;
