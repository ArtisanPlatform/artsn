"use client";

import type React from "react";

import { useState } from "react";
import {
  BarChart2,
  FileText,
  Folder,
  Grid,
  HelpCircle,
  Home,
  Layers,
  Search,
  Users,
  Bell,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Goal,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";

type MenuItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
  badge?: string;
};

type Project = {
  id: string;
  name: string;
  color: string;
};

const projects: Project[] = [
  {
    id: "project-1",
    name: "Project 1",
    color: "bg-red-500",
  },
  {
    id: "project-2",
    name: "Project 2",
    color: "bg-blue-500",
  },
];

export function VerticalSidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      icon: <Home className="w-4 h-4" />,
      label: "Dashboard",
      active: false,
    },
    {
      id: "projects",
      icon: <Folder className="w-4 h-4" />,
      label: "Projects",
      count: 3,
      active: true,
    },
    {
      id: "analytics",
      icon: <BarChart2 className="w-4 h-4" />,
      label: "Analytics",
      active: false,
    },
    {
      id: "reports",
      icon: <FileText className="w-4 h-4" />,
      label: "Reports",
      active: false,
      badge: "New",
    },
    {
      id: "extensions",
      icon: <Layers className="w-4 h-4" />,
      label: "Extensions",
      active: false,
    },
    {
      id: "goals",
      icon: <Goal className="w-4 h-4" />,
      label: "Goals",
      count: 12,
      active: false,
    },
  ];

  const bottomMenuItems: MenuItem[] = [
    {
      id: "help",
      icon: <HelpCircle className="w-4 h-4" />,
      label: "Help center",
      active: false,
    },
    {
      id: "notifications",
      icon: <Bell className="w-4 h-4" />,
      label: "Notifications",
      active: false,
      badge: "3",
    },
  ];

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={cn(
          "h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
          expanded ? "w-[240px]" : "w-[60px]"
        )}
      >
        <div
          className={cn(
            "p-4 flex items-center ",
            expanded ? "justify-between" : "justify-center"
          )}
        >
          {expanded ? (
            <Image src={"/artsn-logo.png"} alt="logo" width={100} height={30} />
          ) : (
            <Image
              src={"/artsn-icon.png"}
              alt="logo"
              width={100}
              height={100}
              onClick={toggleSidebar}
            />
          )}

          {expanded && (
            <button
              onClick={toggleSidebar}
              className="w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 z-10"
            >
              <ChevronLeft className="w-3 h-3 text-gray-500" />
            </button>
          )}
        </div>
        {expanded && (
          <>
            <div className="mt-4">
              <div className="mx-2">
                <div className="mb-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-md px-2 py-1.5 text-sm text-gray-800 border border-gray-200">
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-sm ${selectedProject.color} mr-2`}
                        ></div>
                        <span>{selectedProject.name}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[216px]">
                      {projects.map((project) => (
                        <DropdownMenuItem
                          key={project.id}
                          onClick={() => setSelectedProject(project)}
                          className="flex items-center cursor-pointer"
                        >
                          <div
                            className={`w-4 h-4 rounded-sm ${project.color} mr-2`}
                          ></div>
                          <span>{project.name}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="flex-1 overflow-auto px-2">
          <nav className="space-y-1">
            {menuItems.map((item) =>
              expanded ? (
                <Link
                  key={item.id}
                  href="#"
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm group",
                    item.active
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <span
                    className={cn(
                      "mr-3",
                      item.active ? "text-gray-900" : "text-gray-500"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {item.count !== undefined && (
                    <span className="text-xs text-gray-500">{item.count}</span>
                  )}
                  {item.badge && (
                    <span
                      className={cn(
                        "ml-2 px-1.5 py-0.5 text-xs rounded-full",
                        item.badge === "New"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Link
                      href="#"
                      className={cn(
                        "flex items-center justify-center h-10 w-10 rounded-md text-sm mx-auto",
                        item.active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <span
                        className={cn(
                          item.active ? "text-gray-900" : "text-gray-500"
                        )}
                      >
                        {item.icon}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div className="flex items-center">
                      <span>{item.label}</span>
                      {item.count !== undefined && (
                        <span className="ml-1 text-xs text-gray-500">
                          ({item.count})
                        </span>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )
            )}
          </nav>
        </div>
        <div className="border-t border-gray-200 pt-2 px-2">
          <nav className="space-y-1">
            {bottomMenuItems.map((item) =>
              expanded ? (
                <Link
                  key={item.id}
                  href="#"
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm group",
                    item.active
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <span
                    className={cn(
                      "mr-3",
                      item.active ? "text-gray-900" : "text-gray-500"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Link
                      href="#"
                      className={cn(
                        "flex items-center justify-center h-10 w-10 rounded-md text-sm mx-auto",
                        item.active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <span
                        className={cn(
                          item.active ? "text-gray-900" : "text-gray-500"
                        )}
                      >
                        {item.icon}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div className="flex items-center">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )
            )}
          </nav>
        </div>
      </div>
    </TooltipProvider>
  );
}
