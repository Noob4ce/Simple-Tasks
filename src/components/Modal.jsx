import "../style/Modal.scss";
import ReactDOM from "react-dom";

export default function Modal({ children, handleClose }) {
  return ReactDOM.createPortal(
    <div className="container-fluid backdrop">
      <div className="content ">
        <div className="row ">
          <button
            onClick={() => handleClose(false)}
            className="btn-close me-5"
          ></button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
