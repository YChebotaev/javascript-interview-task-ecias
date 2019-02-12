import React, { useState, useEffect } from "react";
import { ErrorAlert } from "./ErrorAlert";
import axios from "axios";
import { FileListItem } from "./FileListItem";

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

  const renderFile = props => <FileListItem {...props} key={props._id} />;

  return (
    <div className="ListOfFiles">
      <ErrorAlert error={error} onClose={handleErrorAlertClose} />
      {files.map(renderFile)}
    </div>
  );
};
