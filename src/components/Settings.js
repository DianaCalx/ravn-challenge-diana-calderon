import React from 'react';
import { splitWords } from '../helpers/splitWords';
import { getDate } from '../helpers/getAllAboutDate';
import './Settings.scss';

const Settings = () => {
  const user = {
    fullName: 'Diana Calderon',
    email: 'calderon.calx@gmail.com',
    type: 'CANDIDATE',
    createdAt: '2022-03-08T16:04:54.553Z',
    updatedAt: '2022-06-01T20:18:40.041Z',
  };

  return (
    <div className="settings">
      <div className="settings__card">
        <div className="settings__itials">{splitWords(user.fullName)}</div>
        <p className="settings__fullName settings__data">{user.fullName}</p>
        <p className="settings__type">{user.type}</p>
        <p className="settings__data">{user.email}</p>
        <p className="settings__data">
          Created at:
          <span>{getDate(user.createdAt)}</span>
        </p>
        <p className="settings__data">
          Updated at:
          <span>{getDate(user.updatedAt)}</span>
        </p>
      </div>
    </div>
  );
};

export default Settings;
