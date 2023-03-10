import { useState } from "react";
import ApplicationView from "../views/Application";

const ChatsView = () => (
  <ChatLogic>
    {({ isOpened: isChatOpened, handleShow: handleShowChat, handleHide: handleHideChat }) => (
      <ApplicationModalLogic>
        {({
          isOpened: isModalOpened,
          handleShow: handleShowModal,
          handleHide: handleHideModal,
        }) => (
          <div className="h-[calc(100vh_-_200px)] sm:w-full border-t max-sm:-mx-6 max-sm:-my-10 xl:mx-auto mb-2 flex-grow flex">
            <div className="max-xl:hidden w-[360px] py-4 mr-6 rounded-2xl shadow-md shadow-slate-200 bg-white overflow-y-auto">
              <div className="px-8 py-4 hover:bg-slate-50 transition duration-150 ease-in-out select-none relative">
                <span className="text-base text-emerald-700 font-semibold">Активные</span>
                <span className="w-0.5 rounded block bg-emerald-700 absolute top-2 bottom-2 right-0" />
              </div>
              <div className="px-8 py-4 hover:bg-slate-50 transition duration-150 ease-in-out select-none">
                <span className="text-base text-slate-600 font-semibold">Нереализованные</span>
              </div>
              <div className="px-8 py-4 hover:bg-slate-50 transition duration-150 ease-in-out select-none">
                <span className="text-base text-slate-600 font-semibold">Архив</span>
              </div>
            </div>

            <div className="w-full sm:rounded-2xl flex shadow-md shadow-slate-200 bg-white overflow-hidden sm:relative">
              <div className="lg:w-[400px] w-full sm:px-4 sm:py-4 flex-shrink-0 flex-grow-0 flex flex-col relative">
                <div className="overflow-y-auto scrollbar">
                  <div
                    className="w-full px-3 py-3 sm:py-4 sm:my-2 max-sm:border-b rounded-lg flex items-center hover:bg-slate-100 transition duration-150 ease-in-out"
                    onClick={handleShowChat}
                  >
                    <div className="w-14 h-14 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-700 select-none">
                      #1
                    </div>

                    <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                      <div className="flex items-center justify-between">
                        <span className="mr-3 font-semibold text-lg truncate whitespace-nowrap">
                          Заявка #1
                        </span>

                        <span className="mb-1 text-xs sm:text-sm">19:32</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="mb-1 text-xs sm:text-sm font-normal truncate whitespace-nowrap">
                          Закрывающий документ готов. Я прикрепил его к вам в чат
                        </span>

                        <span className="w-5 h-5 ml-4 rounded-full flex-shrink-0 bg-emerald-700 text-xs text-white font-medium flex justify-center items-center">
                          1
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full px-3 py-3 sm:py-4 sm:my-2 max-sm:border-b rounded-lg flex items-center hover:bg-slate-100 transition duration-150 ease-in-out"
                    onClick={handleShowChat}
                  >
                    <div className="w-14 h-14 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-700 select-none">
                      #2
                    </div>

                    <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                      <div className="flex items-center justify-between">
                        <span className="mr-3 font-semibold text-lg truncate whitespace-nowrap">
                          Заявка #2
                        </span>
                        <span className="mb-1 text-xs sm:text-sm">19:32</span>
                      </div>

                      <div className="mb-1 text-xs sm:text-sm font-normal truncate whitespace-nowrap">
                        Закрывающий документ готов. Я прикрепил его к вам в чат
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full px-3 py-3 sm:py-4 sm:my-2 max-sm:border-b rounded-lg flex items-center hover:bg-slate-100 transition duration-150 ease-in-out"
                    onClick={handleShowChat}
                  >
                    <div className="w-14 h-14 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-700 select-none">
                      #3
                    </div>

                    <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                      <div className="flex items-center justify-between">
                        <span className="mr-3 font-semibold text-lg truncate whitespace-nowrap">
                          Бронь машины шефу
                        </span>
                        <span className="mb-1 text-xs sm:text-sm">19:32</span>
                      </div>

                      <div className="mb-1 text-xs sm:text-sm font-normal truncate whitespace-nowrap">
                        Закрывающий документ готов. Я прикрепил его к вам в чат
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full px-3 py-3 sm:py-4 sm:my-2 max-sm:border-b rounded-lg flex items-center hover:bg-slate-100 transition duration-150 ease-in-out"
                    onClick={handleShowChat}
                  >
                    <div className="w-14 h-14 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-700 select-none">
                      #3
                    </div>

                    <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                      <div className="flex items-center justify-between">
                        <span className="mr-3 font-semibold text-lg truncate whitespace-nowrap">
                          Заявка #3
                        </span>
                        <span className="mb-1 text-xs sm:text-sm">19:32</span>
                      </div>

                      <div className="mb-1 text-xs sm:text-sm font-normal truncate whitespace-nowrap">
                        Закрывающий документ готов. Я прикрепил его к вам в чат
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full px-3 py-3 sm:py-4 sm:my-2 max-sm:border-b rounded-lg flex items-center hover:bg-slate-100 transition duration-150 ease-in-out"
                    onClick={handleShowChat}
                  >
                    <div className="w-14 h-14 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-700 select-none">
                      #3
                    </div>

                    <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                      <div className="flex items-center justify-between">
                        <span className="mr-3 font-semibold text-lg truncate whitespace-nowrap">
                          Заявка #3
                        </span>
                        <span className="mb-1 text-xs sm:text-sm">19:32</span>
                      </div>

                      <div className="mb-1 text-xs sm:text-sm font-normal truncate whitespace-nowrap">
                        Закрывающий документ готов. Я прикрепил его к вам в чат
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full px-3 py-3 sm:py-4 sm:my-2 max-sm:border-b rounded-lg flex items-center hover:bg-slate-100 transition duration-150 ease-in-out"
                    onClick={handleShowChat}
                  >
                    <div className="w-14 h-14 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-700 select-none">
                      #3
                    </div>

                    <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                      <div className="flex items-center justify-between">
                        <span className="mr-3 font-semibold text-lg truncate whitespace-nowrap">
                          Заявка #3
                        </span>
                        <span className="mb-1 text-xs sm:text-sm">19:32</span>
                      </div>

                      <div className="mb-1 text-xs sm:text-sm font-normal truncate whitespace-nowrap">
                        Закрывающий документ готов. Я прикрепил его к вам в чат
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full px-3 py-3 sm:py-4 sm:my-2 max-sm:border-b rounded-lg flex items-center hover:bg-slate-100 transition duration-150 ease-in-out"
                    onClick={handleShowChat}
                  >
                    <div className="w-14 h-14 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-700 select-none">
                      #3
                    </div>

                    <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                      <div className="flex items-center justify-between">
                        <span className="mr-3 font-semibold text-lg truncate whitespace-nowrap">
                          Заявка #3
                        </span>
                        <span className="mb-1 text-xs sm:text-sm">19:32</span>
                      </div>

                      <div className="mb-1 text-xs sm:text-sm font-normal truncate whitespace-nowrap">
                        Закрывающий документ готов. Я прикрепил его к вам в чат
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full px-3 py-3 sm:py-4 sm:my-2 max-sm:border-b rounded-lg flex items-center hover:bg-slate-100 transition duration-150 ease-in-out"
                    onClick={handleShowChat}
                  >
                    <div className="w-14 h-14 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-700 select-none">
                      #3
                    </div>

                    <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                      <div className="flex items-center justify-between">
                        <span className="mr-3 font-semibold text-lg truncate whitespace-nowrap">
                          Заявка #3
                        </span>
                        <span className="mb-1 text-xs sm:text-sm">19:32</span>
                      </div>

                      <div className="mb-1 text-xs sm:text-sm font-normal truncate whitespace-nowrap">
                        Закрывающий документ готов. Я прикрепил его к вам в чат
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full px-3 py-3 sm:py-4 sm:my-2 max-sm:border-b rounded-lg flex items-center hover:bg-slate-100 transition duration-150 ease-in-out"
                    onClick={handleShowChat}
                  >
                    <div className="w-14 h-14 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-700 select-none">
                      #3
                    </div>

                    <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                      <div className="flex items-center justify-between">
                        <span className="mr-3 font-semibold text-lg truncate whitespace-nowrap">
                          Заявка #3
                        </span>
                        <span className="mb-1 text-xs sm:text-sm">19:32</span>
                      </div>

                      <div className="mb-1 text-xs sm:text-sm font-normal truncate whitespace-nowrap">
                        Закрывающий документ готов. Я прикрепил его к вам в чат
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full px-3 py-3 sm:py-4 sm:my-2 max-sm:border-b rounded-lg flex items-center hover:bg-slate-100 transition duration-150 ease-in-out"
                    onClick={handleShowChat}
                  >
                    <div className="w-14 h-14 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-700 select-none">
                      #3
                    </div>

                    <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                      <div className="flex items-center justify-between">
                        <span className="mr-3 font-semibold text-lg truncate whitespace-nowrap">
                          Заявка #3
                        </span>
                        <span className="mb-1 text-xs sm:text-sm">19:32</span>
                      </div>

                      <div className="mb-1 text-xs sm:text-sm font-normal truncate whitespace-nowrap">
                        Закрывающий документ готов. Я прикрепил его к вам в чат
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-t from-white">
                  <button
                    className="w-full px-8 py-4 mt-4 mb-4 rounded-xl flex justify-center items-center text-center text-sm sm:text-base bg-zinc-900 text-white font-semibold select-none"
                    type="button"
                    onClick={handleShowModal}
                  >
                    Новая заявка
                  </button>
                </div>
              </div>

              <div
                className={`w-full max-sm:h-screen lg:m-4 lg:rounded-xl flex-shrink flex-grow flex flex-col bg-slate-300 lg:bg-slate-200 overflow-hidden max-lg:absolute left-0 top-0 bottom-0 ${
                  isChatOpened ? "" : "max-lg:hidden"
                }`}
              >
                <div className="lg:px-8 lg:py-4 border-b flex bg-white sm:bg-zinc-100 text-black">
                  <button
                    id="app-menu-toggler"
                    className="px-4 py-4 lg:hidden outline-none"
                    type="button"
                    onClick={handleHideChat}
                  >
                    <BackIconView />
                  </button>

                  <div className="w-full lg:pr-4 flex items-center">
                    {/* <img
                  className="w-12 h-12 rounded-full flex-shrink-0 flex-grow-0"
                  src="/users/1.png"
                  alt="#"
                /> */}

                    <div className="w-12 h-12 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-500 select-none">
                      A
                    </div>

                    <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                      <div className="mr-3 font-semibold text-base">Менеджер Нурали</div>

                      <div className="flex justify-between text-xs sm:text-sm text-emerald-700 font-medium">
                        Онлайн
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink flex-grow flex flex-col p-4 sm:p-8 overflow-auto scrollbar">
                  {/* other secondary */}
                  <div className="flex items-end mb-4 md:ml-16">
                    <div className="max-w-[360px] px-4 py-3 mr-8 rounded-lg text-zinc-100 bg-current relative">
                      <div className="text-sm sm:text-base text-black">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                      </div>
                    </div>
                  </div>

                  {/* other main message */}
                  <div className="flex items-end mb-4">
                    <div className="flex-none flex flex-col items-end space-y-1 mr-4 max-md:hidden">
                      {false ? (
                        <img
                          className="w-12 h-12 rounded-full flex-shrink-0 flex-grow-0"
                          src="/users/1.png"
                          alt="#"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-500 select-none">
                          A
                        </div>
                      )}
                    </div>

                    <div className="max-w-[360px] px-4 py-3 mr-8 rounded-lg rounded-bl-none text-zinc-100 bg-current relative">
                      <div className="text-sm sm:text-base text-black">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                      </div>
                      <div className="w-0 h-0 block border-8 border-transparent border-b-current border-solid absolute -left-2 bottom-0"></div>
                    </div>
                  </div>

                  {/* self secondary messasge */}
                  <div className="self-end flex items-end mb-4">
                    <div className="max-w-[360px] px-4 py-3 ml-8 rounded-lg text-zinc-100 bg-current relative">
                      <div className="text-sm sm:text-base text-black">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                      </div>
                    </div>
                  </div>

                  {/* self main message */}
                  <div className="self-end flex items-end mb-4">
                    <div className="max-w-[360px] px-4 py-3 ml-8 rounded-lg rounded-br-none text-zinc-100 bg-current relative">
                      <div className="text-sm sm:text-base text-black">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                      </div>
                      <div className="w-0 h-0 block border-8 border-transparent border-b-current border-solid absolute -right-2 bottom-0"></div>
                    </div>
                  </div>

                  {/* REPEAT */}

                  {/* other secondary */}
                  <div className="flex items-end mb-4 md:ml-16">
                    <div className="max-w-[360px] px-4 py-3 mr-8 rounded-lg text-zinc-100 bg-current relative">
                      <div className="text-sm sm:text-base text-black">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                      </div>
                    </div>
                  </div>

                  {/* other main message */}
                  <div className="flex items-end mb-4">
                    <div className="flex-none flex flex-col items-end space-y-1 mr-4 max-md:hidden">
                      {false ? (
                        <img
                          className="w-12 h-12 rounded-full flex-shrink-0 flex-grow-0"
                          src="/users/1.png"
                          alt="#"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-500 select-none">
                          A
                        </div>
                      )}
                    </div>

                    <div className="max-w-[360px] px-4 py-3 mr-8 rounded-lg rounded-bl-none text-zinc-100 bg-current relative">
                      <div className="text-sm sm:text-base text-black">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                      </div>
                      <div className="w-0 h-0 block border-8 border-transparent border-b-current border-solid absolute -left-2 bottom-0"></div>
                    </div>
                  </div>

                  {/* self secondary messasge */}
                  <div className="self-end flex items-end mb-4">
                    <div className="max-w-[360px] px-4 py-3 ml-8 rounded-lg text-zinc-100 bg-current relative">
                      <div className="text-sm sm:text-base text-black">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                      </div>
                    </div>
                  </div>

                  {/* self main message */}
                  <div className="self-end flex items-end mb-4">
                    <div className="max-w-[360px] px-4 py-3 ml-8 rounded-lg rounded-br-none text-zinc-100 bg-current relative">
                      <div className="text-sm sm:text-base text-black">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                      </div>
                      <div className="w-0 h-0 block border-8 border-transparent border-b-current border-solid absolute -right-2 bottom-0"></div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute bottom-0 left-0 right-0 w-full p-4 max-sm:pb-8 sm:p-8 mt-auto bg-gradient-to-t from-slate-300">
                    <div className="relative">
                      <label className="w-full py-4 rounded-xl block bg-white border-2 border-zinc-200">
                        <textarea
                          className="max-h-12 lg:max-h-28 h-auto min-h-full w-full pl-6 pr-16 lg:pr-20 block text-base sm:text-lg bg-transparent text-black font-normal focus:outline-none overflow-auto resize-none scrollbar"
                          rows="1"
                          onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                          }}
                        />
                      </label>

                      <button
                        className="absolute top-1/2 -translate-y-1/2 right-0 w-14 lg:w-16 h-14 lg:h-16 rounded-xl flex justify-center items-center text-center text-sm sm:text-base bg-emerald-700 text-white font-semibold select-none-700"
                        type="button"
                      >
                        <SendIconView className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`fixed top-0 bottom-0 left-0 right-0 z-50 min-h-screen w-fill sm:px-4 md:px-8 sm:py-16 flex flex-col sm:items-center bg-black bg-opacity-30 backdrop transition duration-150 ease-in-out ${
                isModalOpened
                  ? "visible pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!e.target.classList.contains("backdrop")) return;
                handleHideModal(e);
              }}
            >
              <div className="max-w-[680px] w-full m-auto flex flex-col max-sm:flex-grow-[1]">
                <ApplicationView
                  isInsideApp={true}
                  onCreate={handleHideModal}
                  onCancel={handleHideModal}
                />
              </div>
            </div>
          </div>
        )}
      </ApplicationModalLogic>
    )}
  </ChatLogic>
);

const ChatLogic = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleShow = () => {
    setIsOpened((value) => !value);
  };

  const handleHide = () => {
    setIsOpened((value) => !value);
  };

  return (
    <>
      {typeof children === "function"
        ? children({
            isOpened,
            handleShow,
            handleHide,
          })
        : children}
    </>
  );
};

const ApplicationModalLogic = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleShow = () => {
    setIsOpened((value) => !value);
  };

  const handleHide = () => {
    setIsOpened((value) => !value);
  };

  return (
    <>
      {typeof children === "function"
        ? children({
            isOpened,
            handleShow,
            handleHide,
          })
        : children}
    </>
  );
};

const BackIconView = (props) => (
  <svg width="32" height="32" fill="none" {...props}>
    <path
      fill="#000"
      d="M25.334 14.667H10.441l6.506-6.507c.52-.52.52-1.373 0-1.893s-1.36-.52-1.88 0l-8.786 8.787c-.52.52-.52 1.36 0 1.88l8.786 8.786c.52.52 1.36.52 1.88 0 .52-.52.52-1.36 0-1.88l-6.506-6.506h14.893c.733 0 1.333-.6 1.333-1.334 0-.733-.6-1.333-1.333-1.333Z"
    />
  </svg>
);

const SendIconView = (props) => (
  <svg viewBox="0 0 49 49" width="49" height="49" fill="none" {...props}>
    <path
      fill="#fff"
      d="m43.637 22.366-34-16A2 2 0 0 0 6.845 8.66l2.424 9.698 15.516 5.818-15.516 5.818-2.424 9.698a1.996 1.996 0 0 0 2.792 2.294l34-16a2 2 0 0 0 0-3.62Z"
    />
  </svg>
);

export default ChatsView;
