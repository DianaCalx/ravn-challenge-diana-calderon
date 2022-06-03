import { createContext, useState, useMemo } from 'react';

const TaskManagerContext = createContext();

const TasKManagerProvider = ({ children }) => {
  const [layout, setLayout] = useState('grid');

  const value = useMemo(
    () => ({
      layout,
      setLayout,
    }),
    [],
  );

  return <TaskManagerContext.Provider value={value}>{children}</TaskManagerContext.Provider>;
};
export { TasKManagerProvider };

export default TaskManagerContext;
