import React from 'react';
import classNames from 'classnames/bind';
import { ReactComponent as Grid } from '../assets/grid.svg';
import { ReactComponent as List } from '../assets/list.svg';
import { ReactComponent as Logo } from '../assets/ravn.svg';

import useTaskManager from '../hooks/useTaskManager';

import './Aside.scss';

const Aside = () => {
  const { layout, setLayout } = useTaskManager();

  const handleSubmitGrid = () => {
    setLayout('grid');
  };

  const handleSubmitList = () => {
    setLayout('list');
  };

  return (
    <div className="aside__main">
      <div className="aside__content">
        <Logo className="aside__logo" />
        <button type="button" className={classNames('aside__buttons', { active: layout === 'grid' })} onClick={handleSubmitGrid}>
          <Grid className="aside__button" />
          <div>Dashboard</div>
        </button>
        <button type="button" className={classNames('aside__buttons', { active: layout === 'list' })} onClick={handleSubmitList}>
          <List className="aside__button" />
          <div>My Task</div>
        </button>
      </div>
    </div>
  );
};

export default Aside;
