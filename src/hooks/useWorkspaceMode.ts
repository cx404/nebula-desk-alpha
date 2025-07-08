import { createContext, useContext, useState } from 'react';

export type WorkspaceMode = 'edit' | 'view';

interface WorkspaceModeContextType {
  mode: WorkspaceMode;
  setMode: (mode: WorkspaceMode) => void;
  isEditMode: boolean;
  isViewMode: boolean;
}

export const WorkspaceModeContext = createContext<WorkspaceModeContextType | undefined>(undefined);

export const useWorkspaceMode = () => {
  const context = useContext(WorkspaceModeContext);
  if (!context) {
    throw new Error('useWorkspaceMode must be used within a WorkspaceModeProvider');
  }
  return context;
};

export const useWorkspaceModeState = () => {
  const [mode, setMode] = useState<WorkspaceMode>('edit');
  
  return {
    mode,
    setMode,
    isEditMode: mode === 'edit',
    isViewMode: mode === 'view',
  };
};