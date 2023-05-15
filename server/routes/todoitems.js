const router = require("express").Router();

//import todo model right here
const todoItemsModel = require("../models/todoitems");

//creating first route
//Creating route to add todo item and the rest of info into the database
router.post("/api/item", async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
      startDate: req.body.startDate,
      dueDate: req.body.dueDate,
      notes: req.body.notes,
      checked: req.body.checked,
    });
    //saving those data into the database
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

//creating route to get all the data from the database
router.get("/api/items", async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

//creating route to update items from the database
router.put("/api/item/:id", async (req, res) => {
  try {
    //find the item by its id and update it
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updateItem);
  } catch (err) {
    res.json(err);
  }
});

//creating route to delete item from the database
router.delete("/api/item/:id", async (req, res) => {
  try {
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item has been deleted");
  } catch (err) {
    res.json(err);
  }
});
//exporting our route
module.exports = router;
