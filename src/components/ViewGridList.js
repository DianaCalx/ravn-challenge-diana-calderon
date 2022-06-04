import React from 'react';
import classNames from 'classnames/bind';
import useTaskManager from '../hooks/useTaskManager';
import Modal from './Modal';
import { ReactComponent as Grid } from '../assets/grid.svg';
import { ReactComponent as List } from '../assets/list.svg';
import { ReactComponent as Plus } from '../assets/plus.svg';

import './ViewGridList.scss';

const ViewGridList = () => {
  const { layout, setLayout, modal, setModal } = useTaskManager();

  const handleSubmitGrid = () => {
    setLayout('grid');
  };

  const handleSubmitList = () => {
    setLayout('list');
  };

  const handleNewTask = () => {
    setModal(true);
  };

  return (
    <div className="view__flex">
      <div className="view__mode">
        <button type="button" className={classNames('view__button', { active: layout === 'list' })} onClick={() => handleSubmitList()}>
          <List className="view__icon view__icon-bar" />
        </button>
        <button type="button" className={classNames('view__button', { active: layout === 'grid' })} onClick={() => handleSubmitGrid()}>
          <Grid className="view__icon" />
        </button>
      </div>
      <button type="button" className="view__button-plus" onClick={handleNewTask}>
        <Plus className="view__icon" />
      </button>

      {modal && <Modal setModal={setModal} />}
    </div>
  );
};

export default ViewGridList;
