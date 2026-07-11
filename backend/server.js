import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'

const app = express()
const port = process.env.PORT || 4000
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim()).filter(Boolean)
  : []

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Origin is not allowed by CORS'))
  },
  credentials: true
}))

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.json({ success: true, message: 'MediSlot API is running' })
})

app.get('/health', (req, res) => {
  const isDatabaseConnected = mongoose.connection.readyState === 1

  res.status(isDatabaseConnected ? 200 : 503).json({
    success: isDatabaseConnected,
    service: 'medislot-api',
    database: isDatabaseConnected ? 'connected' : 'unavailable'
  })
})

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on PORT:${port}`))
