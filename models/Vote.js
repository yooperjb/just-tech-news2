const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model {}

Vote.init(
    {   
        // define id  
        id: {
            type: DataTypes. INTEGER ,
            primaryKey: true ,
            autoIncrement : true
        },
        // create link to user_id
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 'user', 
            key: 'id'
        },
        // create link to post_id
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post', 
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps : false,
        freezeTableName: true,
        underscored: true,
        modelName: 'vote'
    }
);   

module.exports = Vote;