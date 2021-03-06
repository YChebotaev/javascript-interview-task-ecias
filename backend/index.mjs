import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import body from "body-parser";
import { File } from "./models/File";

mongoose.connect("mongodb://localhost:27017/javascript_interview_task");

const port = 3001;
const app = express();

app.options("/upload", cors());

app.post(
  "/upload",
  cors(),
  fileUpload({
    useTempFiles: true,
    abortOnLimit: true,
    tempFileDir: `${process.cwd()}/upload`,
    limits: {
      files: 1,
      fileSize: 1e7
    }
  }),
  function(req, res) {
    const { file } = req.files;
    const fileName = file.name;
    file.mv(`${process.cwd()}/uploads/${fileName}`, error => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).json({
          url: `/uploads/${fileName}`
        });
      }
    });
  }
);

app.use("/uploads/", express.static(`${process.cwd()}/uploads/`));

app.options("/files", cors());

app.post("/files", cors(), body.json(), async function(req, res) {
  try {
    const file = new File(req.body);
    await file.save();
    res.json(file);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/files", cors(), async function(req, res) {
  const files = await File.find({});
  res.json(files);
});

app.options("/files/:fileId", cors());

app.delete("/files/:fileId", cors(), async function(req, res) {
  const { fileId } = req.params;
  await File.deleteOne({
    _id: mongoose.Types.ObjectId.createFromHexString(fileId)
  });
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log("App listening at port %s", port);
});
