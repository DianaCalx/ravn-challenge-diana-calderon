import React from 'react';
import { useQuery } from '@apollo/client';
import { splitWords } from '../helpers/splitWords';
import { getDate } from '../helpers/getAllAboutDate';
import { getProfile } from '../graphql/queries';
import './Settings.scss';

const Settings = () => {
  const { data, loading, error } = useQuery(getProfile);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error</div>;
  }

  const { avatar, fullName, type, email, createdAt, updatedAt } = data.profile;

  return (
    <div className="settings">
      <div className="settings__card">
        {avatar ? <img alt="User avatar" src={avatar} /> : <div className="settings__itials">{splitWords(fullName)}</div>}
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
