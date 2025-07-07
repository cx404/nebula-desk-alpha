import { useState, useEffect } from "react";

interface Workspace {
  id: string;
  name: string;
  description: string;
  type: string;
  components: any[];
  lastOpened: Date;
  createdAt: Date;
}

interface UseWorkspaceReturn {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  lastOpenedWorkspace: Workspace | null;
  createWorkspace: (workspace: Omit<Workspace, 'id' | 'createdAt' | 'lastOpened'>) => void;
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void;
  switchWorkspace: (id: string) => void;
  deleteWorkspace: (id: string) => void;
  saveWorkspaceAsTemplate: (workspace: Workspace) => void;
  hasWorkspaces: boolean;
}

export const useWorkspace = (): UseWorkspaceReturn => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);

  // 从 localStorage 加载工作空间数据
  useEffect(() => {
    const savedWorkspaces = localStorage.getItem('workspaces');
    const savedCurrentWorkspaceId = localStorage.getItem('currentWorkspaceId');
    
    if (savedWorkspaces) {
      const parsedWorkspaces = JSON.parse(savedWorkspaces).map((ws: any) => ({
        ...ws,
        lastOpened: new Date(ws.lastOpened),
        createdAt: new Date(ws.createdAt)
      }));
      setWorkspaces(parsedWorkspaces);
      
      if (savedCurrentWorkspaceId) {
        const current = parsedWorkspaces.find((ws: Workspace) => ws.id === savedCurrentWorkspaceId);
        setCurrentWorkspace(current || null);
      }
    }
  }, []);

  // 保存工作空间数据到 localStorage
  const saveToStorage = (updatedWorkspaces: Workspace[], currentId?: string) => {
    localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces));
    if (currentId !== undefined) {
      if (currentId) {
        localStorage.setItem('currentWorkspaceId', currentId);
      } else {
        localStorage.removeItem('currentWorkspaceId');
      }
    }
  };

  // 获取最后打开的工作空间
  const lastOpenedWorkspace = workspaces.length > 0 
    ? workspaces.reduce((latest, workspace) => 
        workspace.lastOpened > latest.lastOpened ? workspace : latest
      )
    : null;

  // 创建新工作空间
  const createWorkspace = (workspaceData: Omit<Workspace, 'id' | 'createdAt' | 'lastOpened'>) => {
    const newWorkspace: Workspace = {
      ...workspaceData,
      id: `workspace-${Date.now()}`,
      createdAt: new Date(),
      lastOpened: new Date(),
    };

    const updatedWorkspaces = [...workspaces, newWorkspace];
    setWorkspaces(updatedWorkspaces);
    setCurrentWorkspace(newWorkspace);
    saveToStorage(updatedWorkspaces, newWorkspace.id);
  };

  // 更新工作空间
  const updateWorkspace = (id: string, updates: Partial<Workspace>) => {
    const updatedWorkspaces = workspaces.map(ws => 
      ws.id === id 
        ? { ...ws, ...updates, lastOpened: new Date() }
        : ws
    );
    setWorkspaces(updatedWorkspaces);
    
    if (currentWorkspace?.id === id) {
      const updatedCurrent = updatedWorkspaces.find(ws => ws.id === id);
      setCurrentWorkspace(updatedCurrent || null);
    }
    
    saveToStorage(updatedWorkspaces);
  };

  // 切换工作空间
  const switchWorkspace = (id: string) => {
    const workspace = workspaces.find(ws => ws.id === id);
    if (workspace) {
      const updatedWorkspace = { ...workspace, lastOpened: new Date() };
      const updatedWorkspaces = workspaces.map(ws => 
        ws.id === id ? updatedWorkspace : ws
      );
      
      setWorkspaces(updatedWorkspaces);
      setCurrentWorkspace(updatedWorkspace);
      saveToStorage(updatedWorkspaces, id);
    }
  };

  // 删除工作空间
  const deleteWorkspace = (id: string) => {
    const updatedWorkspaces = workspaces.filter(ws => ws.id !== id);
    setWorkspaces(updatedWorkspaces);
    
    if (currentWorkspace?.id === id) {
      const newCurrent = updatedWorkspaces.length > 0 ? updatedWorkspaces[0] : null;
      setCurrentWorkspace(newCurrent);
      saveToStorage(updatedWorkspaces, newCurrent?.id || '');
    } else {
      saveToStorage(updatedWorkspaces);
    }
  };

  // 将工作空间保存为模板
  const saveWorkspaceAsTemplate = (workspace: Workspace) => {
    const templates = JSON.parse(localStorage.getItem('workspaceTemplates') || '[]');
    const template = {
      id: `template-${Date.now()}`,
      name: `${workspace.name} 模板`,
      description: `基于 ${workspace.name} 创建的模板`,
      category: workspace.type,
      components: workspace.components.map(comp => comp.name),
      createdAt: new Date(),
    };
    
    templates.push(template);
    localStorage.setItem('workspaceTemplates', JSON.stringify(templates));
  };

  return {
    workspaces,
    currentWorkspace,
    lastOpenedWorkspace,
    createWorkspace,
    updateWorkspace,
    switchWorkspace,
    deleteWorkspace,
    saveWorkspaceAsTemplate,
    hasWorkspaces: workspaces.length > 0,
  };
};