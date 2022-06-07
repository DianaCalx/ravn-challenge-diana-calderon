import { createContext, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { getProfile, getUsers, getTasks } from '../graphql/queries';
import { createTask, updateTask, deleteTask } from '../graphql/mutations';
import useDebounce from '../hooks/useDebounce';

const TaskManagerContext = createContext();

const TasKManagerProvider = ({ children }) => {
  const [idSelectedEdit, setIdSelectedEdit] = useState('');
  const [layout, setLayout] = useState('grid');
  const [modal, setModal] = useState(false);
  const [filters, setFilters] = useState(undefined);
  const [taskEdit, setTaskEdit] = useState(undefined);

  const { data: profileData, loading: profileLoading, error: profileError } = useQuery(getProfile);
  const { data: usersData, error: usersError } = useQuery(getUsers);
  const {
    data: tasksData,
    loading: tasksLoading,
    error: tasksError,
    refetch,
  } = useQuery(getTasks, {
    variables: {
      filters: {},
    },
  });
  const [createTaskMutation] = useMutation(createTask);
  const [updateTaskMutation] = useMutation(updateTask);
  const [deleteTaskMutation] = useMutation(deleteTask);

  useEffect(() => {
    if (!tasksLoading) {
      debounce();
    }
  }, [filters]);

  useEffect(() => {
    if (profileError || usersError || tasksError) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  }, [profileError, usersError, tasksError]);

  const removeTask = taskId => {
    Swal.fire({
      title: 'Are you sure that you want to delete this task?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: "Don't delete",
    }).then(async result => {
      if (result.isConfirmed) {
        await deleteTaskMutation({
          variables: {
            task: {
              id: taskId,
            },
          },
        });
        Swal.fire('Deleted', '', 'success');
        getFilteredTask();
      } else if (result.isDenied) {
        Swal.fire('Task was not deleted');
      }
    });
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
    getFilteredTask();
    setModal(false);
  };

  const getFilteredTask = () => {
    if (!filters) {
      refetch({
        filters: {},
      });
    } else {
      refetch({
        filters,
      });
    }
  };

  const debounce = useDebounce(getFilteredTask);

  return (
    <TaskManagerContext.Provider
      value={{
        profile: profileData?.profile,
        users: usersData?.users || [],
        tasks: tasksData?.tasks || [],
        profileLoading,
        idSelectedEdit,
        layout,
        modal,
        filters,
        taskEdit,
        removeTask,
        saveTask,
        setIdSelectedEdit,
        setLayout,
        setModal,
        setFilters,
        setTaskEdit,
        refetch,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};
export { TasKManagerProvider };

export default TaskManagerContext;
