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
    image:{
        type: DataTypes.STRING(255),
        allowNull: true
    }
    ,
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
    },
    bio:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    
    

})


User.belongsToMany(User, { as: 'Followers', through: 'UserFollowers', foreignKey: 'followingId' });
User.belongsToMany(User, { as: 'Following', through: 'UserFollowers', foreignKey: 'followerId' });


module.exports = User