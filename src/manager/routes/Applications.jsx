import { useState, useEffect } from "react";
import { useFreeQuery, useAcceptQuery } from "../../global/api/applications/queries";

const ApplicationsView = () => (
  <div className="w-full px-4 py-8 md:p-12 sm:rounded-lg relative overflow-x-auto">
    <ApplicationsLogic>
      {({ data, handleAccept, current, states }) => (
        <table className="w-full text-left">
          <thead className="text-gray-700 uppercase bg-slate-100">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-l-md">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Дата создания
              </th>
              <th scope="col" className="px-6 py-3">
                Клиент / Компания
              </th>
              <th scope="col" className="px-6 py-3">
                Категория услуги
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-md">
                Действие
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className={`${index % 2 ? "bg-white" : ""}`} key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 rounded-l-md font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.id}
                </th>

                <td className="px-6 py-4">{item.date}</td>

                <td className="px-6 py-4">{item.fullname}</td>

                <td className="px-6 py-4">{item.category}</td>

                <td className="px-6 py-4 rounded-l-md text-right">
                  <ButtonView
                    onClick={() => handleAccept(item.id)}
                    states={states}
                    current={item.id === current}
                  >
                    {item.id !== current
                      ? "Принять"
                      : states.isLoading
                      ? "Принятие"
                      : states.isError
                      ? "Не принято"
                      : "Принять"}
                  </ButtonView>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </ApplicationsLogic>
  </div>
);

const APPLICATION_STATES = {
  DEFAULT: 1,
  LOADING: 2,
  SUCCESS: 3,
  ERROR: 4,
};

const ApplicationsLogic = ({ children }) => {
  const [state, setState] = useState(APPLICATION_STATES.DEFAULT);
  const [current, setCurrent] = useState(-1);
  const [applications, setApplications] = useState([]);
  const freeQuery = useFreeQuery();

  useEffect(() => {
    if (freeQuery.data && freeQuery.isSuccess) {
      const data = freeQuery.data.results.map((item) => ({
        id: item.id,
        fullname: `${item.owner.name} ${item.owner.surname}`,
        category: item.services[0].category,
        date: new Date(item.created).toLocaleString("ru-RU"),
      }));

      setApplications(data);
    }
  }, [freeQuery.data, freeQuery.isSuccess]);

  const acceptQuery = useAcceptQuery();

  const handleAccept = (id) => {
    setState(APPLICATION_STATES.LOADING);
    setCurrent(id);

    acceptQuery.mutate(id, {
      onSuccess() {
        setState(APPLICATION_STATES.SUCCESS);
        setApplications((apps) => apps.filter((i) => i.id !== id));
      },
      onError() {
        setState(APPLICATION_STATES.ERROR);
      },
      onSettled() {
        setTimeout(() => {
          setState(APPLICATION_STATES.DEFAULT);
          setCurrent(-1);
        }, 3000);
      },
    });
  };

  return (
    <>
      {typeof children === "function"
        ? children({
            data: applications,
            handleAccept,
            current,
            states: {
              isDefault: state === APPLICATION_STATES.DEFAULT,
              isLoading: state === APPLICATION_STATES.LOADING,
              isSuccess: state === APPLICATION_STATES.SUCCESS,
              isError: state === APPLICATION_STATES.ERROR,
            },
          })
        : children}
    </>
  );
};

const ButtonView = ({ states, current, ...props }) => (
  <button
    className={`px-5 py-2 rounded-full flex justify-center items-center text-center text-sm sm:text-base font-semibold select-none bg-emerald-700 text-white ${
      current
        ? states.isLoading
          ? "bg-gray-200 text-black"
          : states.isError
          ? "bg-zinc-900 text-white"
          : ""
        : states.isLoading
        ? "opacity-75"
        : ""
    }`}
    type="submit"
    {...props}
  >
    {props.children}
  </button>
);

export default ApplicationsView;
