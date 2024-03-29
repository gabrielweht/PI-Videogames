const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      validate: {
        isUUID: 4
      },
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    background_image: {
      type: DataTypes.STRING
    },
    released: {
      type:  DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5
      }
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    }
  },
  {
    timestamps: false
  });

};
