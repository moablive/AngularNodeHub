# Arquitetura do Projeto

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,ts,angular,mariadb,mysql" />
  </a>
</p>

Este documento descreve a arquitetura do projeto, que é dividido em duas partes principais: um backend desenvolvido em Node.js com Express e um frontend desenvolvido em Angular.

## Visão Geral

O projeto segue uma arquitetura cliente-servidor:

-   **Backend (Servidor)**: Uma API RESTful responsável pela lógica de negócios, interação com o banco de dados e autenticação.
-   **Frontend (Cliente)**: Uma Single-Page Application (SPA) que consome a API do backend e apresenta a interface do usuário.

---

## Backend (Node.js/Express) <img src="https://skillicons.dev/icons?i=nodejs,express,ts" height="25" alt="nodejs, express, typescript"/>

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

-   **Express**: <img src="https://skillicons.dev/icons?i=express" height="20" alt="express"/> Framework web para Node.js.
-   **TypeScript**: <img src="https://skillicons.dev/icons?i=ts" height="20" alt="typescript"/> Superset do JavaScript que adiciona tipagem estática.
-   **MariaDB**: <img src="https://skillicons.dev/icons?i=mariadb" height="20" alt="mariadb"/> Driver para o banco de dados MariaDB/MySQL.
-   **JSON Web Token (JWT)**: Para autenticação baseada em tokens.
-   **Bcrypt.js**: Para hashing de senhas.
-   **Multer**: Middleware para upload de arquivos.
-   **CORS**: Para habilitar o Cross-Origin Resource Sharing.

---

## Frontend (Angular) <img src="https://skillicons.dev/icons?i=angular,ts" height="25" alt="angular, typescript"/>

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

-   **Angular**: <img src="https://skillicons.dev/icons?i=angular" height="20" alt="angular"/> Framework para construção de SPAs.
-   **RxJS**: <img src="https://skillicons.dev/icons?i=rxjs" height="20" alt="rxjs"/> Biblioteca para programação reativa.
-   **Axios**: <img src="https://skillicons.dev/icons?i=axios" height="20" alt="axios"/> Cliente HTTP para fazer requisições à API do backend.
-   **Bootstrap**: <img src="https://skillicons.dev/icons?i=bootstrap" height="20" alt="bootstrap"/> Framework CSS para estilização.
-   **Font Awesome**: <img src="https://skillicons.dev/icons?i=fontawesome" height="20" alt="fontawesome"/> Biblioteca de ícones.
-   **ngx-mask**: Para aplicar máscaras em campos de formulário.

---

## Comandos Úteis <img src="https://skillicons.dev/icons?i=bash" height="25" alt="bash"/>

### Backend

**Instalar dependências:**
```bash
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
Gerar um novo componente:

Bash

ng generate component nome-do-componente
Abreviação:

Bash

ng g c nome-do-componente
Gerar um novo serviço:

Bash

ng generate service nome-do-servico
Abreviação:

Bash

ng g s nome-do-servico
Gerar um novo módulo:

Bash

ng generate module nome-do-modulo
Abreviação:

Bash

ng g m nome-do-modulo
Gerar um novo guarda de rota:

Bash

ng generate guard nome-do-guarda
Abreviação:

Bash

ng g g nome-do-guarda
