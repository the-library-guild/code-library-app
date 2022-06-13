import React, { ReactNode, useEffect, useState } from 'react';

export const STUDENT_VIEW = 'student';
export const LIBRARIAN_VIEW = 'librarian';

type MakingAppContextValue = {
  currentView: CurrentView;
  switchToLibrarianView: () => void;
  switchToStudentView: () => void;
};

type MakingAppContextProviderProps = {
  children: ReactNode;
};

type CurrentView = typeof STUDENT_VIEW | typeof LIBRARIAN_VIEW | undefined;

const MakingAppContext = React.createContext<MakingAppContextValue | undefined>(
  undefined
);

const isNotDevelopmentEnvironment = process.env.NODE_ENV !== 'development';

function MakingAppContextProvider({ children }: MakingAppContextProviderProps) {
  const [currentView, setCurrentView] = useState<CurrentView>(STUDENT_VIEW);

  useEffect(() => {
    if (isNotDevelopmentEnvironment) {
      setCurrentView(undefined);
    }
  }, []);

  const switchToLibrarianView = () => setCurrentView(LIBRARIAN_VIEW);
  const switchToStudentView = () => setCurrentView(STUDENT_VIEW);

  const value = {
    currentView,
    switchToLibrarianView,
    switchToStudentView,
  };

  return (
    <MakingAppContext.Provider value={value}>
      {children}
    </MakingAppContext.Provider>
  );
}

function useMakingAppContext() {
  const context = React.useContext(MakingAppContext);

  if (undefined === context) {
    throw new Error(
      'useMakingAppContext must be within a MakingAppContextProvider'
    );
  }

  return context;
}

export { MakingAppContextProvider, useMakingAppContext };
