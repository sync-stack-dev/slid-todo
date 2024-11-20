"use client";
import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebarTrigger } from "./components/app-sidebar-trigger";
import { AppSidebarFooter } from "./components/app-sidebar-footer";
import { AppSidebarHeader } from "./components/app-sidebar-header";
import AppSidebarUserInfo from "./components/app-sidebar-user-info";
import { Separator } from "@/components/ui/separator";
import AppSidebarDashBoard from "./components/app-sidebar-dashboard";
import AppSidebarGoal from "./components/app-sidebar-goal";

const AppSidebar = () => {
  const { open } = useSidebar();

  return (
    <>
      <Sidebar className="bg-white">
        <SidebarHeader>
          <AppSidebarHeader />
        </SidebarHeader>
        <SidebarContent className="w-full h-1/2">
          <AppSidebarUserInfo />
          <Separator className="border-[1px]" />
          <AppSidebarDashBoard />
          <Separator className="border-[1px]" />
          <AppSidebarGoal />
        </SidebarContent>
      </Sidebar>

      {!open && <AppSidebarTrigger />}
    </>
  );
};

export default AppSidebar;
