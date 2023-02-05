import { Outlet } from "react-router-dom";
import { Header } from "./Header";

const LayoutView = () => {
  return (
    <div className="min-h-screen bg-slate-200 flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col p-5">
        <Outlet />
      </div>
    </div>
  );
};

export { LayoutView as Layout };
