import express from 'express';
import path from 'path';
import sharp from 'sharp';
import processImage from '../image_processing/image_processor';
import fs from 'fs';

const router = express.Router();

const assetsDirectory = path.join(__dirname, "..", "assets");
const fullAssetsDirectory = path.join(assetsDirectory, "full");
const thumbDirectory = path.join(assetsDirectory, "thumb");
if (!fs.existsSync(thumbDirectory)) {
  fs.mkdirSync(thumbDirectory);
}

router.get('/images', (req, res): void => {
  const query = req.query;
  const widthExists = query.hasOwnProperty('width');
  const heightExists = query.hasOwnProperty('height')
  console.log(req.query.filename, ", ", req.query.width, ", ", req.query.height);
  if (query) {
    if (query.hasOwnProperty('filename')) {
      const imagePath = path.join(fullAssetsDirectory, `${query.filename}.jpg`);
      if (fs.existsSync(imagePath)) {
        console.log("Image Exists");
        // If image exists, continue to check if width and/or height parameters were supplied
        if (widthExists && heightExists) {
          console.log("Width and Height exist");
          // Check if image has been cached
          // First create cached image path
          const cachedImagePath = path.join(thumbDirectory,
            `${query.filename}_${query.width}x${query.height}.jpg`);
            console.log("Cached image path => ", cachedImagePath);

          if (!fs.existsSync(cachedImagePath)) {
            const info = processImage(imagePath, Number(query.width),
              Number(query.height), cachedImagePath);
            info.then((value: sharp.OutputInfo) => {
              res.sendFile(cachedImagePath);
            });
          } else {
            res.sendFile(cachedImagePath);
          }

        } else {
          if (query.hasOwnProperty('width')) {
            res.send("No height property supplied");
          }

          if (query.hasOwnProperty('height')) {
            res.send("<h1>No width property supplied</h1>");
          }

          res.send("Neither width nor height were set");
        }
      }
    } else {
      res.send("No file name supplied");
    }
  }
  // res.sendFile(__dirname + '/images/icelandwaterfall.jpg');
});

export default router;