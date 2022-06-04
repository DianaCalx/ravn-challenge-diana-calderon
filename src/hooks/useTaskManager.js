import { useContext } from 'react';
import TaskManagerContext from '../context/TaskManagerProvider';

const useTaskManager = () => useContext(TaskManagerContext);

export default useTaskManager;
