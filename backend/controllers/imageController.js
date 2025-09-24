import { asyncWrapper } from "../utils/asyncWrapper.js";
import sharp from "sharp";
import fs from 'fs-extra';
import { CustomError } from "../utils/customError.js";
import path from 'path';

export const listImageFormats = asyncWrapper( async (req, res) => {
    req.json(['jpg','jpeg','png', 'gif', 'bmp', 'tiff', 'webp']);
})

export const convertImage = asyncWrapper( async (req, res) => {
    if(!req.file) throw new CustomError("No file uploaded", 400);
    const inputPath = req.file.path;
    const outputFormat = req.body.format;
    const outputName = `${Date.now()}-converted.${outputFormat}`;
    const outputPath = path.join('converted', outputName);

    sharp(inputPath)
        .toFormat(outputFormat)
        .toFile(outputPath)
        .then(() => {
            console.log('Conversion completed to ', outputFormat);
            fs.removeSync(inputPath);
            res.download(outputPath, outputName)
        })
        .catch(err => {
            fs.removeSync(inputPath);
            throw new CustomError(err.message, 500);
        })
})