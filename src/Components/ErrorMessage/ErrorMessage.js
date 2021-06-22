import React, { useState, useEffect } from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ errors, ...props }) => {
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
  }, [errors]);

  if (!show) {
    return null;
  }
  return (
    errors.length > 0 && (
      <ul className="errorList">
        {errors.map((error, index) => {
          return (
            <li className="errorListItem" key={index}>
              {error}
            </li>
          );
        })}
      </ul>
    )
  );
};

export default ErrorMessage;
