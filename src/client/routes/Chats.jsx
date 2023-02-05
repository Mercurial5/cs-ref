import { useState, useEffect, useRef } from "react";
import { useChatsQuery, useMessagesQuery } from "../../global/api/chats/queries";
import { useChatWebsocket } from "../../global/api/chats/websocket";
import { useStore } from "../../global/api/user/store";
import { scrollDown, autoHeight } from "../../global/helpers/utils";
import ApplicationView from "../views/Application";

const ChatsView = () => (
  <ChatLogic>
    {({
      isOpened: isChatOpened,
      handleShow: handleShowChat,
      handleHide: handleHideChat,
      chats,
      messages,
      handleSend,
      chat,
      message,
      lastMessages,
      handleInput,
      inputDiv,
      chatDiv,
    }) => (
      <ApplicationModalLogic>
        {({
          isOpened: isModalOpened,
          handleShow: handleShowModal,
          handleHide: handleHideModal,
        }) => (
          <>
            <div className="lg:w-[400px] w-full sm:px-4 sm:py-4 flex-shrink-0 flex-grow-0 flex flex-col relative">
              <div className="overflow-y-auto scrollbar">
                {chats.map((chat) => (
                  <div className="overflow-y-auto scrollbar" key={chat.id}>
                    <div
                      className="w-full px-3 py-3 sm:py-4 sm:my-2 max-sm:border-b rounded-lg flex items-center hover:bg-slate-100 transition duration-150 ease-in-out"
                      onClick={(e) => handleShowChat(chat)}
                    >
                      <div className="w-14 h-14 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-700 select-none">
                        #{chat.id}
                      </div>

                      <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                        <div className="flex items-center justify-between">
                          <span className="mr-3 font-semibold text-lg truncate whitespace-nowrap">
                            Заявка #{chat.id}
                          </span>

                          {/* {!lastMessages[chat?.id] && (
                            <div className="ml-auto mr-4">
                              <span className="w-5 h-5 ml-4 rounded-full flex-shrink-0 bg-emerald-700 text-xs text-white font-medium flex justify-center items-center">
                                1
                              </span>
                            </div>
                          )} */}

                          <span className="mb-1 text-xs sm:text-sm">19:32</span>
                        </div>

                        {lastMessages[chat?.id] && (
                          <div className="flex justify-between">
                            <span className="mb-1 text-xs sm:text-sm font-normal truncate whitespace-nowrap">
                              {lastMessages[chat?.id]}
                            </span>

                            {/* <span className="w-5 h-5 ml-4 rounded-full flex-shrink-0 bg-emerald-700 text-xs text-white font-medium flex justify-center items-center">
                              1
                            </span> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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

                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full flex-shrink-0 flex-grow-0 flex justify-center items-center font-medium text-white bg-zinc-500 select-none">
                    A
                  </div>

                  <div className="max-w-[calc(100%_-_64px)] pl-4 flex-shrink flex-grow select-none">
                    <div className="mr-3 font-semibold text-base">
                      {!chat ? "Загрузка" : `Заявка #${chat.id} - ${chat.collocutor.name || ""}`}
                    </div>

                    {/* <div className="flex justify-between text-xs sm:text-sm text-emerald-700 font-medium">
                      Онлайн
                    </div> */}
                  </div>
                </div>
              </div>

              <div
                className="flex-shrink flex-grow flex flex-col p-4 sm:p-8 overflow-auto scrollbar"
                ref={chatDiv}
              >
                {messages.map((message, index) => (
                  <div
                    className={`mb-4 flex items-end ${message.isMe ? "self-end" : ""}`}
                    key={index}
                  >
                    {message.isMe ? (
                      <>
                        <div className="max-w-[360px] px-4 py-3 ml-8 rounded-lg rounded-br-none text-zinc-100 bg-current relative">
                          <div className="text-sm sm:text-base text-black">{message.text}</div>
                          <div className="w-0 h-0 block border-8 border-transparent border-b-current border-solid absolute -right-2 bottom-0"></div>
                        </div>
                      </>
                    ) : (
                      <>
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
                          <div className="text-sm sm:text-base text-black">{message.text}</div>
                          <div className="w-0 h-0 block border-8 border-transparent border-b-current border-solid absolute -left-2 bottom-0"></div>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                <span className="pb-40 block"></span>
              </div>

              <div className="relative">
                <div className="absolute bottom-0 left-0 right-0 w-full p-4 max-sm:pb-8 sm:p-8 mt-auto bg-gradient-to-t from-slate-300">
                  <div className="relative">
                    <label className="w-full py-4 rounded-xl block bg-white border-2 border-zinc-200">
                      <textarea
                        className="max-h-12 lg:max-h-28 h-auto min-h-full w-full pl-6 pr-16 lg:pr-20 block text-base sm:text-lg bg-transparent text-black font-normal focus:outline-none overflow-auto resize-none scrollbar"
                        rows="1"
                        ref={inputDiv}
                        value={message}
                        onInput={handleInput}
                      />
                    </label>

                    <button
                      className="absolute top-1/2 -translate-y-1/2 right-0 w-14 lg:w-16 h-14 lg:h-16 rounded-xl flex justify-center items-center text-center text-sm sm:text-base bg-emerald-700 text-white font-semibold select-none-700"
                      type="button"
                      onClick={handleSend}
                    >
                      <SendIconView className="w-6 h-6" />
                    </button>
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
          </>
        )}
      </ApplicationModalLogic>
    )}
  </ChatLogic>
);

const ChatLogic = ({ children }) => {
  const user = useStore();

  const [message, setMessage] = useState("");
  const inputDiv = useRef(null);
  const chatDiv = useRef(null);

  const [isOpened, setIsOpened] = useState(false);
  const [chat, setChat] = useState(null);

  const handleShow = (chat) => {
    setChat(chat);
    setIsOpened((value) => !value);
  };

  useEffect(() => {
    setMessage("");
    if (inputDiv.current) autoHeight(inputDiv.current);
    if (chatDiv.current) scrollDown(chatDiv.current);
  }, [chat, isOpened]);

  const handleHide = () => {
    setIsOpened((value) => !value);
  };

  const chatsQuery = useChatsQuery();
  const messagesQuery = useMessagesQuery(chat?.id);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState({});

  useEffect(() => {
    if (chatsQuery.data && chatsQuery.isSuccess) {
      const data = chatsQuery.data?.results;
      setChats(data);
      setLastMessages(
        data.reduce(
          (result, current) => ({
            ...result,
            [current?.id]: current?.last_message?.content,
          }),
          {}
        )
      );
      if (data?.length) setChat(data[0]);
    }
  }, [chatsQuery.data, chatsQuery.isSuccess]);

  useEffect(() => {
    if (messagesQuery.data && messagesQuery.isSuccess) {
      const data = messagesQuery.data?.map((item) => ({
        text: item.content,
        isMe: user.id === item.sender,
      }));
      if (data?.length) setMessages(data);
    }
  }, [messagesQuery.data, messagesQuery.isSuccess]);

  const ws = useChatWebsocket({
    onOpen() {
      console.log("Connected!");
    },
    onClose() {
      console.log("Disconnected!");
    },
    onMessage(e) {
      setLastMessages((messages) => ({
        ...messages,
        [e?.from]: e?.message,
      }));

      if (e.from != chat.id) return;

      setMessages((messages) => [
        ...messages,
        {
          text: e?.message,
          isMe: false,
        },
      ]);
    },
  });

  const handleInput = () => {
    if (inputDiv.current) {
      const target = inputDiv.current;
      autoHeight(target);
      setMessage(target.value);
    }
  };

  const handleSend = () => {
    const _message = message.trim();
    if (!_message) return;
    if (inputDiv.current) autoHeight(inputDiv.current);
    if (chatDiv.current) scrollDown(chatDiv.current);

    ws.sendMessage({
      to: chat.id,
      message: _message,
      message_type_id: 3,
    });

    setMessage("");
    setLastMessages((state) => ({ ...state, [chat.id]: _message }));

    setMessages((messages) => [
      ...messages,
      {
        text: message,
        isMe: true,
      },
    ]);
  };

  return (
    <>
      {typeof children === "function"
        ? children({
            chats,
            messages,
            isOpened,
            handleShow,
            handleHide,
            handleSend,
            chat,
            message,
            lastMessages,
            handleInput,
            inputDiv,
            chatDiv,
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
