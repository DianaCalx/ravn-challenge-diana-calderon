import { createContext, useState } from 'react';

const TaskManagerContext = createContext();

const TasKManagerProvider = ({ children }) => {
  const [layout, setLayout] = useState('grid');
  const [searchText, setSearchText] = useState('');
  const [modal, setModal] = useState(false);

  return (
    <TaskManagerContext.Provider
      value={{
        layout,
        setLayout,
        searchText,
        setSearchText,
        modal,
        setModal,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};
export { TasKManagerProvider };

export default TaskManagerContext;
