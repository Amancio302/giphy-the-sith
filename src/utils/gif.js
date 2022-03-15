export function parseGif (gifImage) {
  let gif
  if (!gifImage) gif = {}
  else gif = gifImage
  const res = {
    id: gif.id || '',
    url: gif.url || '',
    type: gif.type,
    title: gif.title
  }
  return res
}