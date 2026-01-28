require('dotenv').config(); // carrega variáveis de ambiente do arquivo .env para process.env
const express = require('express'); // importa o framework web Express
const morgan = require('morgan'); // importa o middleware de logging HTTP morgan
const cors = require('cors');
const tarefasRoutes = require('./routes/tarefas'); // importa as rotas relacionadas a "tarefas"
const { sequelize } = require('./models'); // importa a instância do Sequelize (conexão com o DB)

const app = express(); // cria a aplicação Express
app.use(cors()); //
app.use(morgan('dev')); // registra requisições no console usando o formato 'dev'
app.use(express.json()); // habilita o parsing de JSON no corpo das requisições

app.get('/', (req, res) => res.json({ message: 'API To-Do List funcionando' })); // rota GET na raiz que retorna uma mensagem de status

app.use('/tarefas', tarefasRoutes); // monta as rotas de tarefas sob o prefixo '/tarefas'

// error handler simples
app.use((err, req, res, next) => {
  console.error(err); // loga o erro no console
  res.status(500).json({ message: 'Erro interno.' }); // responde com status 500 e mensagem genérica
});

module.exports = app; // exporta a instância do app para uso em outros arquivos (por exemplo servidor)
