import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../../global/api/user/store";

const HeaderView = () => {
  return (
    <MenuLogic>
      {({ isOpened, handleToggle }) => (
        <div
          className={`h-16 lg:h-20 flex lg:justify-between bg-white shadow-lg shadow-slate-200 ${
            isOpened ? "relative z-50" : " "
          }`}
        >
          <>
            <button
              id="app-menu-toggler"
              data-dropdown-toggle="app-nav-menu"
              className="px-3 sm:ml-6 lg:hidden outline-none"
              type="button"
              onClick={handleToggle}
            >
              <OpenIconView className={`${isOpened ? "hidden" : ""}`} />
              <CloseIconView className={`${isOpened ? "" : "hidden"}`} />
            </button>

            <div className="px-3 sm:px-4 lg:px-10 flex items-center select-none">
              <svg viewBox="0 0 52 50" fill="none" className="w-10 h-10 lg:w-12 lg:h-12">
                <path
                  fill="#047857"
                  stroke="#047857"
                  strokeWidth="0.5"
                  d="M3 3.476C3 3.213 3.213 3 3.477 3h38.619a.476.476 0 1 1 0 .951H3.954V41.53a.476.476 0 0 1-.954 0V3.476ZM8.721 46.524c0-.262.214-.475.477-.475H47.34V8.47a.476.476 0 0 1 .954 0v38.054a.476.476 0 0 1-.477.476H9.198a.476.476 0 0 1-.477-.476ZM47.672 4.531a.475.475 0 0 0 .01-.672.478.478 0 0 0-.673-.012L3.622 45.707a.475.475 0 0 0-.011.672.478.478 0 0 0 .674.012L47.672 4.53Z"
                />
                <path
                  fill="#047857"
                  stroke="#047857"
                  strokeWidth="0.5"
                  d="M15.855 9.892h-1.71a2.117 2.117 0 0 0-.27-.743 2 2 0 0 0-1.156-.899 2.61 2.61 0 0 0-.8-.118c-.51 0-.96.127-1.353.383-.393.252-.701.623-.924 1.113-.222.486-.333 1.08-.333 1.783 0 .714.11 1.316.333 1.806.226.486.534.854.924 1.104.393.246.842.369 1.348.369.28 0 .543-.037.787-.11.246-.075.467-.186.662-.332a2.03 2.03 0 0 0 .782-1.268l1.71.009c-.064.444-.203.86-.416 1.25-.21.389-.486.732-.828 1.03-.34.295-.74.526-1.197.694a4.477 4.477 0 0 1-1.523.246c-.822 0-1.557-.19-2.203-.57-.646-.38-1.155-.93-1.527-1.647-.372-.717-.557-1.578-.557-2.581 0-1.007.187-1.867.562-2.582.375-.717.885-1.266 1.531-1.646.646-.38 1.378-.57 2.194-.57.522 0 1.006.073 1.454.219.448.146.847.36 1.198.643.35.28.638.623.864 1.03.228.405.378.867.448 1.387ZM41.242 35.491c.317.222.497.532.54.93h1.632a2.43 2.43 0 0 0-.444-1.395 2.846 2.846 0 0 0-1.184-.953c-.5-.231-1.082-.347-1.746-.347-.655 0-1.242.116-1.76.347a2.96 2.96 0 0 0-1.23.962 2.404 2.404 0 0 0-.448 1.446c0 .669.223 1.206.668 1.61.448.401 1.057.7 1.828.898l1.065.274c.336.085.628.183.878.292.253.106.45.24.59.401.14.158.212.36.215.602a1.122 1.122 0 0 1-.243.703 1.572 1.572 0 0 1-.658.465c-.277.11-.6.164-.97.164a2.74 2.74 0 0 1-.96-.16 1.596 1.596 0 0 1-.69-.483 1.413 1.413 0 0 1-.301-.812h-1.669c.025.62.186 1.147.485 1.578.302.432.72.76 1.252.986.537.224 1.17.337 1.898.337.75 0 1.388-.116 1.915-.347.53-.234.935-.558 1.216-.971.28-.417.42-.899.42-1.446 0-.404-.076-.757-.228-1.058a2.35 2.35 0 0 0-.622-.77 3.594 3.594 0 0 0-.882-.53 6.044 6.044 0 0 0-1.02-.333l-.877-.219a5.557 5.557 0 0 1-.572-.168 2.615 2.615 0 0 1-.516-.247 1.21 1.21 0 0 1-.37-.365.943.943 0 0 1-.133-.506c.003-.234.072-.442.206-.625.134-.182.327-.326.58-.433a2.34 2.34 0 0 1 .91-.16c.503 0 .911.111 1.225.333Z"
                />
              </svg>

              <span className="ml-2 xs:ml-4 lg:ml-6 hidden sm:flex flex-col text-black">
                <span className="text-xs lg:text-sm font-bold -mb-1">CONCIERGE</span>
                <span className="text-lg lg:text-xl font-semibold text-emerald-900">SERVICE</span>
              </span>
            </div>

            <div
              id="app-nav-menu"
              className={`${
                isOpened ? "" : "max-lg:hidden"
              } max-lg:min-h-screen max-lg:w-full max-lg:py-8 max-lg:border-t-2 flex absolute top-16 left-0 right-0 z-50 lg:static bg-white`}
            >
              <TabsProvider>
                {({ tabs }) => (
                  <ul
                    aria-labelledby="app-menu-toggler"
                    className="max-lg:w-full flex flex-col lg:flex-row list-none"
                  >
                    {tabs.map((props) => (
                      <li key={props.to}>
                        <NavLink
                          className="h-full px-3 sm:px-9 max-lg:py-6 flex items-center relative select-none lg:hover:bg-slate-100 transition duration-150 ease-in-out"
                          to={props.to || "#"}
                          onClick={handleToggle}
                        >
                          {({ isActive }) => (
                            <>
                              <IconProvider name={props.icon}>
                                {({ Icon }) => (
                                  <Icon
                                    className={`${isActive ? "fill-emerald-700" : "fill-black"}`}
                                  />
                                )}
                              </IconProvider>

                              <span
                                className={`ml-5 text-sm lg:text-base font-semibold ${
                                  isActive ? "text-emerald-700" : "text-black"
                                }`}
                              >
                                {props.children}
                              </span>

                              <span
                                className={`${
                                  isActive ? "block" : "hidden"
                                } h-0.5 rounded bg-emerald-700 absolute bottom-0 left-3 right-3 sm:left-9 sm:right-9`}
                              />
                            </>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsProvider>
            </div>
          </>

          <UserProvider>
            {(data) => (
              <div className="pl-3 sm:pl-8 pr-3 sm:pr-10 lg:pr-6 max-lg:ml-auto lg:mr-4 flex lg:hidden xl:flex items-center">
                <div className="mr-2 sm:mr-7 flex flex-col text-right">
                  <span className="font-semibold lg:text-lg text-sm truncate whitespace-nowrap w-44">
                    {data.fullname}
                  </span>

                  <span className="text-xs font-normal">{data.email}</span>
                </div>

                <img
                  className="w-10 h-10 lg:w-14 lg:h-14 rounded-full"
                  src="/users/1.png"
                  alt="#"
                />
              </div>
            )}
          </UserProvider>
        </div>
      )}
    </MenuLogic>
  );
};

const MenuLogic = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleToggle = () => {
    setIsOpened((state) => !state);
  };

  return (
    <>
      {typeof children === "function"
        ? children({
            isOpened,
            handleToggle,
          })
        : children}
    </>
  );
};

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

const TabsProvider = ({ children }) => {
  const tabs = [
    {
      to: "/panel/settings",
      icon: "settings",
      children: "Личный кабинет",
    },
    {
      to: "/panel/chats",
      icon: "chats",
      children: "Заявки",
    },
  ];

  return <>{typeof children === "function" ? children({ tabs }) : children}</>;
};

const IconProvider = ({ name, children }) => {
  const Icon =
    name == "settings" ? (
      SettingsIconView
    ) : name == "chats" ? (
      ChatsIconView
    ) : name == "help" ? (
      HelpIconView
    ) : name == "reference" ? (
      ReferenceIconView
    ) : (
      <span />
    );

  return <>{typeof children === "function" ? children({ Icon }) : children}</>;
};

const OpenIconView = (props) => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.2"
      d="M8 12h32M8 24h32M8 36h32"
    />
  </svg>
);

const CloseIconView = (props) => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.2"
      d="m11 11 25.456 25.456M11 36l25.456-25.456"
    />
  </svg>
);

const SettingsIconView = (props) => (
  <svg width="30" height="30" fill="none" {...props}>
    <path d="M20 7.5a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM25 21.875c0 3.107 0 5.625-10 5.625S5 24.982 5 21.875s4.477-5.625 10-5.625 10 2.518 10 5.625Z" />
  </svg>
);

const ChatsIconView = (props) => (
  <svg width="30" height="30" fill="none" {...props}>
    <path
      fillRule="evenodd"
      d="m13.186 26.91.313-.528c.5-.847.75-1.27 1.15-1.506.399-.236.92-.253 1.96-.286.976-.031 1.632-.116 2.193-.349a4.82 4.82 0 0 0 2.608-2.608c.367-.885.367-2.008.367-4.254v-.963c0-3.156 0-4.733-.71-5.892a4.818 4.818 0 0 0-1.591-1.591c-1.159-.71-2.736-.71-5.892-.71h-2.891c-3.155 0-4.733 0-5.892.71a4.82 4.82 0 0 0-1.59 1.59C2.5 11.684 2.5 13.26 2.5 16.417v.963c0 2.246 0 3.369.367 4.254a4.82 4.82 0 0 0 2.608 2.608c.56.233 1.217.318 2.193.35 1.04.032 1.561.05 1.96.285.4.236.65.66 1.15 1.506l.313.528c.466.787 1.63.787 2.095 0Zm3.17-9.049a1.205 1.205 0 1 0 0-2.41 1.205 1.205 0 0 0 0 2.41Zm-3.013-1.205a1.205 1.205 0 1 1-2.41 0 1.205 1.205 0 0 1 2.41 0Zm-5.421 1.205a1.205 1.205 0 1 0 0-2.41 1.205 1.205 0 0 0 0 2.41Z"
      clipRule="evenodd"
    />
    <path d="M18.962 2.5c1.44 0 2.585 0 3.503.087.941.09 1.737.277 2.446.712a5.422 5.422 0 0 1 1.79 1.79c.435.709.622 1.505.712 2.446.087.918.087 2.063.087 3.503v.983c0 1.025 0 1.84-.045 2.5-.046.677-.142 1.257-.368 1.8a5.421 5.421 0 0 1-3.034 2.975c-.16.061-.298.114-.418.153.017-.586.017-1.254.017-2.007v-1.115c0-1.502 0-2.76-.097-3.783-.102-1.071-.323-2.076-.89-3a6.694 6.694 0 0 0-2.21-2.21c-.923-.566-1.928-.787-2.999-.89-1.023-.096-2.28-.096-3.783-.096h-3.069c-1.02 0-1.928 0-2.726.03.038-.129.089-.276.148-.45a4.24 4.24 0 0 1 .393-.84 5.422 5.422 0 0 1 1.79-1.79c.71-.434 1.505-.621 2.447-.71.918-.088 2.063-.088 3.502-.088h2.804Z" />
  </svg>
);

const HelpIconView = (props) => (
  <svg width="30" height="30" fill="none" {...props}>
    <path d="M8.75 6.037c0 1.934 2.157 3.972 3.937 5.325 1 .759 1.498 1.138 2.313 1.138.815 0 1.314-.38 2.313-1.138 1.78-1.353 3.937-3.39 3.937-5.325 0-3.488-3.438-4.79-6.25-2.096-2.812-2.694-6.25-1.392-6.25 2.096ZM7.825 26.735H7.5c-1.179 0-1.768 0-2.134-.366C5 26.003 5 25.414 5 24.235v-1.39c0-.648 0-.972.166-1.261.167-.29.418-.436.92-.728 3.307-1.923 8.003-3.006 11.138-1.136.21.126.4.277.562.459.697.784.646 1.966-.158 2.668-.17.148-.35.26-.533.3.15-.018.294-.038.43-.06 1.14-.181 2.096-.79 2.972-1.451l2.259-1.707c.796-.601 1.978-.602 2.775 0 .717.541.936 1.433.483 2.16-.529.847-1.274 1.931-1.99 2.593-.715.664-1.782 1.256-2.652 1.676-.964.466-2.03.734-3.113.91a18.565 18.565 0 0 1-6.664-.148 18.786 18.786 0 0 0-3.77-.385Z" />
  </svg>
);

const ReferenceIconView = (props) => (
  <svg width="30" height="30" fill="none" {...props}>
    <path
      fillRule="evenodd"
      d="M27.5 15c0 6.904-5.596 12.5-12.5 12.5S2.5 21.904 2.5 15 8.096 2.5 15 2.5 27.5 8.096 27.5 15ZM15 9.687c-.777 0-1.406.63-1.406 1.407a.938.938 0 0 1-1.875 0 3.281 3.281 0 1 1 5.635 2.286c-.116.119-.226.229-.33.333-.27.27-.507.506-.714.773-.274.351-.372.61-.372.826v.938a.937.937 0 1 1-1.876 0v-.938c0-.819.382-1.481.768-1.978.286-.367.646-.726.937-1.017l.242-.244A1.406 1.406 0 0 0 15 9.688Zm0 11.563a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export { HeaderView as Header };
