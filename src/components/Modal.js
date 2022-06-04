import React, { useState } from 'react';
import { ReactComponent as MoreLess } from '../assets/bell.svg';
import { ReactComponent as Avatar } from '../assets/human.svg';
import Dropdown from './Dropdown';
import myJson from '../data.json';
import './Modal.scss';

const Modal = ({ setModal }) => {
  const [mensaje, setMensaje] = useState('');
  const { estimates, users, tags, status } = myJson;

  const [data, setData] = useState({
    name: '',
    estimate: '',
    user: {},
    label: [],
    status: '',
    due_date: '',
  });

  const handleChangedata = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if ([data.name, data.estimate, data.user, data.label, data.status, data.due_date].includes('')) {
      setMensaje('All fields are required');
      setTimeout(() => {
        setMensaje('');
      }, 3000);
      return;
    }
    console.log('Saving data');

    setData({
      name: '',
      estimate: '',
      user: '',
      label: '',
      status: '',
      due_date: '',
    });
    setModal(false);
  };

  const hideModal = () => {
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

  const LabelOption = ({ option }) => {
    const handleClick = e => {
      const oldtags = data.label;
      if (e.target.checked) {
        setData({
          ...data,
          label: [...oldtags, option],
        });
      } else {
        setData({
          ...data,
          label: oldtags.filter(label => label !== option),
        });
      }
    };
    return (
      <div>
        <input id={option} type="checkbox" value={option} onChange={handleClick} checked={data.label.includes(option)} />
        <label className="checkbox__label" htmlFor={option}>
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
      <form className="modal__form" onSubmit={handleSubmit}>
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
              OptionComponent={LabelOption}
              trigger={
                <div className="modal__dropdown__trigger">
                  <span>{data.label.includes(tags) || 'Label'}</span>
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
            <input className="modal__date" type="date" name="due_date" value={data.due_date} onChange={e => handleChangedata(e)} />
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
