const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER, // REVISAR ESTO           //PODRÍA USAR ID INTEGER MIN: 950
      primaryKey: true,
      allowNull:false,
      unique: true,
      validate: {
        min: 951          //también puedo hacer un "notIn" o un UUID  -->   investigar
      }
    },    
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true,
      get() {
        const rawValue = this.getDataValue(name);
        return rawValue ? rawValue.toLowerCase() : null;
      }
    },
    hp: {
      type: DataTypes.FLOAT,

    },
    attack: {
      type: DataTypes.FLOAT,

    }, 
    defense: {
      type: DataTypes.FLOAT,

    }, 
    speed: {
      type: DataTypes.FLOAT,

    }, 
    height: {
      type: DataTypes.FLOAT,

    }, 
    weight: {
      type: DataTypes.FLOAT,

    }
  })
}
