import DropdownMenu from "./DropdownMenu";
import { Sidebar } from "./SideBar";

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="min-h-screen relative flex-1 flex flex-col items-center justify-center md:ml-[72px] xl:ml-64 p-4 sm:p-8 lg:p-16">
        <DropdownMenu />
        {children}
      </div>
    </>
  );
}
