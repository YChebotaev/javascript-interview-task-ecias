import mongoose from "mongoose";

export const file = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 255
  },
  fileUrl: String
});
