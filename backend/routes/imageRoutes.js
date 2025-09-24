import express from 'express';
import { convertImage, listImageFormats } from '../controllers/imageController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({dest: 'uploads/'});

router.get('/formats', listImageFormats)
router.post('/convert', upload.single('image'), convertImage)
export default router;