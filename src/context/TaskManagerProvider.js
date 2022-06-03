import { createContext, useState } from 'react';

const TaskManagerContext = createContext();

const TasKManagerProvider = ({ children }) => {
  const [layout, setLayout] = useState('grid');

  return (
    <TaskManagerContext.Provider
      value={{
        layout,
        setLayout,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};
export { TasKManagerProvider };

export default TaskManagerContext;
