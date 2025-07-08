import { ReactNode } from 'react';
import { WorkspaceModeContext, useWorkspaceModeState } from '@/hooks/useWorkspaceMode';

interface WorkspaceModeProviderProps {
  children: ReactNode;
}

export const WorkspaceModeProvider = ({ children }: WorkspaceModeProviderProps) => {
  const workspaceModeState = useWorkspaceModeState();

  return (
    <WorkspaceModeContext.Provider value={workspaceModeState}>
      {children}
    </WorkspaceModeContext.Provider>
  );
};