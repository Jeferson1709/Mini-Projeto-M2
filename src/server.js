const app = require('./app'); // importa a instância do Express (ou o módulo que configura as rotas/middleware)
const { sequelize } = require('./models'); // importa a instância do Sequelize configurada pelos models

const PORT = process.env.PORT || 3000; // define a porta: usa variável de ambiente ou 3000 como padrão

async function start() { // função assíncrona que inicia a aplicação (conexão ao DB + servidor)
  try { // tenta conectar ao banco e iniciar o servidor
    await sequelize.authenticate(); // verifica/valida a conexão com o banco de dados
    console.log('Conectado ao banco de dados.'); // informa que a conexão foi bem-sucedida
    app.listen(PORT, () => { // inicia o servidor HTTP/Express escutando na porta definida
      console.log(`Servidor rodando na porta ${PORT}`); // loga a porta em que o servidor está rodando
    });
  } catch (err) { // captura erros ocorridos na conexão ou ao iniciar o servidor
    console.error('Falha ao conectar com o banco:', err); // imprime detalhes do erro no console
    process.exit(1); // encerra o processo com código de erro (1)
  }
}

start(); // chama a função start para executar o fluxo de inicialização
