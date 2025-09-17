const { DataTypes, Model } = require('sequelize')
const db = require('../config/db')


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
    ,
   
    creator: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

})


Post.associations = (models) => {
    Post.hasOne(db.define("User"))
}

module.exports = Post