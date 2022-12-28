# Image Processing API
This repository hosts the Image Processing API project for the Udacity Full Stack Web Developer Nanodegree

## Project Structure
- Source code is stored in 'src' folder
- Compiled code can be found in the build folder
- Tests can be found in the 'tests' folder in 'src' folder
- Original pictures can be found in 'src/assets/full'
- Resized pictures can be found in 'src/assets/thumb'

## Testing the API
The route to test is '/api/images' with appropriate queries set:
- filename: name of the image on file
- width: width of the image
- height: height of the image

## Scripts
npm start - starts the development server
npm run build - builds the project
npm run test - builds the project then runs tests
npm run prettier - formats source code
npm run lint - runs eslint