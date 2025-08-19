# Arquitetura do Projeto

Este documento descreve a arquitetura do projeto, que é dividido em duas partes principais: um backend desenvolvido em Node.js com Express e um frontend desenvolvido em Angular.

## Visão Geral

O projeto segue uma arquitetura cliente-servidor:

-   **Backend (Servidor)**: Uma API RESTful responsável pela lógica de negócios, interação com o banco de dados e autenticação.
-   **Frontend (Cliente)**: Uma Single-Page Application (SPA) que consome a API do backend e apresenta a interface do usuário.

---

## Backend (Node.js/Express)

O backend é construído com TypeScript e segue uma arquitetura em camadas para uma clara separação de responsabilidades.

### Estrutura de Diretórios

-   `src/`
    -   `config/`: Contém os arquivos de configuração, como a conexão com o banco de dados (`database.ts`).
    -   `controllers/`: Responsáveis por receber as requisições HTTP, validar os dados de entrada e enviar as respostas. Eles orquestram o fluxo de dados, mas não contêm a lógica de negócios.
    -   `interfaces/`: Define os tipos e interfaces TypeScript para os modelos de dados (ex: `IProduct`, `IUser`).
    -   `middleware/`: Contém os middlewares do Express, como autenticação (`authMiddleware.ts`) e upload de arquivos (`upload.ts`).
    -   `routes/`: Define os endpoints da API. Cada arquivo de rota agrupa endpoints relacionados a um recurso específico (ex: `products.ts`, `user.ts`).
    -   `services/`: Contém a lógica de negócios da aplicação. Os serviços são chamados pelos controllers e são responsáveis por interagir com o banco de dados e executar as regras de negócio.
    -   `utils/`: Funções utilitárias que podem ser reutilizadas em diferentes partes da aplicação.
    -   `app.ts`: O arquivo de entrada da aplicação. Ele inicializa o servidor Express, configura os middlewares globais e as rotas principais.

### Principais Dependências

-   **Express**: Framework web para Node.js.
-   **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
-   **MariaDB**: Driver para o banco de dados MariaDB/MySQL.
-   **JSON Web Token (JWT)**: Para autenticação baseada em tokens.
-   **Bcrypt.js**: Para hashing de senhas.
-   **Multer**: Middleware para upload de arquivos.
-   **CORS**: Para habilitar o Cross-Origin Resource Sharing.

---

## Frontend (Angular)

O frontend é uma SPA construída com Angular e TypeScript, seguindo as melhores práticas de organização de código em módulos.

### Estrutura de Diretórios

-   `src/`
    -   `app/`
        -   `pages/`: Contém os módulos de cada página/funcionalidade principal da aplicação (ex: `home`, `products`, `users`). Cada módulo de página tem seus próprios componentes, serviços e rotas.
        -   `services/`: Contém os serviços globais da aplicação, como o serviço de autenticação (`auth.service.ts`).
        -   `shared/`: Contém componentes, diretivas, pipes e módulos que são compartilhados por toda a aplicação.
            -   `components/`: Componentes reutilizáveis (ex: `navbar`, `footer`, `not-found`).
            -   `guards/`: Guardas de rota, como o `auth.guard.ts` para proteger rotas que exigem autenticação.
            -   `shared.module.ts`: O módulo que agrupa e exporta todos os componentes e módulos compartilhados.
        -   `app.module.ts`: O módulo raiz da aplicação.
        -   `app-routing.module.ts`: O módulo de rotas principal, que utiliza lazy loading para carregar os módulos das páginas.
    -   `assets/`: Para arquivos estáticos como imagens e fontes.
    -   `environments/`: Para variáveis de ambiente (ex: URL da API).
    -   `styles.scss`: Estilos globais da aplicação.

### Principais Dependências

-   **Angular**: Framework para construção de SPAs.
-   **RxJS**: Biblioteca para programação reativa.
-   **Axios**: Cliente HTTP para fazer requisições à API do backend.
-   **Bootstrap**: Framework CSS para estilização.
-   **Font Awesome**: Biblioteca de ícones.
-   **ngx-mask**: Para aplicar máscaras em campos de formulário.

---

## Comandos Úteis

### Backend

**Instalar dependências:**
```bash
npm install
```

**Executar em modo de desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Compilar para produção:**
```bash
npm run build
```

**Executar em modo de produção:**
```bash
npm start
```

### Frontend (Angular)

**Instalar dependências:**
```bash
npm install
```

**Executar em modo de desenvolvimento:**
```bash
npm start
```
ou
```bash
ng serve
```

**Compilar para produção:**
```bash
npm run build
```
ou
```bash
ng build
```

**Gerar um novo componente:**
```bash
ng generate component nome-do-componente
```
*Abreviação:*
```bash
ng g c nome-do-componente
```

**Gerar um novo serviço:**
```bash
ng generate service nome-do-servico
```
*Abreviação:*
```bash
ng g s nome-do-servico
```

**Gerar um novo módulo:**
```bash
ng generate module nome-do-modulo
```
*Abreviação:*
```bash
ng g m nome-do-modulo
```

**Gerar um novo guarda de rota:**
```bash
ng generate guard nome-do-guarda
```
*Abreviação:*
```bash
ng g g nome-do-guarda
```
