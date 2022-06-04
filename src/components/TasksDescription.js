import React from 'react';
import './TasksDescription.scss';

const TasksDescription = () => (
  <div className="tasks__description__list">
    <p className="tasks__tname"># Task Name</p>
    <p className="tasks__tags">Task Tags</p>
    <p className="tasks__testimage">Estimate</p>
    <p className="tasks__tassing">Task Assign Name</p>
    <p className="tasks__tdate">Due Date</p>
  </div>
);

export default TasksDescription;
