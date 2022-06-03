import { useContext } from 'react';
import TaskManagerContext from '../context/TaskManagerProvider';

const useTaskManager = () => {
  return useContext(TaskManagerContext);
};

export default useTaskManager;
