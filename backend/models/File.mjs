import mongoose from "mongoose";
import { file } from "../schemas/file";

export const File = mongoose.model("File", file);
