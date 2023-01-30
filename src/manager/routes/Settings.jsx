import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore, useResetStore } from "../../global/api/user/store";
import { useLogoutQuery, useUpdateQuery, useCitiesQuery } from "../../global/api/user/queries";
import { useTokenUpdate } from "../../global/api/tools/axios";
import {
  useForm,
  Form,
  Field,
  FieldLabel,
  FieldError,
  Input,
  Select,
} from "../../global/components/Form";
import * as yup from "yup";

const SettingsView = () => (
  <div className="px-4 sm:px-20 pt-10 pb-5 sm:py-16 max-sm:border-t xl:mx-auto max-sm:-mx-6 max-sm:-mt-10 max-sm:-mb-10 grid grid-cols-1 lg:grid-cols-2 lg:gap-14 xl:container sm:rounded-2xl shadow-md shadow-slate-200 bg-white">
    <SectionView title="Персональные данные">
      <UserProvider>
        {(data) => (
          <div className="flex items-center mb-10">
            <img src="/users/1.png" alt="#" className="w-14 h-14 rounded-full" />

            <div className="ml-6 sm:ml-7 mr-8 flex flex-col text-left">
              <span className="text-lg sm:text-lg font-semibold leading-5 max-sm:mb-2">
                {data.fullname}
              </span>
              <span className="text-xs sm:text-sm font-normal">{data.email}</span>
            </div>

            <LogoutLogic>
              {({ handleLogout }) => (
                <button
                  className="ml-auto bg-transparent text-sm sm:text-base text-rose-700 focus:outline-none px-3 py-3 -mr-3"
                  type="button"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              )}
            </LogoutLogic>
          </div>
        )}
      </UserProvider>

      <PersonalFormLogic
        elements={{
          Field: FieldView,
          FieldLabel: FieldLabelView,
          FieldError: FieldErrorView,
          Input: InputView,
        }}
      >
        {(params) => (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-6">
              <FieldView>
                <FieldLabelView required>Имя</FieldLabelView>
                <InputView name="name" type="text" initial={params.initial.name} />
                <FieldErrorView />
              </FieldView>

              <FieldView>
                <FieldLabelView required>Фамилия</FieldLabelView>
                <InputView name="surname" type="text" initial={params.initial.surname} />
                <FieldErrorView />
              </FieldView>
            </div>

            <SaveButtonView params={params} />
          </>
        )}
      </PersonalFormLogic>
    </SectionView>

    <div>
      <SectionView title="Контактная информация">
        <CitiesProvider>
          {(data) => (
            <ContactFormLogic
              elements={{
                Field: FieldView,
                FieldLabel: FieldLabelView,
                FieldError: FieldErrorView,
                Input: InputView,
                Select: SelectView,
              }}
            >
              {(params) => (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-6">
                    <FieldView>
                      <FieldLabelView required>Номер телефона</FieldLabelView>
                      <InputView name="phone" type="text" initial={params.initial.phone} />
                      <FieldErrorView />
                    </FieldView>

                    <FieldView>
                      <FieldLabelView required>Город</FieldLabelView>
                      <SelectView name="city" initial={params.initial.city} options={data} />
                      <FieldErrorView />
                    </FieldView>

                    <FieldView>
                      <FieldLabelView required>Почта</FieldLabelView>
                      <InputView name="email" type="text" initial={params.initial.email} />
                      <FieldErrorView />
                    </FieldView>

                    <FieldView>
                      <FieldLabelView>Адрес</FieldLabelView>
                      <InputView name="address" type="text" initial={params.initial.address} />
                      <FieldErrorView />
                    </FieldView>
                  </div>

                  <SaveButtonView params={params} />
                </>
              )}
            </ContactFormLogic>
          )}
        </CitiesProvider>
      </SectionView>
    </div>
  </div>
);

const UserProvider = ({ children }) => {
  const store = useStore();

  const data = {
    email: store?.email,
    fullname:
      `${store?.surname} ${store?.name}`.length <= 17
        ? `${store?.surname} ${store?.name}`
        : `${store?.name} ${store?.surname?.[0]}.`,
  };

  return <>{typeof children === "function" ? children(data) : children}</>;
};

const CitiesProvider = ({ children }) => {
  const query = useCitiesQuery();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (query.data && query.isSuccess) {
      const data = query.data.map((city) => ({ value: city.id, text: city.name }));
      setCities(data);
    }
  }, [query.data, query.isSuccess]);

  return <>{typeof children === "function" ? children(cities) : children}</>;
};

const LogoutLogic = ({ children }) => {
  const navigate = useNavigate();
  const reset = useResetStore();
  const update = useTokenUpdate();
  const query = useLogoutQuery();

  useEffect(() => {
    if (query.isSuccess) {
      reset();
      update("");
      navigate("/", { replace: false });
    }
  }, [query.isSuccess]);

  const handleLogout = () => {
    query.mutate();
  };

  return (
    <>
      {typeof children === "function"
        ? children({
            handleLogout,
          })
        : children}
    </>
  );
};

const PersonalFormLogic = ({ children, ...props }) => {
  const store = useStore();
  const common = useCommonFormsUpdate();

  const form = useForm({
    values: {
      name: store?.name ?? "",
      surname: store?.surname ?? "",
    },

    schema: yup.object({
      name: yup.string().required("Это поле обязательное!"),
      surname: yup.string().required("Это поле обязательное!"),
    }),

    onSubmit: common.handleUpdate,
  });

  const [initial, setInitial] = useState({
    name: store?.name ?? "",
    surname: store?.surname ?? "",
  });

  useEffect(() => {
    setInitial({
      name: store?.name ?? "",
      surname: store?.surname ?? "",
    });
  }, [store]);

  return (
    <Form params={form} {...props}>
      {typeof children === "function"
        ? children({
            ...common.states,
            initial,
          })
        : children}
    </Form>
  );
};

const ContactFormLogic = ({ children, ...props }) => {
  const store = useStore();
  const common = useCommonFormsUpdate();

  const form = useForm({
    values: {
      phone: store?.phone ?? "",
      city: store?.city ?? undefined,
      email: store?.email ?? "",
      address: store?.address ?? "",
    },

    schema: yup.object({
      phone: yup
        .string()
        .required("Это поле обязательное!")
        .matches(/^\S*$/, "Введите его без пробелов")
        .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, "Введите номер телефона"),
      email: yup.string().required("Это поле обязательное!").email("Введите адрес почты"),
      city: yup.string().required("Это поле обязательное!"),
    }),

    onSubmit: common.handleUpdate,
  });

  const [initial, setInitial] = useState({
    phone: store?.phone ?? "",
    city: store?.city ?? "",
    email: store?.email ?? "",
    address: store?.address ?? "",
  });

  useEffect(() => {
    setInitial({
      phone: store?.phone ?? "",
      city: store?.city ?? "",
      email: store?.email ?? "",
      address: store?.address ?? "",
    });
  }, [store]);

  return (
    <Form params={form} {...props}>
      {typeof children === "function"
        ? children({
            ...common.states,
            initial,
          })
        : children}
    </Form>
  );
};

const FORM_STATES = {
  DEFAULT: 1,
  LOADING: 2,
  SUCCESS: 3,
  ERROR: 4,
};

const useCommonFormsUpdate = () => {
  const [state, setState] = useState(FORM_STATES.DEFAULT);
  const store = useStore();
  const query = useUpdateQuery();

  useEffect(() => {
    if (query.isLoading) {
      return setState(FORM_STATES.LOADING);
    }

    if (query.isSuccess && !query.isError) {
      setState(FORM_STATES.SUCCESS);
    }

    if (!query.isSuccess && query.isError) {
      setState(FORM_STATES.ERROR);
    }

    setTimeout(() => {
      setState(FORM_STATES.DEFAULT);
    }, 3000);
  }, [query.isSuccess, query.isError, query.isFetching]);

  const filterTakeOnlyChanged = (data) => {
    const _data = Object.assign({}, data);

    return Object.keys(_data).reduce((_changed, key) => {
      if (_data[key] === "") _data[key] = null;
      if (_data[key] !== store?.[key]) _changed[key] = _data[key];
      return _changed;
    }, {});
  };

  const handleUpdate = (data) => {
    data = filterTakeOnlyChanged(data);

    const isNothingChanged = !Object.keys(data).length;
    if (isNothingChanged) return;

    query.mutate(data);
  };

  return {
    states: {
      isDefault: state === FORM_STATES.DEFAULT,
      isLoading: state === FORM_STATES.LOADING,
      isSuccess: state === FORM_STATES.SUCCESS,
      isError: state === FORM_STATES.ERROR,
    },
    handleUpdate,
  };
};

const SectionView = (props) => (
  <section className="mb-8" {...props}>
    <div className="uppercase text-gray-600 text-sm sm:text-base font-semibold mb-4">
      {props.title}
    </div>

    <div className="border-gray-200 border-y-2 sm:border-2 sm:rounded-xl px-4 sm:px-8 py-8 max-sm:-mx-4">
      {props.children}
    </div>
  </section>
);

const FieldView = (props) => (
  <Field className="py-2 flex flex-col text-gray-600 text-xs sm:text-base" {...props}>
    {props.children}
  </Field>
);

const FieldLabelView = (props) => <FieldLabel className="block" {...props} />;

const FieldErrorView = (props) => (
  <FieldError className="mt-1 text-base text-rose-700" {...props} />
);

const InputView = (props) => (
  <Input
    className={`px-3 py-[10px] border-2 mt-2 rounded text-sm sm:text-base text-black bg-zinc-100 focus:bg-zinc-200 focus:outline-none transition ease-in-out duration-150 ${
      props.initial === props.value ? "border-zinc-200" : "border-emerald-700"
    }`}
    {...props}
  />
);

const SelectView = (props) => (
  <label className="w-full mt-2 text-zinc-200">
    <div className="relative">
      <Select
        className={`w-full pl-4 pr-10 py-[10px] border-2 rounded text-sm sm:text-base text-black bg-zinc-100 focus:bg-zinc-200 focus:outline-none transition ease-in-out duration-150 appearance-none ${
          props.initial == props.value ? "border-zinc-200" : "border-emerald-700"
        }`}
        {...props}
      />

      <div className="absolute top-2 bottom-2 right-1 w-10 sm:mt-2 flex justify-center items-center transition ease-in-out duration-150 pointer-events-none">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            fill="#000"
            d="M9.244 10.977 5.177 6.911a.84.84 0 0 0-1.183 0 .83.83 0 0 0 0 1.175l5.491 5.491a.83.83 0 0 0 1.175 0l5.492-5.491a.83.83 0 1 0-1.175-1.175l-4.067 4.133-.833.696-.833-.763Z"
          />
        </svg>
      </div>
    </div>
  </label>
);

const FileInputView = ({ onChange, onDelete, ...props }) => {
  const target = useRef(null);

  const file = props.file ?? null;
  const [defaultFile, setDefaultFile] = useState(file);
  const [selectedFile, setSelectedFile] = useState(file);

  const Tag = defaultFile ? "a" : "label";

  const onFileChange = (e) => {
    onChange(e);
    setSelectedFile(target.current.files[0]);
  };

  const onFileDelete = () => {
    onDelete();
    setDefaultFile(null);
    setSelectedFile(null);
    if (target.current) target.current.value = "";
  };

  return (
    <>
      <Tag
        className={`px-2 sm:pl-3 sm:pr-4 py-[12px] border-2 mt-2 rounded flex items-center text-base text-black whitespace-nowrap bg-zinc-100 hover:bg-zinc-200 transition ease-in-out duration-150 cursor-pointer ${
          selectedFile === defaultFile ? "border-zinc-200" : "border-emerald-700"
        }`}
        href={defaultFile?.document ?? ""}
      >
        <svg
          className={`w-5 h-5 shrink-0 ${selectedFile ? "fill-black" : "fill-gray-500"}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M5 0a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7.81a5 5 0 0 0-1.159-3.2L18.5 1.8A5 5 0 0 0 14.66 0H5Zm1.64 15.5a.64.64 0 0 0-.64.64v.32c0 .354.287.64.64.64h10.72a.64.64 0 0 0 .64-.64v-.32a.64.64 0 0 0-.64-.64H6.64ZM6 11.64a.64.64 0 0 1 .64-.64h10.72a.64.64 0 0 1 .64.64v.32a.64.64 0 0 1-.64.64H6.64a.64.64 0 0 1-.64-.64v-.32Zm.64-5.14a.64.64 0 0 0-.64.64v.32c0 .353.287.64.64.64h7.72a.64.64 0 0 0 .64-.64v-.32a.64.64 0 0 0-.64-.64H6.64Z"
            clipRule="evenodd"
          />
        </svg>

        <FileInput onChange={onFileChange} ref={target} hidden disabled={defaultFile} {...props} />

        <span className="ml-2 sm:ml-3 grow-[1] overflow-hidden text-sm sm:text-base">
          {selectedFile ? selectedFile.name : "Не выбрано"}
        </span>
      </Tag>

      {(defaultFile || selectedFile) && (
        <button
          type="button"
          className="mt-3 text-rose-700 self-start text-sm"
          onClick={onFileDelete}
        >
          Удалить
        </button>
      )}
    </>
  );
};

const SaveButtonView = ({ params: { isLoading, isSuccess, isError } }) => (
  <button
    className={`px-8 py-3 mt-8 mb-4 rounded-full flex justify-center items-center text-center text-sm sm:text-base bg-zinc-900 text-white font-semibold select-none ${
      isLoading ? "bg-zinc-900" : isSuccess ? "bg-emerald-800" : "bg-zinc-800"
    }`}
    type="submit"
  >
    <div role="status">
      {isLoading && (
        <svg
          aria-hidden="true"
          className="w-5 h-5 -ml-3 mr-3 text-gray-200 animate-spin dark:text-zinc-100 fill-zinc-500"
          viewBox="0 0 100 100"
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
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="#0D0D0D"
            d="M85.66 22.303a4.125 4.125 0 0 1 .342 5.82l-43.997 49.5a4.125 4.125 0 0 1-6.167 0L13.84 52.873a4.125 4.125 0 0 1 6.162-5.478L38.92 68.676l40.92-46.035a4.124 4.124 0 0 1 5.82-.338Z"
          />
        </svg>
      )}

      {isSuccess && (
        <svg
          aria-hidden="true"
          className="w-5 h-5 -ml-3 mr-3 dark:text-zinc-100 fill-white stroke-white"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            strokeWidth="3.2"
            d="M85.66 22.303a4.125 4.125 0 0 1 .342 5.82l-43.997 49.5a4.125 4.125 0 0 1-6.167 0L13.84 52.873a4.125 4.125 0 0 1 6.162-5.478L38.92 68.676l40.92-46.035a4.124 4.124 0 0 1 5.82-.338Z"
          />
        </svg>
      )}
    </div>

    {isSuccess
      ? "Сохранено"
      : isError
      ? "Не сохранено"
      : isLoading
      ? "Идет сохранение"
      : "Сохранить"}
  </button>
);

export default SettingsView;
