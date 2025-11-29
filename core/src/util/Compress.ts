import { brotliCompress, brotliDecompress } from 'zlib';
import { promisify } from 'util';

const brotliCompressAsync = promisify(brotliCompress);
const brotliDecompressAsync = promisify(brotliDecompress);

export class Compress {
    async compress(str: string): Promise<string> {
        const compressed = await brotliCompressAsync(str)
        return compressed.toString('base64');
    }

    async decompress(base64: string): Promise<string> {
        const decompressed = await brotliDecompressAsync(Buffer.from(base64, 'base64'))
        return decompressed.toString();
    }
}