import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import audioRoutes from './routes/audioRoutes.js'
import imageRoutes from './routes/imageRoutes.js'

const app = express()

app.use(express.json())
dotenv.config()
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
))

app.use('/api/audio', audioRoutes)
app.use('/api/image', imageRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
