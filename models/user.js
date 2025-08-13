const { DataTypes } = require('sequelize')
const db = require('../config/db')

const User = db.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
    },
    fullName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                msg: "Email is not available"
            }
        },
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
})


module.exports = User