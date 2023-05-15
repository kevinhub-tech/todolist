//importing mongoose to create new schema
const mongoose = require("mongoose");

//creating schema
const TodoItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  checked: {
    type: Boolean,
  },
});

//exporting this schema
module.exports = mongoose.model("todolist", TodoItemSchema);
