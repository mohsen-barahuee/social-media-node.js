const { DataTypes } = require('sequelize')
const db = require('../config/db')
const User = require('./user')
const Post = require('./post') 

// COMMENT MODEL
const Comment = db.define("Comment", {
    id: {
        type: DataTypes.INTEGER, type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    },

    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },

})

User.hasMany(Comment, { foreignKey: "userId" })
Comment.belongsTo(User, { foreignKey: "userId" })




module.exports = Comment