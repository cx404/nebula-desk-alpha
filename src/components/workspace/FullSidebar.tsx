import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  FolderOpen, 
  RefreshCw, 
  ListTodo, 
  Activity,
  Settings,
  Monitor,
  Plus,
  Users,
  FileText,
  ShoppingBag
} from "lucide-react";

interface FullSidebarProps {
  selectedNav: string;
  onNavSelect: (nav: string) => void;
  onCreateWorkspace?: () => void;
}

export const FullSidebar = ({ selectedNav, onNavSelect, onCreateWorkspace }: FullSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      id: "dashboard",
      name: "Dashboard", 
      icon: LayoutDashboard,
      active: selectedNav === "dashboard"
    },
    {
      id: "workspaces",
      name: "Workspaces",
      icon: FolderOpen,
      active: selectedNav === "workspaces" || selectedNav === "workspace",
      badge: "2"
    },
    {
      id: "file-sync",
      name: "File Sync",
      icon: RefreshCw,
      active: selectedNav === "file-sync"
    },
    {
      id: "job-queue", 
      name: "Job Queue",
      icon: ListTodo,
      active: selectedNav === "job-queue"
    },
    {
      id: "diagnostics",
      name: "Diagnostics", 
      icon: Activity,
      active: selectedNav === "diagnostics"
    }
  ];

  const statusItems = [
    { label: "Running", count: 2, color: "text-green-400", bgColor: "bg-green-500/20" },
    { label: "Idle", count: 1, color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
    { label: "Stopped", count: 1, color: "text-gray-400", bgColor: "bg-gray-500/20" },
    { label: "Total Cost", count: "$27.50/hr", color: "text-blue-400", bgColor: "bg-blue-500/20" }
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-full bg-black/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300 flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Monitor className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-white font-semibold text-sm">GPU Cloud</h2>
              <p className="text-gray-400 text-xs">Desktop Manager</p>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium text-lg">Workspace Manager</h3>
              <Button
                size="sm"
                onClick={onCreateWorkspace}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xs px-3 py-1.5 h-auto"
              >
                <Plus className="w-3 h-3 mr-1" />
                Create Workspace
              </Button>
            </div>
            <p className="text-gray-400 text-sm">Manage your cloud GPU workspaces</p>
          </div>
        )}
      </div>

      {/* Status Overview */}
      {!isCollapsed && (
        <div className="p-4 border-b border-white/10">
          <div className="grid grid-cols-2 gap-2">
            {statusItems.map((item, index) => (
              <Card key={index} className={`${item.bgColor} border-0 p-3`}>
                <div className="text-center">
                  <div className={`text-lg font-bold ${item.color}`}>
                    {item.count}
                  </div>
                  <div className="text-xs text-gray-300">
                    {item.label}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start text-left h-12 ${
                item.active 
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30" 
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              } ${isCollapsed ? 'px-3' : 'px-4'}`}
              onClick={() => onNavSelect(item.id === "workspaces" ? "workspace" : item.id)}
            >
              <item.icon className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-3'}`} />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </div>
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full text-gray-400 hover:text-white hover:bg-white/10"
        >
          {isCollapsed ? '→' : '←'}
        </Button>
      </div>
    </div>
  );
};