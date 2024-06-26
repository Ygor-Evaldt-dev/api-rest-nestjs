# API REST - Lista de tarefas
![Versão](https://img.shields.io/badge/Versão-1.0.0-blue?style=flat-square)

## Apresentação
Esta é uma API REST de lista de tarefas com autenticação de usuário. <br>
Construída para servir aplicações web onde um usuário pode descrever e salvar as tarefas que deseja realizar e sinalizar as tarefas que já concluiu.

### Tecnologias utilizadas
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) ![Postgres](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-1572B6?style=flat-square&logo=axios&logoColor=white) ![JSON Web Token](https://img.shields.io/badge/JSON%20Web%20Token-000000?style=flat-square&logo=json-web-tokens&logoColor=white) ![Bcrypt](https://img.shields.io/badge/Bcrypt-435363?style=flat-square&logo=npm&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![Compose](https://img.shields.io/badge/Compose-1A1A1A?style=flat-square&logo=docker&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black) ![Class Validator](https://img.shields.io/badge/Class%20Validator-CC6699?style=flat-square) ![Class Transform](https://img.shields.io/badge/Class%20Transform-007ACC?style=flat-square)

## Instalação

### Pré requisítos
- Nodejs v18.20.3 ou superior
- CLI do NestJS globalmente instalada
- Docker v26.1.4 ou superior
- Docker Compose v2.27.0 ou superior
- Git v2.39.2 ou superior

### Clonagem do repositório
- ![HTTPS](https://img.shields.io/badge/HTTPS-green?style=flat-square)
    ```bash
    https://github.com/Ygor-Evaldt-dev/api-rest-nestjs.git
    ```
- ![SSH](https://img.shields.io/badge/SSH-green?style=flat-square)
    ```bash
    git@github.com:Ygor-Evaldt-dev/api-rest-nestjs.git
    ```
Também é possível baixar o arquivo .zip do projeto clicando no botão '<> Code' acima da listagem de arquivos do projeto e selecionando a opção 'Download ZIP'

### Executando projeto localmente
Em seu computador, abra o diretório do projeto no terminal e execute o seguinte comando para baixar as dependências.
```bash
npm install
```

Após baixar as dependências, você deve ser capaz de executar o projeto localmente executando um dos comando abaixo.
```bash
# desenvolvimento
$ npm run start

# modo observação
$ npm run start:dev

# modo produção
$ npm run start:prod
```

### Conferindo se tudo deu certo
- Acesse [http://localhost:3000/swagger](http://localhost:3000/swagger) para acessar a documentação do webservice.
- Acesse [http://localhost:8081](http://localhost:8081) para acessar o pgAdmin com as credenciais definidas no arquivo '.env'

### .env
É necessário criar um arquivo .env na raiz do projeto seguindo o modelo abaixo:
```bash
#Local development
PORT=3000
BASE_URL=http://localhost:${PORT}

# Token
TOKEN_SECRET=token_secret
TOKEN_TIME=1d

# Database
## Environment variables declared in this file are automatically made available to Prisma.
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=db_name
POSTGRES_USER=db_user
POSTGRES_PASSWORD=db_password

PGADMIN_DEFAULT_EMAIL=email@email.com
PGADMIN_DEFAULT_PASSWORD=password

## Url
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

## Como utilizar
É preciso cadastrar um usuário para utilização dos serviços autenticados.

### Criando um usuário
- Acesse [http://localhost:3000/swagger](http://localhost:3000/swagger)
- Navegue até a sessão 'Usuário' e encontre o serviço 'Cadastrar usuário'.
- Após concluír o cadastro de usuário, utilize as credenciais para obter um token de autenticação válido.

### Autenticação
- Navegue até a sessão 'Autenticação' e encontre o serviço 'Autenticar'
- Clique em 'Try it out', preencha o 'request body' com as credêndiais do usuario cadastrado e clique em 'Execute'
- Copie o token de autenticação, navegue até o inicio da página do swagger, clique no botão 'Authorize' e cole o token no campo de entrada.
- Feito todos os passos descritos acima, os serviços autenticados estarão disponíveis para útilização

## Serviços disponíveis

### Públicos
- **Autenticar**: Serviço para autenticar usuários.
- **Cadastrar usuário**: Permite registrar um novo usuário.

### Protegidos

#### Usuário
- **Atualizar usuário**: Permite atualizar informações do usuário.
- **Excluir usuário**: Permite excluir um usuário.

#### Tarefa
- **Cadastrar tarefa**: Permite adicionar uma nova tarefa.
- **Buscar tarefas**: Recupera a lista de todas as tarefas disponíveis.
- **Filtrar tarefas**: Permite filtrar tarefas com base em parametros específicos.
- **Atualizar tarefa**: Permite modificar informações de uma tarefa existente.
- **Excluir tarefa**: Permite excluir uma tarefa.

## Licença

- [GNU GENERAL PUBLIC LICENSE](https://github.com/Ygor-Evaldt-dev/api-com-express/tree/master?tab=GPL-3.0-1-ov-file)
