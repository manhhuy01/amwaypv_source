import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
  display: ${props => props.isOpen ? 'unset' : 'none'};
`

const Modal = ({ isOpen, children, onClose, title }) => (
  <ModalContainer isOpen={isOpen} onClick={onClose} className="modal">
    <div className="modal-body" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">{title}</div>
      <div className="modal-content">{children}</div>
    </div>
  </ModalContainer>
)

export default Modal;