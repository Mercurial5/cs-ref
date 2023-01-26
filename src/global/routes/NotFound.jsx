const NotFoundView = () => (
  <div className="text-white bg-zinc-900 h-screen flex justify-center items-center flex-col text-center px-4">
    <h2 className="text-4xl sm:text-5xl font-bold mb-5">Страница не найдена!</h2>
    <a
      href="/"
      className="inline-flex rounded justify-center items-center text-center text-sm sm:text-base mt-8 px-6 sm:px-8 py-[14px] border-2 border-zinc-200 hover:border-zinc-300 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition ease-in-out duration-150"
    >
      Перейти на главную
    </a>
  </div>
);

export default NotFoundView;
