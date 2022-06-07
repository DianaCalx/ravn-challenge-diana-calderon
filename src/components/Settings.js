import React from 'react';
import { splitWords } from '../helpers/splitWords';
import { getDate } from '../helpers/getAllAboutDate';
import useTaskManager from '../hooks/useTaskManager';
import Spinner from './Spinner';
import './Settings.scss';

const Settings = () => {
  const { profile, profileLoading } = useTaskManager();

  if (profileLoading) return <Spinner />;

  const { avatar, fullName, type, email, createdAt, updatedAt } = profile;

  return (
    <div className="settings">
      <div className="settings__card">
        {avatar ? (
          <img
            alt="User avatar"
            src={avatar}
          />
        ) : (
          <div className="settings__itials">{splitWords(fullName)}</div>
        )}
        <p className="settings__fullName settings__data">{fullName}</p>
        <p className="settings__type">{type}</p>
        <p className="settings__data">{email}</p>
        <p className="settings__data">
          Created at:
          <span> {getDate(createdAt)}</span>
        </p>
        <p className="settings__data">
          Updated at:
          <span> {getDate(updatedAt)}</span>
        </p>
      </div>
    </div>
  );
};

export default Settings;
