import db from "./db.js";

// import the models
import Todo from "./apps/TodoApp/models/TodoModel.js";  

db.sync().then(() => {
    console.log("Database synchronized");
}).catch((err) => {
    console.error("Error synchronizing database:", err);
});