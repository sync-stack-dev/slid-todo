"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { AppSidebarTrigger } from "./components/app-sidebar-trigger";
import { AppSidebarFooter } from "./components/app-sidebar-footer";
import { AppSidebarHeader } from "./components/app-sidebar-header";
import AppSidebarUserInfo from "./components/app-sidebar-user-info";
import { Separator } from "@/components/ui/separator";
import AppSidebarDashBoard from "./components/app-sidebar-dashboard";
import AppSidebarGoal from "./components/app-sidebar-goal";

const AppSidebar = () => {
  const { open, openMobile, setOpen, setOpenMobile } = useSidebar();

  useEffect(() => {
    setOpen(true);
    setOpenMobile(true);
  }, []);

  return (
    <>
      {/* open이 true일 때 백그라운드 덮기 */}
      {/* 사이드바는 z-index로 백그라운드 위에 위치하도록 설정 */}
      <Sidebar className="bg-white" role="navigation">
        <SidebarHeader>
          <AppSidebarHeader />
        </SidebarHeader>
        <SidebarContent>
          <AppSidebarUserInfo />
          <Separator className="border-[1px]" />
          <AppSidebarDashBoard />
          <Separator className="border-[1px]" />
          <AppSidebarGoal />
        </SidebarContent>
        <SidebarFooter>
          <AppSidebarFooter />
        </SidebarFooter>
      </Sidebar>
      {!open && !openMobile && <AppSidebarTrigger />}
    </>
  );
};

export default AppSidebar;
