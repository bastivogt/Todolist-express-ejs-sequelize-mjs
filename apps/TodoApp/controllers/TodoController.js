import TodoModel from "../models/TodoModel.js";

class TodoController {
    async index(req, res) {
        const title = "All Todos";
        const todos = await TodoModel.findAll({
            order: [["createdAt", "DESC"]],
        });
        res.render("TodoApp/index", { title: title, todos: todos });
    }

    async show(req, res) {
        const id = req.params.id;
        const todo = await TodoModel.findByPk(id);
        if (!todo) {
            return res.status(404).send("Todo not found");
        }
        res.render("TodoApp/show", { title: todo.title, todo: todo });
    }

    create(req, res) {
        res.render("TodoApp/create", {
            title: "Create Todo",
            error: null,
            todo: null,
        });
    }

    async store(req, res) {
        const { title, text, completed } = req.body;
        if (!title || !text) {
            return res.status(400).render("TodoApp/create", {
                title: "Create Todo",
                error: "Title and text are required",
                todo: { title, text, completed: completed === "on" },
            });
        }
        const todo = await TodoModel.create({
            title,
            text,
            completed: completed === "on",
        });
        res.redirect("/todos");
    }

    async delete(req, res) {
        const id = req.params.id;
        const todo = await TodoModel.findByPk(id);
        if (!todo) {
            return res.status(404).send("Todo not found");
        }
        res.render("TodoApp/delete", { title: "Delete Todo", todo: todo });
    }

    async destroy(req, res) {
        const id = req.body.id;
        const todo = await TodoModel.findByPk(id);
        if (!todo) {
            return res.status(404).send("Todo not found");
        }
        await todo.destroy();
        res.redirect("/todos");
    }

    async edit(req, res) {
        const id = req.params.id;
        const todo = await TodoModel.findByPk(id);
        if (!todo) {
            return res.status(404).send("Todo not found");
        }
        res.render("TodoApp/edit", {
            title: `Edit ${todo.title}`,
            todo: todo,
            error: null,
        });
    }

    async update(req, res) {
        const id = req.params.id;
        const { title, text, completed } = req.body;
        const todo = await TodoModel.findByPk(id);
        if (!todo) {
            return res.status(404).send("Todo not found");
        }
        if (!title || !text) {
            return res.status(400).render("TodoApp/edit", {
                title: `Edit ${todo.title}`,
                error: "Title and text are required",
                todo: { id: id, title, text, completed: completed === "on" },
            });
        }
        await todo.update({ title, text, completed: completed === "on" });
        res.redirect("/todos");
    }
}

export default new TodoController();
