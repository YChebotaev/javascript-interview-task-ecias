import React, { useState } from "react";
import { List, Button } from "antd";
import axios from "axios";

export const FileListItem = ({ _id, title, description, fileUrl }) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [removed, setRemoved] = useState(false);

  error && console.error(error);

  const handleDownloadFile = () => {
    window.open(`${process.env.REACT_APP_ENDPOINT_BASE}${fileUrl}`, "_blank");
  };

  const handleRemoveFile = async () => {
    setPending(true);
    setError(null);
    try {
      await axios.delete(`${process.env.REACT_APP_ENDPOINT_BASE}/files/${_id}`);
      setRemoved(true);
    } catch (error) {
      setError(error);
    } finally {
      setPending(false);
    }
  };

  if (removed) {
    return null;
  }

  return (
    <List.Item key={_id}>
      <List.Item.Meta title={title} description={description} />
      <Button type="danger" loading={pending} onClick={handleRemoveFile}>
        Remove
      </Button>
      <Button onClick={handleDownloadFile}>Download</Button>
    </List.Item>
  );
};
