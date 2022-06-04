import { createContext, useState } from 'react';

const TaskManagerContext = createContext();

const TasKManagerProvider = ({ children }) => {
  const [layout, setLayout] = useState('grid');
  const [searchText, setSearchText] = useState('');
  const [modal, setModal] = useState(false);
  const [idSelectedEdit, setIdSelectedEdit] = useState('');
  const [taskEdit, setTaskEdit] = useState({});
  const [del, setDel] = useState({});

  const handleEliminar = del => {
    const confirmar = window.confirm('¿Deseas eliminar este cliente?');

    if (confirmar) {
      console.log('Eliminado');
    }
    setDel(undefined);
  };

  const saveTask = task => {
    if (task.id) {
      console.log('Guardar tarea editada');
    } else {
      console.log('Guardar tarea neava');
    }
  };

  return (
    <TaskManagerContext.Provider
      value={{
        layout,
        setLayout,
        searchText,
        setSearchText,
        modal,
        setModal,
        idSelectedEdit,
        setIdSelectedEdit,
        del,
        setDel,
        handleEliminar,
        saveTask,
        taskEdit,
        setTaskEdit,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};
export { TasKManagerProvider };

export default TaskManagerContext;
