import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const images = path.join(__dirname, '..', 'public', 'images')

function isBg(r, g, b) {
  return r > 232 && g > 232 && b > 232
}

async function removeWhiteBgFlood(inputName, outputName) {
  const input = path.join(images, inputName)
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height } = info
  const visited = new Uint8Array(width * height)
  const stack = []

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const idx = y * width + x
    if (visited[idx]) return
    const i = idx * 4
    if (!isBg(data[i], data[i + 1], data[i + 2])) return
    visited[idx] = 1
    stack.push(idx)
  }

  // Seed from edges only so white clothes/shoes stay opaque
  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }

  while (stack.length) {
    const idx = stack.pop()
    const x = idx % width
    const y = (idx / width) | 0
    const i = idx * 4
    data[i + 3] = 0
    push(x + 1, y)
    push(x - 1, y)
    push(x, y + 1)
    push(x, y - 1)
  }

  // Soft fringe: lower alpha for near-white pixels adjacent to transparent
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x
      const i = idx * 4
      if (data[i + 3] === 0) continue
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      if (r < 210 || g < 210 || b < 210) continue
      let nearClear = false
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        if (data[((y + dy) * width + (x + dx)) * 4 + 3] === 0) {
          nearClear = true
          break
        }
      }
      if (nearClear) {
        const whiteness = Math.min(r, g, b)
        data[i + 3] = Math.max(0, Math.round(((255 - whiteness) / 45) * 255))
      }
    }
  }

  await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .png()
    .toFile(path.join(images, outputName))

  console.log(`OK ${outputName}`)
}

await removeWhiteBgFlood('john.jpg', 'jhon.png')
await removeWhiteBgFlood('teo.jpg', 'teo.png')
