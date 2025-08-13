import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

// Roteador principal da API
import mainApiRouter from './routes/router';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('API CRUD de Produtos (TypeScript) está no ar!');
});

// O roteador prefixo /api
app.use('/api', mainApiRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});