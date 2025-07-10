import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="overflow-x-auto bg-[#dddddd] min-h-screen">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
