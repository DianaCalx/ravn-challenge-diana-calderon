import React, { useState, useEffect } from 'react';
import { ReactComponent as MoreLess } from '../assets/bell.svg';
import { ReactComponent as Avatar } from '../assets/human.svg';
import useTaskManager from '../hooks/useTaskManager';
import Dropdown from './Dropdown';
import myJson from '../data.json';
import estimates from '../helpers/estimates';
import './Modal.scss';

const Modal = ({ setModal }) => {
  const [mensaje, setMensaje] = useState('');
  const { users, tags, status } = myJson;

  const { saveTask, taskEdit, setTaskEdit } = useTaskManager();

  const [data, setData] = useState({
    name: '',
    estimate: '',
    user: {},
    tags: [],
    status: '',
    dueDate: '',
  });

  useEffect(() => {
    if (Object.keys(taskEdit).length > 0) {
      setData({
        id: taskEdit.id,
        name: taskEdit.name,
        estimate: taskEdit.estimate,
        user: taskEdit.user,
        tags: taskEdit.tags,
        status: taskEdit.status,
        dueDate: taskEdit.dueDate,
      });
    }
  }, []);

  const handleChangedata = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const hideModal = () => {
    setModal(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if ([data.name, data.estimate, data.user, data.tags, data.status, data.dueDate].includes('')) {
      setMensaje('All fields are required');
      setTimeout(() => {
        setMensaje('');
      }, 3000);
      return;
    }

    if (data.id) {
      setTaskEdit({});
    }

    saveTask(data);

    setData({
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
      setData({
        ...data,
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
      const oldtags = data.tags;
      if (e.target.checked) {
        setData({
          ...data,
          tags: [...oldtags, option],
        });
      } else {
        setData({
          ...data,
          tags: oldtags.filter(tags => tags !== option),
        });
      }
    };
    return (
      <div>
        <input id={option} type="checkbox" value={option} onChange={handleClick} checked={data.tags.includes(option)} />
        <label className="checkbox__tags" htmlFor={option}>
          {option}
        </label>
      </div>
    );
  };

  const UserOption = ({ option }) => {
    const handleClick = () => {
      setData({
        ...data,
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
          <input name="name" type="text" placeholder="Task title" className="modal__input" value={data.name} onChange={e => handleChangedata(e)} />
          <div className="modal__options">
            <Dropdown
              options={estimates}
              OptionComponent={EstimateOption}
              trigger={
                <div className="modal__dropdown__trigger">
                  <MoreLess />
                  <span>{estimates.find(estimate => estimate.value === data.estimate)?.name || 'Estimate'}</span>
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
                  <span>{users.find(user => user.id === data.user.id)?.fullName || 'Assignee'}</span>
                </div>
              }
              disabledOption="Assignee To..."
            />
            <Dropdown
              options={tags}
              OptionComponent={tagsOption}
              trigger={
                <div className="modal__dropdown__trigger">
                  <span>{data.tags.includes(tags) || 'Label'}</span>
                </div>
              }
              disabledOption="Tag Title"
            />
            <select className="modal__select" name="status" value={data.status} onChange={e => handleChangedata(e)}>
              <option disabled value="">
                Status
              </option>
              {status.map(st => (
                <option key={st.name} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
            <input className="modal__date" type="date" name="dueDate" value={data.dueDate} onChange={e => handleChangedata(e)} />
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
