# API To-Do List (Projeto pronto para testes)

Projeto mínimo completo implementando uma API REST para gerenciamento de tarefas.
Tecnologias: Node.js, Express, Sequelize (SQLite), dotenv.

## Conteúdo adicionado
- Código da API (Express + Sequelize)
- Migration para criação da tabela `tarefas`
- Validações básicas
- Tests automatizados com Jest + Supertest
- Postman collection para testar endpoints

## Como testar rapidamente

1. Extraia o zip em uma pasta.
2. Copie `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
3. Instale dependências:
   ```bash
   npm install
   ```
4. Rodar migrations (gera o arquivo `database.sqlite`):
   ```bash
   npx sequelize-cli db:migrate
   ```
5. Rodar em desenvolvimento:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   npm start
   ```
6. A API estará disponível em `http://localhost:3000`.
   - Health: `GET /` -> { message: 'API To-Do List funcionando' }
   - Endpoints principais:
     - `POST /tarefas`
     - `GET /tarefas`
     - `GET /tarefas/:id`
     - `PUT /tarefas/:id`
     - `PATCH /tarefas/:id/status`
     - `DELETE /tarefas/:id`

## Executar testes automatizados
Os testes usam `NODE_ENV=test` e um banco SQLite em memória.
```bash
npm test
```

## Postman
Importe o arquivo `postman_collection.json` no Postman para ter acesso a coleções de requests prontas.

## Observações
- Para rodar os testes localmente em Windows via PowerShell, se houver problemas com `NODE_ENV=test` em `package.json`, rode:
  ```powershell
  $env:NODE_ENV='test'; npm test
  ```
- Se preferir que eu gere também um `docker-compose` para rodar tudo em container, eu adiciono.

Boa sorte! Se quiser, posso ajustar os testes, adicionar CI (GitHub Actions) ou gerar o Dockerfile.
