const { DataTypes, Model } = require('sequelize')
const db = require('../config/db')
const User = require('./user')

// POST MODEL
const Post = db.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

User.hasMany(Post, { foreignKey: "userId" })
Post.belongsTo(User, { foreignKey: "userId" })

module.exports = Post