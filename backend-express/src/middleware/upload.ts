// src/middleware/upload.ts

import multer from 'multer';

// Configura o Multer para armazenar o arquivo em memória (como um Buffer)
const storage = multer.memoryStorage();

// Cria a instância do Multer com a configuração de armazenamento
const upload = multer({ storage: storage });

export default upload;