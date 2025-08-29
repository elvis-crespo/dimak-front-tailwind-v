import { useSelector } from "react-redux";
import DropdownMenu from "./DropdownMenu";
import { Sidebar } from "./SideBar";

// eslint-disable-next-line react/prop-types
export default function Layout({ className, children }) {
    const { user } = useSelector((state) => state.user);
    const isAdmin =
      user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ===
      "Admin";
  return (
    <>
      <Sidebar isAdmin={isAdmin}/>
      <DropdownMenu />
      <div
        className={`animate-fadeInSlight min-h-screen relative flex-1 flex flex-col items-center justify-center md:ml-[72px] pt-20 xl:ml-64 p-4 sm:p-8 lg:p-16 ${className}`}
      >
        {children}
      </div>
    </>
  );
}
