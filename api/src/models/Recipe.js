const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    summary: {
      type:DataTypes.STRING,
      allowNull:true
    },
    healthscore: {
      type:DataTypes.STRING,
    },
    step_by_step: {
      type:DataTypes.STRING
    },
  },{
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
};
