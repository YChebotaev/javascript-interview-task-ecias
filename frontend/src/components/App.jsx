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

  return (
    <div className="App">
      <AppMenu onUploadClick={handleAppMenuUploadClick} />
      <ListOfFiles />
      <UploadModal
        visible={uploadModalVisible}
        onCancel={handleUploadModalCancel}
      />
    </div>
  );
};

export default App;
