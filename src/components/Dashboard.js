import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import Aside from './Aside';
import ViewGridList from './ViewGridList';
import Card from './Card';
import useTaskManager from '../hooks/useTaskManager';
import myJson from '../data.json';

import './Dashboard.scss';

const Dashboard = () => {
  const { status, tasks } = myJson;
  const { layout } = useTaskManager();

  const Panel = ({ sta }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Collapsible open onTriggerOpening={() => setIsOpen(true)} onTriggerClosing={() => setIsOpen(false)} trigger={<Header isOpen={isOpen} name={<div>{sta.name}</div>} />}>
        {tasks
          .filter(task => task.status === sta.name)
          .map(task => (
            <Card key={`task-${task.id}`} task={task} layout={layout} />
          ))}
      </Collapsible>
    );
  };

  const Header = ({ isOpen, name }) => (
    <div className="dashboard__header">
      {!isOpen ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} />}
      <span>{name}</span>
    </div>
  );

  return (
    <div className="dashboard">
      <Aside />
      <div className="dashboard__content">
        <SearchBar />
        <ViewGridList />
        {layout === 'grid' && (
          <div className="dashboard__main">
            <div className="dashboard__columns">
              {status.map((sta, index) => (
                <div key={`status -${index}`} className="dashboard__column">
                  <h2>{sta.name}</h2>
                  {tasks
                    .filter(task => task.status === sta.name)
                    .map(task => (
                      <Card key={`task-${task.id}`} task={task} layout={layout} />
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}
        {layout === 'list' && (
          <div className="dashboard__main__list">
            <div className="dashboard__lists">
              {status.map((sta, index) => (
                <div key={index} className="dashboard__list">
                  <Panel sta={sta} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
