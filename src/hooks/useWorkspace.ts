import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DBWorkspace {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  type: string;
  components: any;
  last_opened: string;
  created_at: string;
  updated_at: string;
}

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
  const [loading, setLoading] = useState(true);

  // 从数据库加载工作空间数据
  useEffect(() => {
    const loadWorkspaces = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setLoading(false);
          return;
        }

        const { data: workspacesData, error } = await supabase
          .from('workspaces')
          .select('*')
          .order('last_opened', { ascending: false });

        if (error) {
          toast.error('加载工作空间失败');
          console.error('Error loading workspaces:', error);
        } else {
          // 转换数据格式
          const convertedWorkspaces: Workspace[] = (workspacesData || []).map((ws: DBWorkspace) => ({
            ...ws,
            description: ws.description || '',
            components: Array.isArray(ws.components) ? ws.components : []
          }));
          
          setWorkspaces(convertedWorkspaces);
          
          // 设置最近打开的工作空间为当前工作空间
          const savedCurrentId = localStorage.getItem('currentWorkspaceId');
          if (savedCurrentId) {
            const current = convertedWorkspaces?.find(ws => ws.id === savedCurrentId);
            setCurrentWorkspace(current || (convertedWorkspaces?.[0] || null));
          } else if (convertedWorkspaces && convertedWorkspaces.length > 0) {
            setCurrentWorkspace(convertedWorkspaces[0]);
          }
        }
      } catch (error) {
        console.error('Error loading workspaces:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkspaces();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setWorkspaces([]);
        setCurrentWorkspace(null);
        localStorage.removeItem('currentWorkspaceId');
      } else if (event === 'SIGNED_IN' && session) {
        loadWorkspaces();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 记录工作空间操作
  const logOperation = async (workspaceId: string, operationType: string, operationData: any = {}) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      await supabase
        .from('workspace_operations')
        .insert({
          workspace_id: workspaceId,
          user_id: session.user.id,
          operation_type: operationType,
          operation_data: operationData
        });
    } catch (error) {
      console.error('Error logging operation:', error);
    }
  };

  // 获取最后打开的工作空间
  const lastOpenedWorkspace = workspaces.length > 0 
    ? workspaces.reduce((latest, workspace) => 
        new Date(workspace.last_opened) > new Date(latest.last_opened) ? workspace : latest
      )
    : null;

  // 创建新工作空间
  const createWorkspace = async (workspaceData: Omit<Workspace, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'last_opened'>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('请先登录');
        return;
      }

      const { data, error } = await supabase
        .from('workspaces')
        .insert({
          user_id: session.user.id,
          name: workspaceData.name,
          description: workspaceData.description,
          type: workspaceData.type,
          components: workspaceData.components
        })
        .select()
        .single();

      if (error) {
        toast.error('创建工作空间失败');
        console.error('Error creating workspace:', error);
        return;
      }

      const convertedData: Workspace = {
        ...data,
        description: data.description || '',
        components: Array.isArray(data.components) ? data.components : []
      };
      
      const updatedWorkspaces = [convertedData, ...workspaces];
      setWorkspaces(updatedWorkspaces);
      setCurrentWorkspace(convertedData);
      localStorage.setItem('currentWorkspaceId', data.id);
      
      await logOperation(data.id, 'CREATE', workspaceData);
      toast.success('工作空间创建成功');
    } catch (error) {
      toast.error('创建工作空间时出现错误');
      console.error('Error creating workspace:', error);
    }
  };

  // 更新工作空间
  const updateWorkspace = async (id: string, updates: Partial<Workspace>) => {
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .update({
          ...updates,
          last_opened: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast.error('更新工作空间失败');
        console.error('Error updating workspace:', error);
        return;
      }

      const convertedData: Workspace = {
        ...data,
        description: data.description || '',
        components: Array.isArray(data.components) ? data.components : []
      };
      
      const updatedWorkspaces = workspaces.map(ws => 
        ws.id === id ? convertedData : ws
      );
      setWorkspaces(updatedWorkspaces);
      
      if (currentWorkspace?.id === id) {
        setCurrentWorkspace(convertedData);
      }
      
      await logOperation(id, 'UPDATE', updates);
    } catch (error) {
      toast.error('更新工作空间时出现错误');
      console.error('Error updating workspace:', error);
    }
  };

  // 切换工作空间
  const switchWorkspace = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .update({ last_opened: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast.error('切换工作空间失败');
        console.error('Error switching workspace:', error);
        return;
      }

      const convertedData: Workspace = {
        ...data,
        description: data.description || '',
        components: Array.isArray(data.components) ? data.components : []
      };
      
      const updatedWorkspaces = workspaces.map(ws => 
        ws.id === id ? convertedData : ws
      );
      
      setWorkspaces(updatedWorkspaces);
      setCurrentWorkspace(convertedData);
      localStorage.setItem('currentWorkspaceId', id);
      
      await logOperation(id, 'SWITCH');
    } catch (error) {
      toast.error('切换工作空间时出现错误');
      console.error('Error switching workspace:', error);
    }
  };

  // 删除工作空间
  const deleteWorkspace = async (id: string) => {
    try {
      const { error } = await supabase
        .from('workspaces')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('删除工作空间失败');
        console.error('Error deleting workspace:', error);
        return;
      }

      const updatedWorkspaces = workspaces.filter(ws => ws.id !== id);
      setWorkspaces(updatedWorkspaces);
      
      if (currentWorkspace?.id === id) {
        const newCurrent = updatedWorkspaces.length > 0 ? updatedWorkspaces[0] : null;
        setCurrentWorkspace(newCurrent);
        localStorage.setItem('currentWorkspaceId', newCurrent?.id || '');
      }
      
      await logOperation(id, 'DELETE');
      toast.success('工作空间删除成功');
    } catch (error) {
      toast.error('删除工作空间时出现错误');
      console.error('Error deleting workspace:', error);
    }
  };

  // 将工作空间保存为模板
  const saveWorkspaceAsTemplate = async (workspace: Workspace) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('请先登录');
        return;
      }

      const { error } = await supabase
        .from('workspace_templates')
        .insert({
          user_id: session.user.id,
          name: `${workspace.name} 模板`,
          description: `基于 ${workspace.name} 创建的模板`,
          category: workspace.type,
          components: workspace.components,
          is_public: false
        });

      if (error) {
        toast.error('保存模板失败');
        console.error('Error saving template:', error);
        return;
      }

      await logOperation(workspace.id, 'SAVE_TEMPLATE');
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