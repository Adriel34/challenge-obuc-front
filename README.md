# Task Management

Este projeto é a interface para uma aplicação de gerenciamento de tarefas, utilizando o React.

Novas features:

Criação de usuario: Foram implementadas telas de login e direcionamento das tarefas por usuario
Visualização em Kanban : Visualização de tasks por kamban em colunas.

Adicionar categoria de uma tarefa : Possibilitar criação de categorias para as tasks.

Possibilitar adição de mais de uma categoria para uma task.

Filtrar tarefa por categorias: foi implemdado um filtro para filtrar tasks por categorias

Esconder tarefas antigas : por padrao não é exibido taferas realizadas a mais de 30 dias, adicionei o botão para exibir.




## Requisitos

- Node.js v21.6.1

## Configuração do Ambiente

Certifique-se de configurar as variáveis de ambiente no arquivo `.env` antes de iniciar o projeto. As variáveis necessárias são:

```
VITE_HOSTNAME_BACKEND
```

## Instalação e Uso

### 1. Instale as Dependências

```sh
npm install
```

### 2. Configure as Variáveis de Ambiente

Crie um arquivo `.env` com as variáveis descritas anteriormente.

### 3. Inicie a aplicação

```sh
npm run dev
```

## Scripts Disponíveis

- **dev**: Inicia a aplicação em modo de desenvolvimento usando o Vite.
- **build**: Gera a versão otimizada de produção da aplicação com o Vite.
- **lint**: Executa o ESLint para verificar o código em busca de erros e problemas de formatação.
- **preview**: Inicia uma prévia local da versão de produção gerada com o Vite.

## Dependências

- **axios**
- **prop-types**
- **react-icons**
- **react**
- **react-dom**

### Dependências de Desenvolvimento

- **eslint**
- **vite**
- **globals**

