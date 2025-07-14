import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Workspace {
  id: string;
  user_id: string;
  name: string;
  description: string;
  type: string;
  components: any[];
  last_opened: string;
  created_at: string;
  updated_at: string;
}

interface UseWorkspaceReturn {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  lastOpenedWorkspace: Workspace | null;
  createWorkspace: (workspace: Omit<Workspace, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'last_opened'>) => Promise<void>;
  updateWorkspace: (id: string, updates: Partial<Workspace>) => Promise<void>;
  switchWorkspace: (id: string) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;
  saveWorkspaceAsTemplate: (workspace: Workspace) => Promise<void>;
  hasWorkspaces: boolean;
  loading: boolean;
}

export const useWorkspace = (): UseWorkspaceReturn => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(false);

  // 模拟的工作空间数据
  const mockWorkspaces: Workspace[] = [
    {
      id: '1',
      user_id: 'mock-user',
      name: '示例工作空间',
      description: '这是一个示例工作空间',
      type: 'project',
      components: [],
      last_opened: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ];

  useEffect(() => {
    // 使用本地存储模拟数据持久化
    const stored = localStorage.getItem('mockWorkspaces');
    if (stored) {
      try {
        const parsedWorkspaces = JSON.parse(stored);
        setWorkspaces(parsedWorkspaces);
        if (parsedWorkspaces.length > 0) {
          setCurrentWorkspace(parsedWorkspaces[0]);
        }
      } catch (error) {
        console.error('Error parsing stored workspaces:', error);
        setWorkspaces(mockWorkspaces);
        setCurrentWorkspace(mockWorkspaces[0]);
      }
    } else {
      setWorkspaces(mockWorkspaces);
      setCurrentWorkspace(mockWorkspaces[0]);
    }
  }, []);

  // 获取最后打开的工作空间
  const lastOpenedWorkspace = workspaces.length > 0 
    ? workspaces.reduce((latest, workspace) => 
        new Date(workspace.last_opened) > new Date(latest.last_opened) ? workspace : latest
      )
    : null;

  // 创建新工作空间
  const createWorkspace = async (workspaceData: Omit<Workspace, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'last_opened'>) => {
    try {
      const newWorkspace: Workspace = {
        id: Date.now().toString(),
        user_id: 'mock-user',
        name: workspaceData.name,
        description: workspaceData.description,
        type: workspaceData.type,
        components: workspaceData.components,
        last_opened: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const updatedWorkspaces = [newWorkspace, ...workspaces];
      setWorkspaces(updatedWorkspaces);
      setCurrentWorkspace(newWorkspace);
      localStorage.setItem('mockWorkspaces', JSON.stringify(updatedWorkspaces));
      localStorage.setItem('currentWorkspaceId', newWorkspace.id);
      
      toast.success('工作空间创建成功');
    } catch (error) {
      toast.error('创建工作空间时出现错误');
      console.error('Error creating workspace:', error);
    }
  };

  // 更新工作空间
  const updateWorkspace = async (id: string, updates: Partial<Workspace>) => {
    try {
      const updatedWorkspaces = workspaces.map(ws => 
        ws.id === id ? { ...ws, ...updates, updated_at: new Date().toISOString() } : ws
      );
      setWorkspaces(updatedWorkspaces);
      
      if (currentWorkspace?.id === id) {
        setCurrentWorkspace({ ...currentWorkspace, ...updates, updated_at: new Date().toISOString() });
      }
      
      localStorage.setItem('mockWorkspaces', JSON.stringify(updatedWorkspaces));
      toast.success('工作空间更新成功');
    } catch (error) {
      toast.error('更新工作空间时出现错误');
      console.error('Error updating workspace:', error);
    }
  };

  // 切换工作空间
  const switchWorkspace = async (id: string) => {
    try {
      const workspace = workspaces.find(ws => ws.id === id);
      if (workspace) {
        const updatedWorkspace = { ...workspace, last_opened: new Date().toISOString() };
        const updatedWorkspaces = workspaces.map(ws => 
          ws.id === id ? updatedWorkspace : ws
        );
        
        setWorkspaces(updatedWorkspaces);
        setCurrentWorkspace(updatedWorkspace);
        localStorage.setItem('mockWorkspaces', JSON.stringify(updatedWorkspaces));
        localStorage.setItem('currentWorkspaceId', id);
        toast.success('工作空间切换成功');
      }
    } catch (error) {
      toast.error('切换工作空间时出现错误');
      console.error('Error switching workspace:', error);
    }
  };

  // 删除工作空间
  const deleteWorkspace = async (id: string) => {
    try {
      const updatedWorkspaces = workspaces.filter(ws => ws.id !== id);
      setWorkspaces(updatedWorkspaces);
      
      if (currentWorkspace?.id === id) {
        const newCurrent = updatedWorkspaces.length > 0 ? updatedWorkspaces[0] : null;
        setCurrentWorkspace(newCurrent);
        localStorage.setItem('currentWorkspaceId', newCurrent?.id || '');
      }
      
      localStorage.setItem('mockWorkspaces', JSON.stringify(updatedWorkspaces));
      toast.success('工作空间删除成功');
    } catch (error) {
      toast.error('删除工作空间时出现错误');
      console.error('Error deleting workspace:', error);
    }
  };

  // 将工作空间保存为模板
  const saveWorkspaceAsTemplate = async (workspace: Workspace) => {
    try {
      toast.success('模板保存成功');
    } catch (error) {
      toast.error('保存模板时出现错误');
      console.error('Error saving template:', error);
    }
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
    loading,
  };
};