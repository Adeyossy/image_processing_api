import express from 'express'
import path from 'path'
import sharp from 'sharp'
import processImage from '../image_processing/image_processor'
import fs from 'fs'

const router = express.Router()

const assetsDirectory = path.join(__dirname, '..', 'assets')
const fullAssetsDirectory = path.join(assetsDirectory, 'full')
const thumbDirectory = path.join(assetsDirectory, 'thumb')
if (!fs.existsSync(thumbDirectory)) {
  fs.mkdirSync(thumbDirectory)
}

router.get('/images', (req, res): void => {
  const query = req.query
  const widthExists = Object.prototype.hasOwnProperty.call(query, 'width')
  const heightExists = Object.prototype.hasOwnProperty.call(query, 'height')

  if (Object.prototype.hasOwnProperty.call(query, 'filename')) {
    const imagePath = path.join(
      fullAssetsDirectory,
      `${query.filename as string}.jpg`
    )
    if (fs.existsSync(imagePath)) {
      // If image exists, continue to check if width and/or height parameters were supplied
      if (widthExists && heightExists) {
        // Check if image has been cached
        // First create cached image path
        const cachedImagePath = path.join(
          thumbDirectory,
          `${query.filename as string}_${query.width as string}x${
            query.height as string
          }.jpg`
        )

        if (!fs.existsSync(cachedImagePath)) {
          const info = processImage(
            imagePath,
            Number(query.width),
            Number(query.height),
            cachedImagePath
          )
          info
            .then((value: sharp.OutputInfo) => {
              res.sendFile(cachedImagePath)
            })
            .catch((error: Error) => {
              res.send(error.message)
            })
        } else {
          res.sendFile(cachedImagePath)
        }
      } else {
        if (widthExists) {
          res.send('No height property supplied')
        }

        if (heightExists) {
          res.send('<h1>No width property supplied</h1>')
        }

        res.send('Neither width nor height were set')
      }
    }
  } else {
    res.send('No file name supplied')
  }
  // res.sendFile(__dirname + '/images/icelandwaterfall.jpg');
})

export default router
