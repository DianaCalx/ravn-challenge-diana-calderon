import { createContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getProfile, getUsers, getTasks } from '../graphql/queries';
import { createTask, updateTask, deleteTask } from '../graphql/mutations';

const TaskManagerContext = createContext();

const TasKManagerProvider = ({ children }) => {
  const [idSelectedEdit, setIdSelectedEdit] = useState('');
  const [layout, setLayout] = useState('grid');
  const [modal, setModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [taskEdit, setTaskEdit] = useState(undefined);

  const { data: profileData, loading: profileLoading, error: profileError } = useQuery(getProfile);
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(getUsers);
  const {
    data: tasksData,
    loading: tasksLoading,
    error: taskError,
    refetch,
  } = useQuery(getTasks, {
    variables: {
      filters: {},
    },
  });

  const deleteTask = taskId => {
    const confirmar = window.confirm('Are you sure that you want to delete this task?');

    if (confirmar) {
      console.log('Deleted');
    }
    refetch();
  };

  const saveTask = task => {
    if (task.id) {
      console.log('Task updated');
    } else {
      console.log('Task created');
    }
    refetch();
  };

  return (
    <TaskManagerContext.Provider
      value={{
        profile: profileData?.profile,
        users: usersData?.users || [],
        tasks: tasksData?.tasks || [],
        idSelectedEdit,
        layout,
        modal,
        searchText,
        taskEdit,
        deleteTask,
        saveTask,
        setIdSelectedEdit,
        setLayout,
        setModal,
        setSearchText,
        setTaskEdit,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};
export { TasKManagerProvider };

export default TaskManagerContext;
