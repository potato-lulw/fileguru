import { asyncWrapper } from "../utils/asyncWrapper.js";
import sharp from "sharp";
import fs from 'fs-extra';
import { CustomError } from "../utils/customError.js";
import path from 'path';
import mime from "mime-types";

export const listImageFormats = asyncWrapper(async (req, res) => {
    res.json(['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp']);
})


export const convertImage = asyncWrapper(async (req, res) => {
  if (!req.file) throw new CustomError("No file uploaded", 400);

  const inputPath = req.file.path;
  const outputFormat = req.body.format;
  const outputName = `${Date.now()}-converted.${outputFormat}`;

  try {
    res.setHeader("Content-Type", mime.lookup(outputFormat) || "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${outputName}"`);

    // Use a pipeline to ensure async operations are handled sequentially
    const sharpStream = sharp(inputPath).toFormat(outputFormat);

    // Pipe the sharp stream to the response
    sharpStream.pipe(res);

    // Listen for the 'finish' event on the response to delete the file
    res.on('finish', () => {
        console.log(`Successfully sent and cleaned up file: ${inputPath}`);
        fs.remove(inputPath, (err) => {
            if (err) console.error("Error deleting file:", err);
        });
    });

  } catch (err) {
    // Handle errors during sharp processing or file-not-found
    console.error("Sharp processing error:", err);
    fs.remove(inputPath, (deleteErr) => {
      if (deleteErr) console.error("Error deleting file after an error:", deleteErr);
    });

    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to process image" });
    }
  }
});
