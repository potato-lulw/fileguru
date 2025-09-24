import Ffmpeg from "fluent-ffmpeg";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { CustomError } from "../utils/customError.js";
import fs from 'fs-extra';
import path from 'path';

export const listAudioFormats = asyncWrapper( async (req, res) => {
    res.json(['mp3','wav','aac','ogg']);
})

export const convertAudio = asyncWrapper( async (req, res) => {
    if(!req.file) throw new CustomError("No file uploaded", 400);
    const inputPath = req.file.path;
    const outputFormat = req.body.format;
    const outputName = `${Date.now()}-converted.${outputFormat}`;
    const outputPath = path.join('converted', outputName);

    Ffmpeg(inputPath)
        .toFormat(outputFormat)
        .on('end', () => {
            console.log('Conversion completed');
            fs.removeSync(inputPath);
            res.download(outputPath, outputName);
        })
        .on('error', (err) => {
            fs.removeSync(inputPath);
            throw new CustomError(err.message, 500);
        })
        .save(outputPath)
    
})