import React from "react";
import { Button } from "antd";
import "./AppMenu.css";

export const AppMenu = ({ onUploadClick }) => {
  return (
    <div className="AppMenu">
      <Button type="primary" icon="upload" onClick={onUploadClick}>
        Upload
      </Button>
    </div>
  );
};
