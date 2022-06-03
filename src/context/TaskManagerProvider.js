import { createContext, useState } from 'react';

const TaskManagerContext = createContext();

const TasKManagerProvider = ({ children }) => {
  const [layout, setLayout] = useState('grid');
  const [searchText, setSearchText] = useState('');

  return (
    <TaskManagerContext.Provider
      value={{
        layout,
        setLayout,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};
export { TasKManagerProvider };

export default TaskManagerContext;
