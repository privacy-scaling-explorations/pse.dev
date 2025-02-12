/**
 * A simple fallback for zlib-sync's mask function.
 * This implementation uses a basic XOR on the buffer.
 */
export const mask = (source: any, mask: any, output: any, offset: any) => {
  offset = offset || 0
  const length = source.length
  // Allocate an output buffer if not provided.
  if (!output || output.length < length) {
    output = Buffer.allocUnsafe(length)
  }
  for (let i = 0; i < length; i++) {
    output[i] = source[i] ^ mask[(i + offset) % mask.length]
  }
  return output
}
