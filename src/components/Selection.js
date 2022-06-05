import React from 'react';
import classNames from 'classnames';
import useTaskManager from '../hooks/useTaskManager';
import { ReactComponent as Pencil } from '../assets/pencil.svg';
import { ReactComponent as Trash } from '../assets/trashCan.svg';
import './Selection.scss';

const Selection = ({ task, setSelection }) => {
  const { setTaskEdit, setModal, deleteTask, layout } = useTaskManager();
  const handleEdit = () => {
    setTaskEdit(task);
    setModal(true);
    setSelection(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className={classNames({ selection: layout === 'grid', selection__list: layout === 'list' })}>
      <button type="button" onClick={handleEdit} className="selection__button">
        <Pencil className="selection__delete" />
        <p>Edit</p>
      </button>
      <button type="button" onClick={handleDelete} className="selection__button">
        <Trash className="selection__delete" />
        <p>Delete</p>
      </button>
    </div>
  );
};

export default Selection;
