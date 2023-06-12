const { DataTypes, Sequelize } = require('sequelize');

module.exports = (Sequelize) =>{

    Sequelize.define('type' ,{
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
          },
        
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {timestamps: false},
    );
}