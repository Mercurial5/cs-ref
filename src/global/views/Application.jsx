import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    setStep(1);
  }, []);

  return (
    <div className="min-h-screen w-fill sm:py-16 bg-white sm:bg-zinc-900 flex flex-col sm:items-center sm:px-4 md:px-8">
      <div className="max-w-[680px] w-full m-auto flex flex-col max-sm:flex-grow-[1]">
        {/* <Tabs active={step} onClick={(value) => setStep(value)} /> */}

        <form className="bg-white px-4 sm:px-14 py-16 pb-20 sm:rounded-b-lg sm:rounded-t-lg max-sm:flex-grow-[1]">
          {step === 1 && <ApplicationsDataStep onNext={() => setStep(2)} />}
          {step === 2 && <PersonalDataStep onBack={() => setStep(1)} onFinish={() => null} />}
        </form>

        <div className="max-sm:bg-zinc-900 w-full px-4 py-3 sm:mt-8 flex justify-center items-center select-none">
          <LogoIcon className="fill-white stroke-white" />
          <span className="flex flex-col justify-center text-white ml-2 xs:ml-4 lg:ml-6 mt-[3px]">
            <span className="text-xs lg:text-sm font-bold -mb-1">CONCIERGE</span>
            <span className="text-base lg:text-xl font-semibold">SERVICE</span>
          </span>
        </div>
      </div>
    </div>
  );
};

function Tabs({ active, onClick }) {
  return (
    <div className="bg-white text-black text-center w-full overflow-hidden sm:rounded-t-lg select-none grid grid-cols-2 font-medium">
      <Tab active={active === 1} onClick={() => onClick(1)}>
        1. Укажите услуги
      </Tab>
      <Tab active={active === 2} onClick={() => onClick(2)}>
        2. Заполните данные
      </Tab>
    </div>
  );
}

function Tab({ active, onClick, children }) {
  return (
    <button
      className={`px-4 py-4 text-sm sm:text-lg border-b-2 border-zinc-200 focus:outline-none ${
        !active ? "bg-zinc-200 text-gray-500 border-l-2" : ""
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ApplicationsDataStep({ onNext }) {
  const [applications, setApplications] = useState({
    [Math.random()]: {},
  });

  return (
    <>
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-3">Заявка на услуги</h2>
        <p className="font-regular text-sm sm:text-base">
          Укажите почту, а ниже - какие услуги хотите заказать
        </p>
      </div>

      <div className="mb-2">
        <Field name="Почта" required>
          <Input type="text" required autoFocus />
        </Field>
      </div>

      {Object.keys(applications).map((key, index) => (
        <ApplicationDataDetails
          number={Object.keys(applications).length === 1 ? 0 : index + 1}
          identifier={key}
          key={key}
          onDelete={(key) =>
            setApplications((value) => {
              value = { ...value };
              delete value[key];
              return value;
            })
          }
        />
      ))}

      <div className="max-sm:grid max-sm:grid-cols-2 sm:flex">
        <button
          className="inline-flex rounded justify-center items-center text-center text-sm sm:text-lg mt-8 mr-3 px-3 sm:px-6 py-3 sm:py-[14px] border-2 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-300 text-black font-semibold transition ease-in-out duration-150"
          type="button"
          onClick={() =>
            setApplications((value) => ({
              ...value,
              [Math.random()]: {},
            }))
          }
        >
          Добавить услугу
        </button>

        <button
          className="sm:ml-auto inline-flex rounded justify-center items-center text-center text-sm sm:text-lg mt-8 px-3 sm:px-12 py-3 sm:py-4 bg-zinc-900 shadow-lg shadow-500/50 hover:shadow-gray-500/30 text-white font-semibold"
          onClick={onNext}
        >
          Далее
        </button>
      </div>
    </>
  );
}

function ApplicationDataDetails({ number, identifier, onDelete }) {
  return (
    <>
      <div
        className={`text-dark text-base sm:text-lg font-semibold pt-2 pb-4 mt-8 flex justify-between ${
          !number ? "hidden" : ""
        }`}
      >
        <span>Услуга {number}</span>
        <button
          type="button"
          onClick={() => onDelete(identifier)}
          className="bg-transparent text-xs sm:text-base text-rose-700 focus:outline-none"
        >
          Удалить
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-6">
        <Field name="Категория" required>
          <Select
            options={["Транспорт и помощь в дороге", "Бытовые услуги", "Организация мероприятий"]}
            required
          />
        </Field>
        <Field name="Подкатегория">
          <Select options={["Автомобиль", "Автобус", "Самолет"]} />
        </Field>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-6">
        <Field name="От">
          <Input type="date" placeholder="Не выбрано" />
        </Field>
        <Field name="До">
          <Input type="date" placeholder="Не выбрано" />
        </Field>
      </div>

      <div className="grid">
        <Field name="Описание" required>
          <Textarea required />
        </Field>
      </div>

      <div className={`mb-8 ${!number ? "hidden" : ""}`}></div>
    </>
  );
}

function PersonalDataStep({ onBack }) {
  const [userType, setUserType] = useState(1);

  const onFinish = (e) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-3">Контактная информация</h2>
        <p className="font-regular text-sm sm:text-base">Укажите ваши данные</p>
      </div>

      <Radio
        name="client-type"
        values={[
          { id: 1, name: "Физ. лицо" },
          { id: 2, name: "Юр. лицо" },
        ]}
        onChange={(e) => setUserType(e.target.value)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-6">
        <Field name="Имя" required>
          <Input type="text" />
        </Field>
        <Field name="Фамилия" required>
          <Input type="text" />
        </Field>
      </div>

      {userType == 2 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-6">
          <Field name="Название компании" required>
            <Input type="text" />
          </Field>
          <Field name="Ваша должность">
            <Input type="text" />
          </Field>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-6">
        <Field name="Номер телефона" required>
          <Input type="text" />
        </Field>
        <Field name="Город">
          <Input type="text" />
        </Field>
      </div>

      <div className="max-sm:grid max-sm:grid-cols-2 sm:flex sm:justify-between">
        <button
          className="inline-flex rounded justify-center items-center text-center text-sm sm:text-lg mt-8 mr-3 px-3 sm:px-12 py-3 sm:py-[14px] border-2 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-300 text-black font-semibold transition ease-in-out duration-150"
          onClick={onBack}
        >
          Назад
        </button>

        <button
          className="inline-flex rounded justify-center items-center text-center text-sm sm:text-lg mt-8 px-3 sm:px-12 py-3 sm:py-4 bg-zinc-900 shadow-lg shadow-500/50 hover:shadow-gray-500/30 text-white font-semibold"
          onClick={onFinish}
        >
          Отправить
        </button>
      </div>
    </>
  );
}

function LogoIcon({ className }) {
  return (
    <svg viewBox="0 0 52 50" fill="none" className={`w-10 h-10 sm:w-12 sm:h-12 ${className}`}>
      <path
        strokeWidth="0.5"
        d="M3 3.476C3 3.213 3.213 3 3.477 3h38.619a.476.476 0 1 1 0 .951H3.954V41.53a.476.476 0 0 1-.954 0V3.476ZM8.721 46.524c0-.262.214-.475.477-.475H47.34V8.47a.476.476 0 0 1 .954 0v38.054a.476.476 0 0 1-.477.476H9.198a.476.476 0 0 1-.477-.476ZM47.672 4.531a.475.475 0 0 0 .01-.672.478.478 0 0 0-.673-.012L3.622 45.707a.475.475 0 0 0-.011.672.478.478 0 0 0 .674.012L47.672 4.53Z"
      />
      <path
        strokeWidth="0.5"
        d="M15.855 9.892h-1.71a2.117 2.117 0 0 0-.27-.743 2 2 0 0 0-1.156-.899 2.61 2.61 0 0 0-.8-.118c-.51 0-.96.127-1.353.383-.393.252-.701.623-.924 1.113-.222.486-.333 1.08-.333 1.783 0 .714.11 1.316.333 1.806.226.486.534.854.924 1.104.393.246.842.369 1.348.369.28 0 .543-.037.787-.11.246-.075.467-.186.662-.332a2.03 2.03 0 0 0 .782-1.268l1.71.009c-.064.444-.203.86-.416 1.25-.21.389-.486.732-.828 1.03-.34.295-.74.526-1.197.694a4.477 4.477 0 0 1-1.523.246c-.822 0-1.557-.19-2.203-.57-.646-.38-1.155-.93-1.527-1.647-.372-.717-.557-1.578-.557-2.581 0-1.007.187-1.867.562-2.582.375-.717.885-1.266 1.531-1.646.646-.38 1.378-.57 2.194-.57.522 0 1.006.073 1.454.219.448.146.847.36 1.198.643.35.28.638.623.864 1.03.228.405.378.867.448 1.387ZM41.242 35.491c.317.222.497.532.54.93h1.632a2.43 2.43 0 0 0-.444-1.395 2.846 2.846 0 0 0-1.184-.953c-.5-.231-1.082-.347-1.746-.347-.655 0-1.242.116-1.76.347a2.96 2.96 0 0 0-1.23.962 2.404 2.404 0 0 0-.448 1.446c0 .669.223 1.206.668 1.61.448.401 1.057.7 1.828.898l1.065.274c.336.085.628.183.878.292.253.106.45.24.59.401.14.158.212.36.215.602a1.122 1.122 0 0 1-.243.703 1.572 1.572 0 0 1-.658.465c-.277.11-.6.164-.97.164a2.74 2.74 0 0 1-.96-.16 1.596 1.596 0 0 1-.69-.483 1.413 1.413 0 0 1-.301-.812h-1.669c.025.62.186 1.147.485 1.578.302.432.72.76 1.252.986.537.224 1.17.337 1.898.337.75 0 1.388-.116 1.915-.347.53-.234.935-.558 1.216-.971.28-.417.42-.899.42-1.446 0-.404-.076-.757-.228-1.058a2.35 2.35 0 0 0-.622-.77 3.594 3.594 0 0 0-.882-.53 6.044 6.044 0 0 0-1.02-.333l-.877-.219a5.557 5.557 0 0 1-.572-.168 2.615 2.615 0 0 1-.516-.247 1.21 1.21 0 0 1-.37-.365.943.943 0 0 1-.133-.506c.003-.234.072-.442.206-.625.134-.182.327-.326.58-.433a2.34 2.34 0 0 1 .91-.16c.503 0 .911.111 1.225.333Z"
      />
    </svg>
  );
}

function Field({ tag, name, required, className, children }) {
  const Wrapper = tag ?? "label";

  return (
    <Wrapper className={`flex flex-col text-gray-600 text-xs sm:text-base py-2 ${className}`}>
      <div>
        {name}
        {required && <span className="text-rose-700">&nbsp;*</span>}
      </div>
      {children}
    </Wrapper>
  );
}

function Input({ defaultValue, className, ...props }) {
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <input
      className={`text-sm sm:text-base text-black w-full border-2 mt-2 px-3 py-[10px] bg-white focus:bg-zinc-200 focus:outline-none transition ease-in-out duration-150 rounded appearance-none ${className} ${
        props.type === "date" ? "custom-ui-input-date-element-applications" : ""
      } ${value === "" ? "custo/m-ui-input-date-element-applications_empty" : ""}`}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
}

function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`text-sm sm:text-base text-black block h-40 border-2 mt-2 px-3 py-4 bg-white focus:bg-zinc-200 focus:outline-none transition ease-in-out duration-150 rounded ${className}`}
      {...props}
    />
  );
}

function Select({ className, options, ...props }) {
  return (
    <label className="mt-2 w-full custom-ui-select-element-applications">
      <div className="relative">
        <select
          className="text-sm sm:text-base text-black border-2 mt-2 px-4 py-[10px] bg-white focus:bg-zinc-200 focus:outline-none transition ease-in-out duration-150 rounded  w-full appearance-none"
          defaultValue="Не выбрано"
          {...props}
        >
          <option value="Не выбрано" disabled hidden>
            Не выбрано
          </option>

          {options.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>

        <div className="absolute top-2 bottom-2 right-1 flex justify-center items-center w-10 mt-2 bg-white transition ease-in-out duration-150 pointer-events-none">
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
}

function Radio({ name, values, ...props }) {
  return (
    <ul
      role="radiogroup"
      className="h-12 items-center text-sm sm:text-base text-gray-900 bg-white border-2 border-r-2 border-gray-200 rounded-lg flex my-4"
    >
      {values.map((value) => (
        <li className="w-full h-full border-gray-200 border-r-2 last:border-r-0" key={value.id}>
          <label className="h-full flex items-center px-3 select-none">
            <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
              <input
                type="radio"
                name={name}
                value={value.id}
                className="checkbox peer appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-zinc-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                {...props}
              />
              <div className="check-icon peer-checked:flex hidden border-4 border-zinc-700 rounded-full w-full h-full z-1"></div>
            </div>
            <span className="w-full py-3 ml-4">{value.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}