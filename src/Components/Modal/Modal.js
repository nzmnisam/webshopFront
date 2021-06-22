import React from "react";
import "./Modal.css";

const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return [
    <div className="modalOverlay" onClick={() => toggleModal()} key={1} />,
    <div className="modalWrap" key={2}>
      <div className="modal">
        <div class="row">
          <div class="column">{children[0]}</div>
          <div class="column upload">{children[1]}</div>
        </div>
        {/* {children} */}
      </div>
    </div>,
  ];
};

export default Modal;
