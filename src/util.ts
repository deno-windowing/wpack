export async function readN(
  r: Deno.Reader,
  n: number,
): Promise<Uint8Array | null> {
  const buf = new Uint8Array(n);
  let nRead = 0;
  while (nRead < n) {
    nRead += await r.read(buf.subarray(nRead)) ?? NaN;
  }
  return isNaN(nRead) ? null : buf;
}

export async function writeAll(
  w: Deno.Writer,
  buf: ArrayBufferView,
): Promise<void> {
  const bytes = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  let nWritten = 0;
  while (nWritten < bytes.byteLength) {
    nWritten += await w.write(bytes.subarray(nWritten));
  }
}

export function view(buf: ArrayBufferView) {
  return new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
}
