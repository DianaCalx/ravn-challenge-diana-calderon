import React from 'react';
import './Modal.scss';

const Modal = ({ setModal }) => {
  const ocultarModal = () => {
    setModal(false);
  };

  return (
    <div className="modal">
      <div className="modal__rec">
        <button onClick={ocultarModal} className="modal__close">
          Cerrar
        </button>
        <button onClick={ocultarModal} className="modal__submit">
          Crear
        </button>
      </div>
    </div>
  );
};

export default Modal;
