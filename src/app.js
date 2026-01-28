require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const tarefasRoutes = require('./routes/tarefas');

const app = express();


app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type']
}));


app.options('*', cors());


app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'API To-Do List funcionando' }));

app.use('/tarefas', tarefasRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno.' });
});

module.exports = app;
