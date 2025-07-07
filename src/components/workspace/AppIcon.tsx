import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play, Pause, Settings, X } from "lucide-react";

interface AppIconProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  status: "idle" | "running" | "error";
  onMove: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
  onRun: (id: string) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
  isGrouped?: boolean;
  groupId?: string;
}

export const AppIcon = ({ 
  id, 
  name, 
  icon, 
  x, 
  y, 
  status, 
  onMove, 
  onDelete, 
  onRun, 
  onSelect,
  isSelected,
  isGrouped = false,
  groupId
}: AppIconProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    onSelect(id);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      onMove(id, newX, newY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 添加全局事件监听器
  useState(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  });

  const getStatusColor = () => {
    switch (status) {
      case "running":
        return "bg-green-500/20 border-green-500/50";
      case "error":
        return "bg-red-500/20 border-red-500/50";
      default:
        return "bg-white/10 border-white/20";
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "running":
        return <Badge className="absolute -top-2 -right-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">●</Badge>;
      case "error":
        return <Badge className="absolute -top-2 -right-2 bg-red-500/20 text-red-400 border-red-500/30 text-xs">●</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={showDetails} onOpenChange={setShowDetails}>
      <div
        className={`absolute select-none cursor-pointer transition-all duration-200 ${
          isDragging ? 'scale-110 z-50' : 'hover:scale-105'
        } ${isSelected ? 'ring-2 ring-blue-500/50' : ''}`}
        style={{ left: x, top: y }}
        onMouseDown={handleMouseDown}
      >
        <DialogTrigger asChild>
          <Card className={`w-20 h-20 flex items-center justify-center backdrop-blur-xl border transition-all duration-200 hover:shadow-lg ${getStatusColor()}`}>
            <div className="text-2xl">{icon}</div>
            {getStatusBadge()}
            {isGrouped && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500/30 rounded-full border border-blue-500/50 flex items-center justify-center">
                <span className="text-xs text-blue-300">G</span>
              </div>
            )}
          </Card>
        </DialogTrigger>
        
        <p className="text-center text-xs text-white mt-1 max-w-20 truncate">{name}</p>
        
        <DialogContent className="bg-black/90 backdrop-blur-xl border border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="text-xl">{icon}</div>
              {name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">状态:</span>
              <Badge className={status === "running" ? "bg-green-500/20 text-green-400" : status === "error" ? "bg-red-500/20 text-red-400" : "bg-gray-500/20 text-gray-400"}>
                {status === "running" ? "运行中" : status === "error" ? "错误" : "就绪"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">位置:</span>
              <span className="text-sm">({Math.round(x)}, {Math.round(y)})</span>
            </div>
            
            {isGrouped && groupId && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">分组:</span>
                <span className="text-sm text-blue-400">{groupId}</span>
              </div>
            )}
            
            <div className="flex gap-2 pt-4">
              <Button
                size="sm"
                onClick={() => onRun(id)}
                disabled={status === "running"}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30"
              >
                {status === "running" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {status === "running" ? "停止" : "运行"}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
              >
                <Settings className="w-4 h-4" />
                设置
              </Button>
              
              <Button
                size="sm"
                onClick={() => onDelete(id)}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
              >
                <X className="w-4 h-4" />
                删除
              </Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};