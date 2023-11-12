# Transactions Challenger

Aplicação backend com NodeJS que armazena dados de transações financeiras de entrada e saída, que permite que o usuário possa registrar e fazer a listagem de suas próprias transações.


## Sobre o Projeto
Este projeto foi proposto como desafio do Ignite, programa de especialização em programação da **Rocketseat**.
Utilizei conceitos de **Clean Architecture** e **DDD**, **Inversão de dependências** e **Design Patterns** (Como InMemoryPattern).

## Rodando o servidor
Para poder rodar o servidor, é necessário possuir o [node]('https://nodejs.org/en') e o [docker]('https://www.docker.com/') instalados em seu sistema

### Banco de Dados
A aplicação foi desenvolvida utilizando banco de dados PostgreSQL. <br />
Utilize o comando abaixo para realizar a instalação do container Docker contendo a imagem da Bitname do PostgreSQL.
```bash
docker compose up -d
```

### Rodando o servidor HTTP
Utilizando o pnpm (<i>Node Package Manager</i>), instale todas as dependências da aplicação.

```bash
pnpm install
```

Depois de instalar as dependências, crie as tabelas no banco de dados e realize as migrations utilizando o Prisma, digitando o seguinte comando:
```bash
pnpm prisma migrate dev
```

Agora, a aplicação estará pronta para uso, digitando o comando:
```bash
pnpm dev
```

### Utilizando as credenciais e as variáveis de ambiente
O servidor utiliza de variáveis de ambiente para realizar a conexão com o banco de dados e dados sensíveis. <br >
Você poderá utilizar suas próprias credenciais definindo as variáveis de ambiente a seguir:

```bash
# Json Web Token Secret
JWT_SECRET= ""

# DATABASE ENV
DATABASE_URL=""
```

Realize uma cópia do arquivo <i>.env.example</i>, renomeando-o para apenas <i>.env</i>

## Rotas da Aplicação

### Rotas de Autenticação

-  **`GET /transactions`**: Essa rota é para fazer todas as listagens de transações feitas pelo usuário. Essa rota só pode ser acessada caso o usuário esteja autenticado por um JWT, e ela pode receber como um query param **`/transactions?page=(qualquer número maior que 0)`**, para poder realizar a paginação dos itens. Cada página possui até 20 itens (transações).

### Rotas de Transações
-  **`GET /transactions`**: Essa rota é para fazer todas as listagens de transações feitas pelo usuário. Essa rota só pode ser acessada caso o usuário esteja autenticado por um JWT, e ela pode receber como um query param **`/transactions?page=(qualquer número maior que 0)`**, para poder realizar a paginação dos itens. Cada página possui até 20 itens (transações).

-  **`POST /transactions`**: Essa rota é responsável por criar novas transações. Para criar uma nova transação, é necessário enviar como corpo da requisição:
```json
{
  "title": "Nome da Transação",
  "value": 9999 (deve ser do tipo inteiro),
  "type": "income(Para entradas) ou outcome (para saidas)"
}
```
Após a criação da transação, a rota retornará ao usuário o id da transação, que é um random unique universal id (uuid).

## Stack Utilizada

- NodeJs
- Typescript
- Prisma ORM
- PostgreSQL
- Zod
