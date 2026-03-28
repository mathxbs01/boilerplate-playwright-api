import { readFileSync } from 'fs';
import path from 'path';

export function lerArquivoJson<TBody>(caminhoArquivo: string): TBody {
  const filePath = path.resolve(__dirname, caminhoArquivo);
  const rawData = readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(rawData);

  return jsonData;
}
