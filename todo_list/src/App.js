import React from "react";
import "./App.css";

const App = () => {
  // Initializes variable for input field using the hook useState
  // todos/todo is the state and setTodos/setTodo is the function that updates the state value
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  // Hook used to edit task and change state
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");  
  
  // The useEffect hook is used to save new todos into local storage
  React.useEffect(() => {
      const json = localStorage.getItem("todos"); 
      const loadedTodos = JSON.parse(json); 
      if (loadedTodos) {
          setTodos(loadedTodos); 
      }

  }, []); 

  React.useEffect (() => {
      if (todos.length > 0){
          const json = JSON.stringify(todos); 
          localStorage.setItem("todos", json); 
      }
  }, [todos]); 

  // gives application power to add a new task for the todo list
  // if condition checks the input is not empty and trims any proceeding or succeding spaces
  const handleSubmit = (e) => {
      e.preventDefault(); 

      const newTodo = {
          id: new Date().getTime(),
          text: todo.trim(),
          completed: false, 

      }; 

      if (newTodo.text.length > 0) {
          setTodos([...todos].concat(newTodo)); 
          setTodo(""); 

      } else {
          alert("Enter Valid Task"); 
          setTodo(""); 
      }

  }
  
  // The filter method filters out the task to be deleted and returns the rest of the tasks
  const deleteTodo = (id) => {
      let updatedTodos = [...todos].filter((todo) => todo.id !== id); 
      setTodos(updatedTodos); 
  }
  
  // Add the toggleComplete code here
  const toggleComplete = (id) => {
      let updatedTodos = [...todos].map((todo) => {
          if (todo.id === id) {
              todo.completed = !todo.completed; 
          }
          return todo; 
      }); 
      setTodos(updatedTodos); 
  }

  
  // The submitEdits function helps to submit the task of todo list using map
  const submitEdits = (id) => {
      const updatedTodos = [...todos].map((todo) => {
          if (todo.id === id) {
              todo.text = editingText; 
          }
          return todo; 
      }); 
      setTodos(updatedTodos); 
      setTodoEditing(null); 
  }


// on submitting the form the task is added to the todo array and uses map to iterate through the todo array. 
// It also renders each task as a list item. 
// The handle submit handler will prevent the default action that would normally be take on the form and add a new taks using the latest value from input field
// Allows user to edit the tak when in edit mode and submits it back to the list
// Adds button for submiting, editing, and deleting a task
return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
