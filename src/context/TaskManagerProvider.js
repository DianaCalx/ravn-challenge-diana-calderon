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
  const [createTaskMutation] = useMutation(createTask);
  const [updateTaskMutation] = useMutation(updateTask);
  const [deleteTaskMutation] = useMutation(deleteTask);

  const removeTask = async taskId => {
    const confirm = window.confirm('Are you sure that you want to delete this task?');

    if (confirm) {
      await deleteTaskMutation({
        variables: {
          task: {
            id: taskId,
          },
        },
      });
    }
    refetch();
  };

  const saveTask = async task => {
    if (task.id) {
      await updateTaskMutation({
        variables: {
          task,
        },
      });
      setTaskEdit(undefined);
    } else {
      await createTaskMutation({
        variables: {
          task,
        },
      });
    }
    refetch();
    setModal(false);
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
        removeTask,
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
