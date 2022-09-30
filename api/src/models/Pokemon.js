const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull:false,
      unique: true,
      validate: {
        min: 951         
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
      type: DataTypes.INTEGER,
      isInt: true,
      validate: {
        min: 1,
        max: 1000
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      isInt: true,
      validate: {
        min: 1,
        max: 1000
      }
    }, 
    defense: {
      type: DataTypes.INTEGER,
      isInt: true,
      validate: {
        min: 1,
        max: 1000
      }
    }, 
    speed: {
      type: DataTypes.INTEGER,
      isInt: true,
      validate: {
        min: 1,
        max: 1000
      }
    }, 
    height: {
      type: DataTypes.INTEGER,
      isInt: true,
      validate: {
        min: 1,
        max: 1000
      }
    }, 
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 1000
      }
    },
    image: {
      type: DataTypes.STRING,
      isUrl: true,
    }
  })
}
