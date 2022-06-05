import React, { useState, useEffect } from 'react';
import { ReactComponent as MoreLess } from '../assets/bell.svg';
import { ReactComponent as Avatar } from '../assets/human.svg';
import useTaskManager from '../hooks/useTaskManager';
import Dropdown from './Dropdown';
import data from '../data';
import './Modal.scss';

const Modal = ({ setModal }) => {
  const [mensaje, setMensaje] = useState('');
  const { estimates, status, tags } = data;

  const { users, saveTask, taskEdit, setTaskEdit } = useTaskManager();

  const [task, setTask] = useState({
    name: '',
    pointEstimate: '',
    assigneeId: '',
    tags: [],
    status: '',
    dueDate: '',
  });

  useEffect(() => {
    if (taskEdit) {
      setTask({
        id: taskEdit.id,
        name: taskEdit.name,
        pointEstimate: taskEdit.pointEstimate,
        assigneeId: taskEdit.assignee.id,
        tags: taskEdit.tags,
        status: taskEdit.status,
        dueDate: taskEdit.dueDate,
      });
    }
  }, []);

  const handleChange = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const hideModal = () => {
    setModal(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if ([task.name, task.estimate, task.user, task.tags, task.status, task.dueDate].includes('')) {
      setMensaje('All fields are required');
      setTimeout(() => {
        setMensaje('');
      }, 3000);
      return;
    }

    if (task.id) {
      setTaskEdit(undefined);
    }

    saveTask(task);

    setTask({
      name: '',
      estimate: '',
      user: '',
      tags: '',
      status: '',
      dueDate: '',
    });
    setModal(false);
  };

  const EstimateOption = ({ option }) => {
    const { name, value } = option;
    const handleClick = () => {
      setTask({
        ...task,
        estimate: value,
      });
    };
    return (
      <div className="modal__component" role="button" onClick={handleClick}>
        <MoreLess />
        <span>{name}</span>
      </div>
    );
  };

  const tagsOption = ({ option }) => {
    const handleClick = e => {
      const oldtags = task.tags;
      if (e.target.checked) {
        setTask({
          ...task,
          tags: [...oldtags, option],
        });
      } else {
        setTask({
          ...task,
          tags: oldtags.filter(tag => tag !== option),
        });
      }
    };
    return (
      <div>
        <input id={option} type="checkbox" value={option} onChange={handleClick} checked={task.tags.includes(option)} />
        <label className="checkbox__tags" htmlFor={option}>
          {option}
        </label>
      </div>
    );
  };

  const UserOption = ({ option }) => {
    const handleClick = () => {
      setTask({
        ...task,
        user: option,
      });
    };
    return (
      <div className="modal__component" role="button" onClick={handleClick}>
        <Avatar />
        <span>{option.fullName}</span>
      </div>
    );
  };

  return (
    <div className="modal">
      <form className="modal__form" onSubmit={e => handleSubmit(e)}>
        <div className="modal__rec">
          <input name="name" type="text" placeholder="Task title" className="modal__input" value={task.name} onChange={handleChange} />
          <div className="modal__options">
            <Dropdown
              options={estimates}
              OptionComponent={EstimateOption}
              trigger={
                <div className="modal__dropdown__trigger">
                  <MoreLess />
                  <span>{estimates.find(estimate => estimate.value === task.pointEstimate)?.name || 'Estimate'}</span>
                </div>
              }
              disabledOption="Estimate"
            />
            <Dropdown
              options={users}
              OptionComponent={UserOption}
              trigger={
                <div className="modal__dropdown__trigger">
                  <Avatar />
                  <span>{users.find(user => user.id === task.assigneeId)?.fullName || 'Assignee'}</span>
                </div>
              }
              disabledOption="Assignee To..."
            />
            <Dropdown
              options={tags}
              OptionComponent={tagsOption}
              trigger={
                <div className="modal__dropdown__trigger">
                  <span>{task.tags.includes(tags) || 'Labels'}</span>
                </div>
              }
              disabledOption="Tag Title"
            />
            <select className="modal__select" name="status" value={task.status} onChange={handleChange}>
              <option disabled value="">
                Status
              </option>
              {status.map(sta => (
                <option key={sta} value={sta}>
                  {sta}
                </option>
              ))}
            </select>
            <input className="modal__date" type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
          </div>
          <div className="modal__buttons">
            <button type="button" onClick={hideModal} className="modal__close">
              Cancel
            </button>
            <input type="submit" value="Create" className="modal__submit" />
          </div>
        </div>
        {mensaje ? <div className="modal__error">{mensaje}</div> : null}
      </form>
    </div>
  );
};

export default Modal;
