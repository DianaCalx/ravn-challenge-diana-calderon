import React, { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Filters from './Filters';
import Aside from './Aside';
import ViewGridList from './ViewGridList';
import TasksDescription from './TasksDescription';
import Card from './Card';
import useTaskManager from '../hooks/useTaskManager';
import data from '../data';

import './Dashboard.scss';

const Dashboard = () => {
  const { status } = data;
  const { layout, setIdSelectedEdit, tasks } = useTaskManager();

  useEffect(() => {
    window.addEventListener('click', e => {
      if (e.target.classList.contains('card__ellipsis')) {
        setIdSelectedEdit(e.target.id);
      } else {
        setIdSelectedEdit('');
      }
    });
    return () => window.removeEventListener('click', () => {});
  }, []);

  const Panel = ({ sta }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Collapsible
        open
        onTriggerOpening={() => setIsOpen(true)}
        onTriggerClosing={() => setIsOpen(false)}
        trigger={
          <Header
            isOpen={isOpen}
            name={
              <div>
                {`${sta} `}
                <span>({tasks.filter(task => task.status === sta).length})</span>
              </div>
            }
          />
        }
      >
        {tasks
          .filter(task => task.status === sta)
          .map(task => (
            <Card
              key={`task-${task.id}`}
              task={task}
              layout={layout}
            />
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
        <Filters />
        <ViewGridList />
        {layout === 'grid' && (
          <div className="dashboard__main">
            <div className="dashboard__columns">
              {status.map(sta => (
                <div
                  key={`grid-${sta}`}
                  className="dashboard__column"
                >
                  <h2>
                    {`${sta} `}
                    <span>({tasks.filter(task => task.status === sta).length})</span>
                  </h2>
                  {tasks
                    .filter(task => task.status === sta)
                    .map(task => (
                      <Card
                        key={`task-${task.id}`}
                        task={task}
                        layout={layout}
                      />
                    ))}
                </div>
              ))}
            </div>
            {!tasks.length && <div className="no__result">There are no tasks</div>}
          </div>
        )}
        {layout === 'list' && (
          <>
            <TasksDescription />
            <div className="dashboard__main__list">
              <div className="dashboard__lists">
                {status.map(sta => (
                  <div
                    key={`list-${sta}`}
                    className="dashboard__list"
                  >
                    <Panel sta={sta} />
                  </div>
                ))}
              </div>
              {!tasks.length && <div className="no__result">There are no tasks</div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
