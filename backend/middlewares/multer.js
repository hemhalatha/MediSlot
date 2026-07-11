import multer from 'multer'
import path from 'node:path'
import crypto from 'node:crypto'

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    const extension = path.extname(file.originalname).toLowerCase()
    const filename = `${Date.now()}-${crypto.randomUUID()}${extension}`
    callback(null, filename)
  }
})

const fileFilter = (req, file, callback) => {
  if (!allowedImageTypes.has(file.mimetype)) {
    return callback(new Error('Only JPEG, PNG, and WebP images are allowed'))
  }

  callback(null, true)
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
})

export default upload
