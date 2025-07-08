import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useWorkspaceMode } from "@/hooks/useWorkspaceMode";

interface DraggableComponentProps {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  onPositionChange: (id: string, x: number, y: number) => void;
  onSelect: (id: string) => void;
  onRun?: (id: string) => void;
  isSelected: boolean;
}

export const DraggableComponent = ({
  id,
  name,
  icon,
  x,
  y,
  onPositionChange,
  onSelect,
  onRun,
  isSelected,
}: DraggableComponentProps) => {
  const { isEditMode } = useWorkspaceMode();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - x,
      y: e.clientY - y,
    });
    onSelect(id);
  };

  const handleDoubleClick = () => {
    if (onRun) {
      onRun(id);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // 限制在画布范围内
    const constrainedX = Math.max(0, Math.min(newX, 800 - 120));
    const constrainedY = Math.max(0, Math.min(newY, 600 - 120));
    
    onPositionChange(id, constrainedX, constrainedY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 添加全局鼠标事件监听
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      ref={elementRef}
      className={`absolute w-28 h-28 transition-transform duration-200 ${
        isEditMode ? 'cursor-move' : 'cursor-pointer'
      } ${
        isDragging ? 'scale-105 z-50' : 'hover:scale-105'
      } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ left: x, top: y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <Card className={`w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center p-4 ${
        isSelected ? 'border-blue-500' : ''
      }`}>
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="text-white text-sm font-medium text-center leading-tight">
          {name}
        </h3>
      </Card>
    </div>
  );
};