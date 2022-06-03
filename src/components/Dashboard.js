import React from 'react';
import SearchBar from './SearchBar';
import Aside from './Aside';
import ViewGridList from './ViewGridList';
import useTaskManager from '../hooks/useTaskManager';

import './Dashboard.scss';

const Dashboard = () => {
  const { layout } = useTaskManager();
  return (
    <div className="dashboard">
      <Aside />
      <div className="dashboard__content">
        <SearchBar />
        <ViewGridList />
        {layout === 'grid' && <div className="dashboard__grid">Grid</div>}
        {layout === 'list' && <div className="dashboard__list">List</div>}
      </div>
    </div>
  );
};

export default Dashboard;
