import React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onBackdropClose, children }) => {
  return ReactDOM.createPortal(
    <Overlay onClick={e => onBackdropClose(e)}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>,
    modalRoot
  );
};


Modal.propTypes = {
  onBackdropClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};