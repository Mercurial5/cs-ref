import { Outlet } from "react-router-dom";
import { Header } from "./Header";

const LayoutView = () => {
  return (
    <div className="min-h-screen bg-slate-200 flex flex-col">
      <Header />

      <div className="px-6 sm:px-6 py-6 flex-grow flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export { LayoutView as Layout };
