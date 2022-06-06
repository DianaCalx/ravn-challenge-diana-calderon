import React, { useState, useEffect } from 'react';
import { ReactComponent as MoreLess } from '../assets/moreless.svg';
import { ReactComponent as Tag } from '../assets/tag.svg';
import { splitWords } from '../helpers/splitWords';
import useTaskManager from '../hooks/useTaskManager';
import Dropdown from './Dropdown';
import data from '../data';
import './Modal.scss';

const Modal = () => {
  const [error, setError] = useState('');
  const { estimates, status, tags } = data;
  const [dropdownOpen, setDropdownOpen] = useState('');
  const { users, saveTask, taskEdit, setTaskEdit, setModal } = useTaskManager();

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
        dueDate: taskEdit.dueDate.split('T')[0],
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
    setTaskEdit(undefined);
    setModal(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if ([task.name, task.pointEstimate, task.assigneeId, task.status, task.dueDate].includes('') || !task.tags.length) {
      setError('All fields are required');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    setTask({
      name: '',
      pointEstimate: '',
      assigneeId: '',
      tags: [],
      status: '',
      dueDate: '',
    });

    saveTask(task);
  };

  const EstimateOption = ({ option }) => {
    const { name, value } = option;
    const handleClick = () => {
      setTask({
        ...task,
        pointEstimate: value,
      });
    };
    return (
      <div
        className="modal__component"
        role="button"
        onClick={handleClick}
      >
        <MoreLess />
        <span>{name}</span>
      </div>
    );
  };

  const UserOption = ({ option }) => {
    const handleClick = () => {
      setTask({
        ...task,
        assigneeId: option.id,
      });
    };
    return (
      <div
        className="modal__component"
        role="button"
        onClick={handleClick}
      >
        {option.avatar ? (
          <img
            className="modal__dropdown__avatar"
            alt="User avatar"
            src={option.avatar}
          />
        ) : (
          <div className="modal__dropdown__avatar without__avatar">{splitWords(option?.fullName)}</div>
        )}
        <span>{option?.fullName}</span>
      </div>
    );
  };

  const TagsOption = ({ option }) => {
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
        <input
          id={option}
          type="checkbox"
          value={option}
          onChange={handleClick}
          checked={task.tags.includes(option)}
        />
        <label
          className="checkbox__tags"
          htmlFor={option}
        >
          {option}
        </label>
      </div>
    );
  };

  const assigneeUser = users.find(user => user.id === task.assigneeId);

  return (
    <div className="modal">
      <form
        className="modal__form"
        onSubmit={handleSubmit}
      >
        <div className="modal__rec">
          <input
            name="name"
            type="text"
            placeholder="Task title"
            className="modal__input"
            value={task.name}
            onChange={handleChange}
          />
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
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
            />
            <Dropdown
              options={users}
              OptionComponent={UserOption}
              trigger={
                <div className="modal__dropdown__trigger">
                  {assigneeUser?.avatar ? (
                    <img
                      className="modal__dropdown__avatar"
                      alt="User avatar"
                      src={assigneeUser.avatar}
                    />
                  ) : (
                    <div className="modal__dropdown__avatar without__avatar">{splitWords(assigneeUser?.fullName)}</div>
                  )}
                  <span>{assigneeUser?.fullName || 'Assignee'}</span>
                </div>
              }
              disabledOption="Assignee To..."
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
            />
            <Dropdown
              options={tags}
              OptionComponent={TagsOption}
              trigger={
                <div className="modal__dropdown__trigger">
                  {!task.tags.length && <Tag />}
                  <span>{task.tags[0] || 'Labels'}</span>
                </div>
              }
              disabledOption="Tag Title"
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
            />
            <select
              className="modal__select"
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option
                disabled
                value=""
              >
                Status
              </option>
              {status.map(sta => (
                <option
                  key={sta}
                  value={sta}
                >
                  {sta}
                </option>
              ))}
            </select>
            <input
              className="modal__date"
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="modal__buttons">
            <button
              type="button"
              onClick={hideModal}
              className="modal__close"
            >
              Cancel
            </button>
            <input
              type="submit"
              value={task.id ? 'Update' : 'Create'}
              className="modal__submit"
            />
          </div>
        </div>
        {error ? <div className="modal__error">{error}</div> : null}
      </form>
    </div>
  );
};

export default Modal;
