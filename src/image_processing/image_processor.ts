import sharp from 'sharp';

const processImage = async (
  pathToImage: string,
  width: number,
  height: number,
  pathToImageOutput: string
): Promise<sharp.OutputInfo> => {
  const saveStatus = await sharp(pathToImage)
    .resize(width, height, {
      fit: 'cover',
    })
    .toFile(pathToImageOutput);

  return saveStatus;
};

export default processImage;
