import express from 'express';
const app = express();

app.get('/', (req, res): void => {
  // console.log('req => ', req.params);
  res.send('Hello Heavenly Apps');
});

app.get('/pictures', (req, res): void => {
  res.sendFile(__dirname + '/../images/icelandwaterfall.jpg');
}); 

app.listen(3000, (): void => {
  console.log('Now listening on port 3000');
});