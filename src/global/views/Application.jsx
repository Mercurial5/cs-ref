import { useState, useEffect } from "react";
import { useCategoriesQuery, useCreateQuery } from "../api/applications/queries";
import {
  useForm,
  Form,
  Field,
  FieldLabel,
  FieldError,
  Input,
  Textarea,
  Select,
} from "../components/Form";
import * as yup from "yup";

const ApplicationView = () => (
  <CategoriesProvider>
    {({ categories, subcategories, handleChange }) => (
      <ApplicationFormLogic
        className="px-4 sm:px-14 py-16 pb-20 sm:rounded-b-lg sm:rounded-t-lg bg-white max-sm:flex-grow-[1]"
        elements={{
          Field: FieldView,
          FieldLabel: FieldLabelView,
          FieldError: FieldErrorView,
          Input: InputView,
          Textarea: TextareaView,
          Select: SelectView,
        }}
      >
        <div className="mb-8">
          <h2 className="mb-3 text-4xl font-bold">Заявка на услуги</h2>
        </div>

        <div
          className={`pt-2 pb-4 mt-8 flex justify-between text-black text-base sm:text-lg font-semibold ${
            1 ? "hidden" : ""
          }`}
        >
          <span>Услуга {1}</span>
          <button
            className="text-xs sm:text-base text-rose-700 focus:outline-none bg-transparent"
            type="button"
          >
            Удалить
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-2">
          <div className={`${subcategories.length ? "" : "col-span-2"}`}>
            <FieldView>
              <FieldLabelView required>Категория</FieldLabelView>
              <SelectView name="category" options={categories} required onChange={handleChange} />
              <FieldErrorView />
            </FieldView>
          </div>

          {!!subcategories.length && (
            <FieldView>
              <FieldLabelView>Подкатегория</FieldLabelView>
              <SelectView name="subcategory" options={subcategories} />
              <FieldErrorView />
            </FieldView>
          )}

          <FieldView>
            <FieldLabelView>От</FieldLabelView>
            <InputView name="dateFrom" type="date" placeholder="Не выбрано" />
            <FieldErrorView />
          </FieldView>

          <FieldView>
            <FieldLabelView>До</FieldLabelView>
            <InputView name="dateTo" type="date" placeholder="Не выбрано" />
            <FieldErrorView />
          </FieldView>

          <div className="col-span-2">
            <FieldView>
              <FieldLabelView required>Описание</FieldLabelView>
              <TextareaView name="description" />
              <FieldErrorView />
            </FieldView>
          </div>
        </div>

        <div className="max-sm:grid max-sm:grid-cols-2 sm:flex">
          <button
            className="invisible mt-8 mr-3 px-3 sm:px-6 py-3 sm:py-[14px] border-2 rounded-md border-zinc-200 hover:border-zinc-300 inline-flex justify-center items-center text-center text-sm sm:text-lg text-black font-semibold transition ease-in-out duration-150 hover:bg-zinc-300"
            type="button"
          >
            Добавить услугу
          </button>

          <button
            className="px-3 sm:px-12 py-3 sm:py-4 mt-8 sm:ml-auto rounded-md inline-flex justify-center items-center text-center text-sm sm:text-lg text-white font-semibold bg-zinc-900 shadow-lg shadow-500/50 hover:shadow-gray-500/30"
            type="submit"
          >
            Далее
          </button>
        </div>
      </ApplicationFormLogic>
    )}
  </CategoriesProvider>
);

const CategoriesProvider = ({ children }) => {
  const query = useCategoriesQuery();
  const [current, setCurrent] = useState(undefined);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (query.data && query.isSuccess) {
      const _data = query.data.map((category) => ({
        value: category.id,
        text: category.name,
        parent_id: category.parent_id,
      }));
      setData(_data);
    }
  }, [query.data, query.isSuccess]);

  useEffect(() => {
    const _data = data.filter((category) => !category.parent_id);
    setCategories(_data);
  }, [data]);

  useEffect(() => {
    if (current !== undefined) {
      const _data = data.filter((category) => category.parent_id == current);
      setSubcategories(_data);
    }
  }, [current]);

  const handleChange = (e) => {
    setCurrent(e.target.value);
  };

  return (
    <>
      {typeof children === "function"
        ? children({
            categories,
            subcategories,
            handleChange,
          })
        : children}
    </>
  );
};

const ApplicationFormLogic = ({ children, ...props }) => {
  const query = useCreateQuery();

  const values = {
    category: undefined,
    subcategory: undefined,
    dateFrom: undefined,
    dateEnd: undefined,
    description: "",
  };

  const handleCreate = (data) => {
    query.mutate(
      {
        services: [
          {
            category: parseInt(data.subcategory || data.category),
            description: data.description,
            data_from: data.dateFrom,
            data_to: data.dateTo,
          },
        ],
      },
      { onSuccess: outsideHandleCreate }
    );
  };

  const form = useForm({
    values,

    schema: yup.object().shape({
      category: yup.number().required("Это поле обязательное!"),
      description: yup.string().required("Это поле обязательное!"),
    }),

    onSubmit: handleCreate,
  });

  return (
    <Form params={form} {...props}>
      {typeof children === "function" ? children({}) : children}
    </Form>
  );
};

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
    className="w-full px-3 py-[10px] border-2 border-zinc-200 mt-2 rounded text-sm sm:text-base text-black bg-white focus:bg-zinc-200 focus:outline-none transition ease-in-out duration-150 appearance-none"
    {...props}
  />
);

const TextareaView = (props) => (
  <Textarea
    className="w-full h-40 px-3 py-4 mt-2 border-2 rounded text-sm sm:text-base text-black block bg-white focus:bg-zinc-200 focus:outline-none transition ease-in-out duration-150 resize-none"
    {...props}
  >
    {props.children}
  </Textarea>
);

const SelectView = (props) => (
  <label className="w-full mt-2 text-zinc-200">
    <div className="relative">
      <Select
        className="w-full pl-4 pr-10 py-[10px] border-2 border-zinc-200 rounded text-sm sm:text-base text-black bg-white focus:bg-zinc-200 focus:outline-none transition ease-in-out duration-150 appearance-none"
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

export default ApplicationView;
