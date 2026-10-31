import sequelize from "sequelize";  

const db = new sequelize("database", "username", "password", {
    dialect: "sqlite",
    storage: "./db.sqlite",
    logging: false
});

export default db;  