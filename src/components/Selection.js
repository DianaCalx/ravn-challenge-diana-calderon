import React from 'react';
import useTaskManager from '../hooks/useTaskManager';
import { ReactComponent as Pencil } from '../assets/pencil.svg';
import { ReactComponent as Trash } from '../assets/trashCan.svg';
import './Selection.scss';

const Selection = ({ task, setSelection }) => {
  const { setTaskEdit, setModal, setDel, handleEliminar, layout } = useTaskManager();
  const handleClick = () => {
    setTaskEdit(task);
    setModal(true);
    setSelection(false);
  };

  const handleDelete = () => {
    setDel(task);
    handleEliminar(task);
  };

  return (
    <>
      {layout === 'grid' && (
        <div className="selection">
          <button type="button" onClick={() => handleClick()} className="selection__button">
            <Pencil />
            <p>Edit</p>
          </button>
          <button type="button" onClick={() => handleDelete()} className="selection__button">
            <Trash />
            <p>Delete</p>
          </button>
        </div>
      )}

      {layout === 'list' && (
        <div className="selection__list">
          <button type="button" onClick={() => handleClick()} className="selection__button">
            <Pencil />
            <p>Edit</p>
          </button>
          <button type="button" onClick={() => handleDelete()} className="selection__button">
            <Trash className="selection__delete" />
            <p>Delete</p>
          </button>
        </div>
      )}
    </>
  );
};

export default Selection;
