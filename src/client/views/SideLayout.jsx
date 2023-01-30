import { useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";

const SideLayoutView = () => {
  return (
    <div className="h-[calc(100vh_-_200px)] sm:w-full border-t max-sm:-mx-6 max-sm:-my-10 xl:mx-auto mb-2 flex-grow flex">
      <WindowLogic>
        {({ active, windows, handleClick }) => (
          <div className="max-xl:hidden w-[360px] py-4 mr-6 rounded-2xl shadow-md shadow-slate-200 bg-white overflow-y-auto">
            {windows.map((window) => (
              <Link
                className="px-8 py-4 flex items-center hover:bg-slate-50 transition duration-150 ease-in-out select-none relative"
                to={window.to || "#"}
                key={window.id}
                onClick={() => handleClick(window.id)}
              >
                <span
                  className={`text-base font-semibold ${
                    active === window.id ? "text-emerald-700" : "text-slate-600"
                  }`}
                >
                  {window.children}
                </span>

                {!!window.new && (
                  <span className="w-5 h-5 ml-4 rounded-full flex-shrink-0 bg-emerald-700 text-xs text-white font-medium flex justify-center items-center">
                    1
                  </span>
                )}

                {active === window.id && (
                  <span className="w-0.5 rounded block bg-emerald-700 absolute top-2 bottom-2 right-0" />
                )}
              </Link>
            ))}
          </div>
        )}
      </WindowLogic>

      <div className="w-full sm:rounded-2xl flex shadow-md shadow-slate-200 bg-white overflow-hidden sm:relative">
        <Outlet />
      </div>
    </div>
  );
};

const WindowLogic = ({ children }) => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname === "/panel/chats" ? 1 : 4);

  const windows = [
    {
      id: 1,
      children: "Активные",
      to: "chats",
    },
    {
      id: 2,
      children: "Нереализованные",
      to: "chats",
    },
    {
      id: 3,
      children: "Архив",
      to: "chats",
    },
  ];

  const handleClick = (id) => {
    if (!windows.find((window) => window.id === id)) return;
    setActive(id);
  };

  return (
    <>{typeof children === "function" ? children({ active, windows, handleClick }) : children}</>
  );
};

export { SideLayoutView as SideLayout };
