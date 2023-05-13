import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [itemText, setitemText] = useState("");
  const [startDate, setstartDate] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [Notes, setNotes] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const [updateStartDate, setUpdateStartDate] = useState("");
  const [updateDueDate, setUpdateDueDate] = useState("");
  const [updateNotes, setUpdateNotes] = useState("");
  //Add new item into the database (post method)
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/item", {
        item: itemText,
        startDate: startDate,
        dueDate: dueDate,
        notes: Notes,
      });
      setListItems((prev) => [...prev, res.data]);
      setitemText("");
      setstartDate("");
      setdueDate("");
      setNotes("");
    } catch (err) {
      console.log(err);
    }
  };

  //Creating function to fetch all data from the database for todolist -- will be using useEffect() function
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("api/items");
        setListItems(res.data);
        console.log("render");
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  //Creating delete function for the items
  const deleteItems = async (id) => {
    try {
      const res = await axios.delete(`/api/item/${id}`);
      const newListItem = listItems.filter((item) => item._id !== id);
      setListItems(newListItem);
    } catch (err) {
      console.log(err);
    }
  };

  //Creating update items function
  const updateItems = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/item/${isUpdating}`, {
        item: updateItem,
        startDate: updateStartDate,
        dueDate: updateDueDate,
        notes: updateNotes,
      });
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = (listItems[updatedItemIndex].item = updateItem);

      setUpdateItem("");
      setUpdateStartDate("");
      setUpdateDueDate("");
      setUpdateNotes("");
      setIsUpdating("");
    } catch (err) {
      console.log(err);
    }
  };
  //before the update function, we will create input form for the updated data
  const renderUpdateForm = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItems(e);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => {
          setUpdateItem(e.target.value);
        }}
        value={updateItem}
      />
      <input
        className="update-new-input"
        type="text"
        placeholder="New Starting Date"
        onChange={(f) => {
          setUpdateStartDate(f.target.value);
        }}
        value={updateStartDate}
      />
      <input
        className="update-new-input"
        type="text"
        placeholder="New Due Date"
        onChange={(g) => {
          setUpdateDueDate(g.target.value);
        }}
        value={updateDueDate}
      />
      <input
        className="update-new-input"
        type="text"
        placeholder="New Notes"
        onChange={(h) => {
          setUpdateNotes(h.target.value);
        }}
        value={updateNotes}
      />
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <div className="App">
      <h1>To do List</h1>
      <form className="todolist-form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add to do list item"
          onChange={(e) => {
            setitemText(e.target.value);
          }}
          value={itemText}
        ></input>
        <input
          type="text"
          placeholder="Starting Date"
          onChange={(f) => {
            setstartDate(f.target.value);
          }}
          value={startDate}
        ></input>
        <input
          type="text"
          placeholder="Due Date"
          onChange={(g) => {
            setdueDate(g.target.value);
          }}
          value={dueDate}
        ></input>
        <input
          type="text"
          onChange={(h) => {
            setNotes(h.target.value);
          }}
          value={Notes}
          placeholder="Notes (Optional)"
        ></input>
        <button type="submit">Add</button>
      </form>
      <div className="todoList_items">
        {listItems.map((item) => (
          <div className="todo-item">
            {isUpdating === item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <p className="item-content">{item.startDate}</p>
                <p className="item-content">{item.dueDate}</p>
                <p className="item-content">{item.notes}</p>
                <button
                  className="update-item"
                  onClick={() => {
                    setIsUpdating(item._id);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-item"
                  onClick={() => {
                    deleteItems(item._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
