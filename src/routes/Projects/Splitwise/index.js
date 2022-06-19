import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { SplitwiseContextProvider } from "./SplitwiseContext";
export default function Splitwise() {
  return (
    <div className="d-flex">
      <SplitwiseContextProvider>
        <aside>
          <SideNav></SideNav>
        </aside>
        <main className="border-primary border-end border-opacity-25 m-2 ">
          <Outlet></Outlet>
        </main>
      </SplitwiseContextProvider>
    </div>
  );
}
