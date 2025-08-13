# AngularNodeHub 🚀

<p align="center">
  <img src="https://skillicons.dev/icons?i=angular,nodejs,express,ts,mysql,bootstrap,sass,git&perline=8" alt="Tecnologias" />
</p>

## 📖 Sobre o Projeto

**AngularNodeHub** é um sistema de gerenciamento full-stack desenvolvido como uma demonstração de habilidades em desenvolvimento web moderno. O projeto inclui um frontend reativo construído com **Angular** e um backend robusto com **Node.js e Express**, seguindo as melhores práticas de desenvolvimento, como autenticação via JWT e uma arquitetura de serviços bem definida.

A aplicação permite o gerenciamento completo de produtos e usuários, incluindo operações de CRUD (Criar, Ler, Atualizar, Deletar), upload de imagens e um sistema de autenticação seguro.

---

## ✨ Funcionalidades Principais

### Frontend (Angular)
* 🔐 **Autenticação de Usuário**: Sistema completo com telas de Login e Registro.
* 🛡️ **Rotas Protegidas**: Utilização de `AuthGuard` para proteger o acesso a áreas restritas.
* 📦 **Gerenciamento de Produtos**:
    * Listagem completa de produtos.
    * Criação e Edição com formulários reativos e validação em tempo real.
    * Upload de imagens (JPG/PNG) com pré-visualização.
    * Exclusão com modal de confirmação.
    * Visualização de detalhes do produto em uma modal.
* 👥 **Gerenciamento de Usuários**:
    * Listagem de todos os usuários cadastrados.
    * Edição de dados do usuário.
    * Exclusão com modal de confirmação.
* 💅 **UI Moderna**: Interface limpa e responsiva construída com Bootstrap e ícones do Font Awesome.

### Backend (Node.js / Express)
* 🌐 **API RESTful**: Endpoints bem definidos para todas as operações de CRUD.
* 🔑 **Autenticação com JWT**: Geração de token no login e verificação via middleware em rotas protegidas.
* 🔒 **Segurança de Senhas**: Armazenamento seguro de senhas usando `bcryptjs` para hashing.
* 🖼️ **Upload de Arquivos**: Manipulação de uploads de imagem com `multer`, com conversão para Base64.
* 🐘 **Banco de Dados MariaDB**: Integração e persistência de dados.
* 🛠️ **Arquitetura de Serviços**: Lógica de negócio separada dos controllers para melhor organização e manutenção.

---

## 🛠️ Tecnologias Utilizadas

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=angular,ts,html,sass,bootstrap,nodejs,express,mysql,git,github,vscode,postman,npm" />
  </a>
</p>

---

## 💾 Configuração do Banco de Dados

Antes de executar o backend, você precisa criar o banco de dados e as tabelas. Use os seguintes comandos SQL no seu cliente MariaDB/MySQL.

```sql
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
    preco DECIMAL(15, 2) NOT NULL, -- Ajustado para maior capacidade
    img_base64 LONGTEXT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);