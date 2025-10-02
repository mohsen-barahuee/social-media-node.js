const { Sequelize } = require('sequelize');

// authentication the database
const sequelize = new Sequelize({
    host: "127.0.0.1",
    username: "root",
    password: "",
    dialect: "mysql",
    database: 'social_media',
    logging: false
})

//sync the database
sequelize.sync({ alter: true })

//connect the database function
const connectToDb = async () => {
    try {
        await sequelize.authenticate()
        console.log("DataBase Connected :))");

    } catch (error) {
        console.log("DataBase Have a ERROR==>", error.message);

    }
}

connectToDb()

module.exports = sequelize

