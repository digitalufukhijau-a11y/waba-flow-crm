import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="ml-[240px] flex-1 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
