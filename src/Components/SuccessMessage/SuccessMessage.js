import React, { useState, useEffect } from "react";
import "./SuccessMessage.css";

const SuccessMessage = ({ success, ...props }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setShow(false);
    }, 4000);
    return () => {
      clearTimeout(time);
    };
  }, [show]);

  useEffect(() => {
    setShow(true);
  }, [props.productUploaded, props.imagesUploaded]);

  if (!show) {
    return null;
  }
  return (
    success && (
      <div className="successWrapper">
        <p className="successP">{success}</p>
      </div>
    )
  );
};

export default SuccessMessage;
