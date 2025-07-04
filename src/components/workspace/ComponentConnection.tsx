import { useState } from "react";
import { Card } from "@/components/ui/card";

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  type: "data" | "control" | "error";
}

export const ConnectionLine = ({ startX, startY, endX, endY, type }: ConnectionLineProps) => {
  const getLineColor = () => {
    switch (type) {
      case "data": return "#3b82f6"; // blue
      case "control": return "#10b981"; // green  
      case "error": return "#ef4444"; // red
      default: return "#6b7280"; // gray
    }
  };

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  return (
    <svg className="absolute inset-0 pointer-events-none z-10" style={{ width: '100%', height: '100%' }}>
      <defs>
        <marker
          id={`arrowhead-${type}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={getLineColor()}
          />
        </marker>
      </defs>
      <path
        d={`M ${startX} ${startY} Q ${midX} ${startY - 20} ${endX} ${endY}`}
        stroke={getLineColor()}
        strokeWidth="2"
        fill="none"
        markerEnd={`url(#arrowhead-${type})`}
        className="animate-pulse"
      />
      <circle
        cx={midX}
        cy={midY - 10}
        r="3"
        fill={getLineColor()}
        className="animate-ping"
      />
    </svg>
  );
};

interface ComponentConnectionProps {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  connections: Array<{
    targetId: string;
    type: "data" | "control" | "error";
  }>;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onConnect: (sourceId: string, targetId: string, type: "data" | "control" | "error") => void;
}

export const ComponentConnection = ({
  id,
  name,
  icon,
  x,
  y,
  connections,
  isSelected,
  onSelect,
  onConnect,
}: ComponentConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionType, setConnectionType] = useState<"data" | "control" | "error">("data");

  const handleConnectionStart = (type: "data" | "control" | "error") => {
    setIsConnecting(true);
    setConnectionType(type);
    onSelect(id);
  };

  const handleConnectionEnd = () => {
    if (isConnecting) {
      // 这里可以处理连接逻辑
      setIsConnecting(false);
    }
  };

  return (
    <div
      className={`absolute w-28 h-28 transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 z-20' : 'z-10'
      }`}
      style={{ left: x, top: y }}
    >
      <Card className={`w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center p-2 relative ${
        isSelected ? 'border-blue-500' : ''
      }`}>
        <div className="text-2xl mb-1">{icon}</div>
        <h3 className="text-white text-xs font-medium text-center leading-tight">
          {name}
        </h3>
        
        {/* 连接点 */}
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
          <div
            className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer hover:scale-125 transition-transform"
            onClick={() => handleConnectionStart("data")}
            title="数据连接"
          />
        </div>
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
          <div
            className="w-4 h-4 bg-green-500 rounded-full cursor-pointer hover:scale-125 transition-transform"
            onClick={handleConnectionEnd}
            title="输入端口"
          />
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:scale-125 transition-transform"
            onClick={() => handleConnectionStart("control")}
            title="控制连接"
          />
        </div>
        
        {/* 状态指示器 */}
        <div className="absolute -top-1 -right-1">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </Card>
    </div>
  );
};