const { DataTypes, Model } = require('sequelize')
const db = require('../config/db')
const User = require('./user')

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
    , hashTags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    }



})


User.hasMany(Post, { foreignKey: "userId" })
Post.belongsTo(User, { foreignKey: "userId" })

module.exports = Post