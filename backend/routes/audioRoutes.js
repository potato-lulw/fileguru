import express from 'express'
import {listAudioFormats, convertAudio} from '../controllers/audioController.js'
import multer from 'multer';

const router = express.Router();

const upload = multer({
    dest: 'uploads/'
})

router.get('/formats', listAudioFormats)
router.post('/convert', upload.single('audio'), convertAudio)

export default router;
