import React from 'react';
import { useNavigate } from 'react-router-dom';
import { splitWords } from '../helpers/splitWords';
import useTaskManager from '../hooks/useTaskManager';
import { ReactComponent as Search } from '../assets/search.svg';
import { ReactComponent as Bell } from '../assets/bell.svg';
import myJson from '../data.json';

import './SearchBar.scss';

const SearchBar = () => {
  const navigate = useNavigate();
  const { user } = myJson;
  const { searchText, setSearchText } = useTaskManager();

  const handleInputChange = e => {
    setSearchText(e.target.value);
  };

  const navigateToUser = () => {
    navigate('/settings');
  };

  return (
    <div className="searchbar">
      <label htmlFor="values" className="searchbar__label">
        <Search className="searchbar__icon" />
      </label>
      <input className="searchbar__input" type="text" placeholder="Search" id="values" name="values" value={searchText} onChange={handleInputChange} />
      <Bell className="searchbar__icon" />
      <div className="searchbar__logout" onClick={navigateToUser}>
        {splitWords(user.fullName)}
      </div>
    </div>
  );
};

export default SearchBar;
