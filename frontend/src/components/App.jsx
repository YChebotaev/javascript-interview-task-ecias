import React, { useState } from "react";
import { AppMenu } from "./AppMenu";
import { ListOfFiles } from "./ListOfFiles";
import { UploadModal } from "./UploadModal";
import "./App.css";

export const App = () => {
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const handleAppMenuUploadClick = () => {
    setUploadModalVisible(true);
  };

  const handleUploadModalCancel = () => {
    setUploadModalVisible(false);
  };

  const handleUploadModalOk = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <AppMenu onUploadClick={handleAppMenuUploadClick} />
      <ListOfFiles />
      <UploadModal
        visible={uploadModalVisible}
        onOk={handleUploadModalOk}
        onCancel={handleUploadModalCancel}
      />
    </div>
  );
};

export default App;
