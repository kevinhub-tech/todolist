import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [checked, setChecked] = useState(false);
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
  const [updateChecked, setUpdateChecked] = useState(false);
  //Add new item into the database (post method)
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/item", {
        item: itemText,
        startDate: startDate,
        dueDate: dueDate,
        notes: Notes,
        checked: checked,
      });
      setListItems((prev) => [...prev, res.data]);
      setitemText("");
      setstartDate("");
      setdueDate("");
      setNotes("");
      setChecked("");
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

    const updatedItemIndex = listItems.findIndex(
      (item) => item._id === isUpdating
    );

    try {
      const res = await axios.put(`/api/item/${isUpdating}`, {
        item: updateItem || listItems[updatedItemIndex].item,
        startDate: updateStartDate || listItems[updatedItemIndex].startDate,
        dueDate: updateDueDate || listItems[updatedItemIndex].dueDate,
        notes: updateNotes || listItems[updatedItemIndex].notes,
        checked: updateChecked,
      });
      console.log(res.data);

      listItems[updatedItemIndex].item =
        updateItem || listItems[updatedItemIndex].item;
      listItems[updatedItemIndex].startDate =
        updateStartDate || listItems[updatedItemIndex].startDate;
      listItems[updatedItemIndex].dueDate =
        updateDueDate || listItems[updatedItemIndex].dueDate;
      listItems[updatedItemIndex].notes =
        updateNotes || listItems[updatedItemIndex].notes;
      listItems[updatedItemIndex].checked = updateChecked;

      setUpdateItem("");
      setUpdateStartDate("");
      setUpdateDueDate("");
      setUpdateNotes("");
      setUpdateChecked();
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
      <input
        type="checkbox"
        onChange={(i) => {
          setUpdateChecked(i.target.checked);
        }}
        value={updateChecked}
      ></input>
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
                <p key={item._id} className="item-content">
                  {item.item}
                </p>
                <p key={item._id} className="item-content">
                  {item.dueDate}
                </p>
                <p key={item._id} className="item-content">
                  {item.startDate}
                </p>
                <p key={item._id} className="item-content">
                  {item.notes}
                </p>
                {item.checked ? (
                  <p key={item._id} className="item-content">
                    Done
                  </p>
                ) : (
                  <p key={item._id} className="item-content">
                    To be completed
                  </p>
                )}
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
