// src/utils/imageConverter.ts

/**
 * Converte um buffer de imagem para uma string no formato Data URI (Base64).
 * @param buffer O buffer do arquivo de imagem.
 * @param mimeType O tipo MIME da imagem (ex: 'image/jpeg', 'image/png').
 * @returns A string completa em Base64 pronta para ser usada ou salva.
 */
export const bufferToBase64 = (buffer: Buffer, mimeType: string): string => {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
};