AngularNodeHub 🚀
<p align="center">
<img src="https://skillicons.dev/icons?i=angular,nodejs,express,ts,mysql,bootstrap,sass,git&perline=8" alt="Tecnologias do Projeto" />
</p>

📖 Sobre o Projeto
AngularNodeHub é um sistema de gerenciamento full-stack desenvolvido como uma demonstração de habilidades em desenvolvimento web moderno. O projeto inclui um frontend reativo construído com Angular e um backend robusto com Node.js e Express, seguindo as melhores práticas de desenvolvimento, como autenticação via JWT e uma arquitetura de serviços bem definida.

A aplicação permite o gerenciamento completo de produtos e usuários, incluindo operações de CRUD (Criar, Ler, Atualizar, Deletar), upload de imagens e um sistema de autenticação seguro.

✨ Funcionalidades Principais
Frontend (Angular)
🔐 Autênticação de Usuário: Sistema completo com telas de Login e Registro.

🛡️ Rotas Protegidas: Utilização de AuthGuard para proteger o acesso a áreas restritas.

📦 Gerenciamento de Produtos:

Listagem completa de produtos.

Criação e Edição com formulários reativos e validação em tempo real.

Upload de imagens (JPG/PNG) com pré-visualização.

Exclusão com modal de confirmação.

Visualização de detalhes do produto em uma modal.

👥 Gerenciamento de Usuários:

Listagem de todos os usuários cadastrados.

Edição de dados do usuário.

Exclusão com modal de confirmação.

💅 UI Moderna: Interface limpa e responsiva construída com Bootstrap e ícones do Font Awesome.

Backend (Node.js / Express)
🌐 API RESTful: Endpoints bem definidos para todas as operações de CRUD.

🔑 Autênticação com JWT: Geração de token no login e verificação via middleware em rotas protegidas.

🔒 Segurança de Senhas: Armazenamento seguro de senhas usando bcryptjs para hashing.

🖼️ Upload de Arquivos: Manipulação de uploads de imagem com multer, com conversão para Base64.

🐘 Banco de Dados MariaDB: Integração e persistência de dados.

🛠️ Arquitetura de Serviços: Lógica de negócio separada dos controllers para melhor organização e manutenção.

🛠️ Tecnologias Utilizadas
<p align="center">
<a href="https://skillicons.dev">
<img src="https://skillicons.dev/icons?i=angular,ts,html,sass,bootstrap,nodejs,express,mysql,git,github,vscode,postman,npm" />
</a>
</p>

🏛️ Arquitetura do Projeto
Visão Geral
O projeto segue uma arquitetura cliente-servidor:

Backend (Servidor): Uma API RESTful responsável pela lógica de negócios, interação com o banco de dados e autenticação.

Frontend (Cliente): Uma Single-Page Application (SPA) que consome a API do backend e apresenta a interface do usuário.

Backend (Node.js/Express) <img src="https://skillicons.dev/icons?i=nodejs,express,ts" height="25" alt="nodejs, express, typescript"/>
O backend é construído com TypeScript e segue uma arquitetura em camadas para uma clara separação de responsabilidades.

Estrutura de Diretórios
src/

config/: Contém os arquivos de configuração, como a conexão com o banco de dados (database.ts).

controllers/: Responsáveis por receber as requisições HTTP e validar os dados de entrada.

interfaces/: Define os tipos e interfaces TypeScript para os modelos de dados.

middleware/: Contém middlewares do Express, como autenticação e upload de arquivos.

routes/: Define os endpoints da API para cada recurso.

services/: Contém a lógica de negócios da aplicação, interagindo com o banco de dados.

utils/: Funções utilitárias reutilizáveis.

app.ts: Arquivo de entrada que inicializa o servidor Express.

Principais Dependências
Express: Framework web para Node.js.

TypeScript: Superset do JavaScript que adiciona tipagem estática.

MariaDB: Driver para o banco de dados MariaDB/MySQL.

JSON Web Token (JWT): Para autenticação baseada em tokens.

Bcrypt.js: Para hashing de senhas.

Multer: Middleware para upload de arquivos.

CORS: Para habilitar o Cross-Origin Resource Sharing.

Frontend (Angular) <img src="https://skillicons.dev/icons?i=angular,ts" height="25" alt="angular, typescript"/>
O frontend é uma SPA construída com Angular e TypeScript, seguindo as melhores práticas de organização de código em módulos.

Estrutura de Diretórios
src/

app/

pages/: Módulos de cada funcionalidade principal da aplicação (home, products, etc.).

services/: Serviços globais, como o de autenticação.

shared/: Componentes, diretivas, pipes e módulos compartilhados por toda a aplicação.

guards/: Guardas de rota para proteger rotas que exigem autenticação.

app.module.ts: O módulo raiz da aplicação.

app-routing.module.ts: Módulo de rotas principal, que utiliza lazy loading.

assets/: Arquivos estáticos como imagens e fontes.

environments/: Variáveis de ambiente.

Principais Dependências
Angular: Framework para construção de SPAs.

RxJS: Biblioteca para programação reativa.

Axios: Cliente HTTP para fazer requisições à API.

Bootstrap: Framework CSS para estilização.

Font Awesome: Biblioteca de ícones.

ngx-mask: Para aplicar máscaras em campos de formulário.

💾 Configuração do Banco de Dados
Antes de executar o backend, você precisa criar o banco de dados e as tabelas. Use os seguintes comandos SQL no seu cliente MariaDB/MySQL.

SQL

-- 1. Crie o banco de dados
CREATE DATABASE AngularNodeHub;

-- 2. Selecione o banco de dados recém-criado
USE AngularNodeHub;

-- 3. Crie a tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crie a tabela de produtos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(15, 2) NOT NULL,
    img_base64 LONGTEXT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
🚀 Como Executar o Projeto (Comandos Úteis)
Backend
Instalar dependências:

Bash

npm install
Executar em modo de desenvolvimento (com auto-reload):

Bash

npm run dev
Compilar para produção:

Bash

npm run build
Executar em modo de produção:

Bash

npm start
Frontend (Angular)
Instalar dependências:

Bash

npm install
Executar em modo de desenvolvimento:

Bash

npm start
ou

Bash

ng serve
Compilar para produção:

Bash

npm run build
ou

Bash

ng build
