const express = require("express");
const cors = require("cors");
let { pool: pool } = require("./db");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(app.router);

// Routes//

// Create a todo

app.post("/todos", async function (req, res) {
  // console.log(req.body);
  try {
    const { description } = req.body;
    // console.log(description);
    const newTodo = await pool.query(
      "INSERT INTO detail (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
// get all todo

app.get("/todos", async function (req, res) {
  try {
    const displayAll = await pool.query("SELECT * FROM detail");
    res.json(displayAll.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo item

app.get("/todos/:id", async function (req, res) {
  try {
    const { id } = req.params;
    // console.log(id);
    const displayId = await pool.query(
      "SELECT * FROM detail WHERE todo_id = $1",
      [id]
    );
    res.json(displayId.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo item

app.put("/todos/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateId = await pool.query(
      "UPDATE detail SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    // const displayId = await pool.query(
    //   "SELECT * FROM detail WHERE todo_id = $1",
    //   [id]
    // );
    res.json("Todo Updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo item

app.delete("/todos/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const deleteId = await pool.query("DELETE FROM detail WHERE todo_id = $1", [
      id,
    ]);
    res.json("Delete Successfully");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server listens at " + 5000 + " port");
});
