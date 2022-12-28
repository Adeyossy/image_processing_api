import path from 'path'
import processImage from '../../image_processing/image_processor'

describe('This suite tests the image processing module', () => {
  it('tests the returned value of the image processing module', async () => {
    const output = await processImage(
      path.join(__dirname, '../../assets/full/icelandwaterfall.jpg'),
      300,
      300,
      path.join(__dirname, '../../assets/thumb/icelandwaterfall_300x300.jpg')
    )
    expect(output).toBeTruthy()
  })
})
