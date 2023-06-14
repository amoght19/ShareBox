import express from "express";
import cors from "cors";
import { DBConnection } from "./database/db.js";
import { upload } from "./utils/upload.js";
import { File } from "./models/file.js";

const app = express();
app.use(cors());
const PORT = 8000;
DBConnection();

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileObj = {
      path: req.file.path,
      name: `${Date.now()}-${req.file.originalname}`,
    };

    const file = await File.create(fileObj);
    res.status(200).json({ path: `/file/${file._id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/file/:fileID", async (req, res) => {
  try {
    const file = await File.findById(req.params.fileID);
    file.downloadContent++;

    await file.save();
    res.download(file.path, file.name);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
