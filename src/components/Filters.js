import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { splitWords } from '../helpers/splitWords';
import useTaskManager from '../hooks/useTaskManager';
import Dropdown from './Dropdown';
import data from '../data';
import { ReactComponent as Bell } from '../assets/bell.svg';
import { ReactComponent as MoreLess } from '../assets/moreless.svg';
import { ReactComponent as Avatar } from '../assets/human.svg';
import { ReactComponent as Tag } from '../assets/tag.svg';
import { ReactComponent as Search } from '../assets/search.svg';

import './Filters.scss';

const Filters = () => {
  const navigate = useNavigate();
  const { estimates, status, tags } = data;
  const { profile, filters, setFilters, users } = useTaskManager();
  const [dropdownOpen, setDropdownOpen] = useState();

  const handleInputChange = e => {
    if (e.target.value) {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value,
      });
    } else {
      setFilters(undefined);
    }
  };

  const navigateToUser = () => {
    navigate('/settings');
  };

  const assigneeUser = users.find(u => u.id === filters?.assigneeId);
  const assigneeUserFilter = option => users.find(u => u.id === option?.id);

  const EstimateOption = ({ option }) => {
    const { name, value } = option;
    const handleClick = () => {
      setFilters({
        ...filters,
        pointEstimate: value,
      });
    };
    return (
      <div
        className="filter__component"
        role="button"
        onClick={handleClick}
      >
        <MoreLess />
        <span>{name}</span>
      </div>
    );
  };

  const UserOption = ({ option }) => {
    const handleClick = () => {
      setFilters({
        ...filters,
        assigneeId: option.id,
      });
    };
    return (
      <div
        className="filter__component"
        role="button"
        onClick={handleClick}
      >
        {assigneeUserFilter(option).avatar ? (
          <img
            src={assigneeUserFilter(option).avatar}
            alt="Filter user avatar"
            className="user__option__img"
          />
        ) : (
          <div className="user__split__img">{splitWords(assigneeUserFilter(option)?.fullName)} </div>
        )}
        <span>{option.fullName}</span>
      </div>
    );
  };

  const TagsOption = ({ option }) => {
    const handleClick = e => {
      const oldtags = filters?.tags || [];
      if (e.target.checked) {
        setFilters({
          ...filters,
          tags: [...oldtags, option],
        });
      } else {
        setFilters({
          ...filters,
          tags: oldtags.filter(tag => tag !== option),
        });
      }
    };
    return (
      <div>
        <input
          id={`filter-${option}`}
          type="checkbox"
          value={option}
          onChange={handleClick}
          checked={filters?.tags?.includes(option)}
        />
        <label
          className="checkbox__tags"
          htmlFor={`filter-${option}`}
        >
          {option}
        </label>
      </div>
    );
  };

  const handleClear = () => {
    setDropdownOpen(undefined);
    setFilters(undefined);
  };

  return (
    <div className="filters">
      <div className="searchbar">
        <label
          htmlFor="values"
          className="searchbar__label"
        >
          <Search className="searchbar__icon" />
        </label>
        <input
          className="searchbar__input"
          type="text"
          placeholder="Search"
          id="values"
          name="name"
          autoComplete="off"
          value={filters?.name || ''}
          onChange={handleInputChange}
        />
        <Bell className="searchbar__icon" />
        <div
          className="searchbar__logout"
          onClick={navigateToUser}
        >
          {splitWords(profile?.fullName)}
        </div>
      </div>
      <div className="filters__options">
        <div className="filter__estimate">
          <Dropdown
            options={estimates}
            OptionComponent={EstimateOption}
            trigger={
              <div className="filters__dropdown__trigger">
                <MoreLess />
                <span>{estimates.find(estimate => estimate.value === filters?.pointEstimate)?.name || 'Estimate'}</span>
              </div>
            }
            disabledOption="Estimate"
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        </div>
        <div className="filter__user">
          <Dropdown
            options={users}
            OptionComponent={UserOption}
            trigger={
              <div className="filters__dropdown__trigger">
                {assigneeUser?.avatar ? (
                  <img
                    src={assigneeUser.avatar}
                    alt="User avatar"
                    width={20}
                  />
                ) : assigneeUser?.avatar === null ? (
                  <span className="user__split__img">{splitWords(assigneeUser?.fullName)}</span>
                ) : (
                  <Avatar />
                )}
                <span>{assigneeUser?.fullName || 'Assignee'}</span>
              </div>
            }
            disabledOption="Assignee To..."
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        </div>
        <div className="filter__tags">
          <Dropdown
            options={tags}
            OptionComponent={TagsOption}
            trigger={
              <div className="filters__dropdown__trigger">
                {!filters?.tags?.length && <Tag />}
                <span>{(filters?.tags && filters?.tags[0]) || 'Labels'}</span>
              </div>
            }
            disabledOption="Tag Title"
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        </div>
        <select
          className="filter__select"
          name="status"
          value={filters?.status || ''}
          onChange={handleInputChange}
        >
          <option
            disabled
            value=""
          >
            Status
          </option>
          {status.map(sta => (
            <option
              key={sta}
              value={sta}
            >
              {sta}
            </option>
          ))}
        </select>
        <input
          className="filter__date"
          type="date"
          name="dueDate"
          value={filters?.dueDate}
          onChange={handleInputChange}
        />
        <input
          type="button"
          value="Clear filters"
          onClick={handleClear}
          className="filter__clear"
        />
      </div>
    </div>
  );
};

export default Filters;
