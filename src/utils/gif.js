export function parseGif (gifImage, selector = 'original') {
  let gif
  if (!gifImage || !gifImage.images || !gifImage.images[selector]) gif = {}
  else gif = gifImage.images[selector]
  const res = {
    id: gifImage ? gifImage.id : undefined,
    src: gif.url || '',
    height: `${gif.height}px` || '',
    width: `${gif.width}px` || ''
  }
  return res
}