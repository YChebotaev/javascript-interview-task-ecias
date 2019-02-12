import React from "react";
import { Alert } from "antd";

export const ErrorAlert = ({ onClose, error }) => {
  if (error) {
    return (
      <Alert>
        message={error.stack}
        type="error" closable onClose={onClose}
      </Alert>
    );
  }
  return null;
};
