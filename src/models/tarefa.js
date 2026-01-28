module.exports = (sequelize, DataTypes) => {
  const Tarefa = sequelize.define('Tarefa', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('a fazer', 'em andamento', 'concluída'),
      defaultValue: 'a fazer',
      allowNull: false
    }
  }, {
    tableName: 'tarefas',
    underscored: true
  });

  return Tarefa;
};
