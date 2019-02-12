import React, { useState, useEffect } from "react";
import { List, Button } from "antd";
import { ErrorAlert } from "./ErrorAlert";
import axios from "axios";

export const ListOfFiles = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    setError(null);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_BASE}/files`
      );
      setFiles(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleErrorAlertClose = () => {
    setError(null);
  };

  const renderFile = ({ _id, title, description, fileUrl }) => {
    const handleDownloadFile = () => {
      window.open(`${process.env.REACT_APP_ENDPOINT_BASE}${fileUrl}`, "_blank");
    };

    return (
      <List.Item key={_id}>
        <List.Item.Meta title={title} description={description} />
        <Button onClick={handleDownloadFile}>Download</Button>
      </List.Item>
    );
  };

  return (
    <div className="ListOfFiles">
      <ErrorAlert error={error} onClose={handleErrorAlertClose} />
      {files.map(renderFile)}
    </div>
  );
};
