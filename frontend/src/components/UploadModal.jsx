import React, { useState } from "react";
import { ErrorAlert } from "./ErrorAlert";
import { Modal, Form, Input, Upload, Button } from "antd";
import { last, get } from "lodash";
import axios from "axios";
import { identity } from "lodash";

export const UploadModal = Form.create({ name: "upload" })(
  ({ visible, onCancel, onOk, form, form: { getFieldDecorator } }) => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    const disabled = pending || Boolean(error);

    const collectData = () => ({
      title: form.getFieldValue("title"),
      description: form.getFieldValue("description"),
      fileUrl: get(last(form.getFieldValue("file")), "response.url")
    });

    const handleModalOk = async () => {
      setPending(true);
      setError(null);

      const data = collectData();

      try {
        await axios.post(`${process.env.REACT_APP_ENDPOINT_BASE}/files`, data);
        onOk();
      } catch (error) {
        setError(error);
      } finally {
        setPending(false);
      }
    };

    const isOkButtonDisabled = () => {
      const data = collectData();
      const errors = form.getFieldsError();
      // 1. Данные пусты
      const dataIsEmpty = ![data.title, data.fileUrl].every(identity);
      // 2. В данных есть ошибки
      let dataHasErrors = false;
      for (let value of Object.values(errors)) {
        if (value) {
          dataHasErrors = true;
          break;
        }
      }
      return [dataIsEmpty, dataHasErrors].some(identity);
    };

    const handleErrorAlertClose = () => {
      setError(null);
    };

    return (
      <Modal
        title="Upload file"
        visible={visible}
        okText="Upload"
        onOk={handleModalOk}
        okButtonProps={{ disabled: isOkButtonDisabled() }}
        onCancel={onCancel}
      >
        <Form layout="vertical">
          <ErrorAlert error={error} onClose={handleErrorAlertClose} />
          <Form.Item label="Document title">
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Title is required field"
                },
                {
                  max: 100,
                  message: "100 is maximum title length"
                }
              ]
            })(<Input disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="General description">
            {getFieldDecorator("description", {
              rules: [
                {
                  max: 255,
                  message: "255 is maximum description length"
                }
              ]
            })(<Input disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="PDF to upload">
            {getFieldDecorator("file", {
              valuePropName: "fileList",
              getValueFromEvent: e => e && e.fileList
            })(
              <Upload
                name="file"
                accept=".pdf"
                action={`${process.env.REACT_APP_ENDPOINT_BASE}/upload`}
              >
                <Button icon="upload" disabled={disabled}>
                  Click to upload
                </Button>
              </Upload>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
