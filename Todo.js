import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./Todo.css";

const useStyles = makeStyles({
  root: {
    color: "blue",
    border: "2px solid black",
    background: "lightgray",
    cursor: "pointer",
  },
  root2: {
    color: "red",
    border: "2px solid black",
    background: "lightgray",
    cursor: "pointer",
  },
  root3: {
    height: "35px",
    width: "40px",
    color: "blue",
    border: "2px solid black",
    background: "lightgray",
    cursor: "pointer",
  },
});

const Todo = () => {
  const [input, setInput] = useState("");
  const [addLists, setAddLists] = useState([]);
  const [toggleButton, setToggleButton] = useState(true);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    saveLocalTodos();
  }, [addLists]);

  const addHandler = e => {
    e.preventDefault();
    if (!input) {
      alert("Please enter the data");
    } else if (input && !toggleButton) {
      setAddLists(
        addLists.map(elem => {
          if (elem.id === update) {
            return { ...elem, name: input };
          }
          return elem;
        })
      );
      setInput("");
      setToggleButton(true);
      setUpdate(null);
    } else {
      const allInput = { name: input, id: new Date().getTime().toString() };
      setAddLists([...addLists, allInput]);
      setInput("");
    }
  };

  const deleteHandler = list => {
    const filteredItems = addLists.filter(elem => elem.id !== list.id);
    setAddLists(filteredItems);
  };

  const editHandler = list => {
    const editItems = addLists.find(elem => elem.id === list.id);
    setInput(editItems.name);
    setToggleButton(false);
    setUpdate(list.id);
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(addLists));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localTodo = JSON.parse(localStorage.getItem("todos"));
      console.log(localTodo);
      setAddLists(localTodo);
    }
  };

  const classes = useStyles();

  return (
    <>
      <h2>Todo App</h2>
      <div className="container">
        <div className="subcontainer">
          <form className="form">
            <input
              type="text"
              placeholder="Enter Text..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            {toggleButton ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={addHandler}
              >
                Add
              </Button>
            ) : (
              <EditIcon
                title="Update"
                onClick={addHandler}
                classes={{ root: classes.root3 }}
              />
            )}
          </form>
        </div>
        {addLists.map(list => (
          <div className="list">
            <li key={list.id}>{list.name}</li>
            <EditIcon
              title="Edit"
              onClick={() => editHandler(list)}
              classes={{ root: classes.root }}
            />
            <DeleteIcon
              title="Delete"
              onClick={() => deleteHandler(list)}
              classes={{ root: classes.root2 }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
export default Todo;
