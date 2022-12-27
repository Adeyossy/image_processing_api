import express from 'express';
import processImage from './image_processing/image_processor';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import router from './routes/routes'

const app = express();

app.get('/', (req, res): void => {
  // console.log('req => ', req.params);
  res.send('Hello Heavenly Apps');
});

app.use('/api', router);

app.listen(3000, (): void => {
  console.log('Now listening on port 3000');
});