import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem("todo")) || []);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');

  const inputRef = useRef();

  // Save both state and localStorage
  function saveTodo(updatedList) {
    setTodoList(updatedList);
    localStorage.setItem("todo", JSON.stringify(updatedList));
  }

  // Add or save todo
  function handleTodo() {
    const value = inputRef.current.value.trim();
    if (!value) return alert("Please enter a task.");
    if (value.length > 100) return alert("Task length should be ≤ 100 characters.");

    if (editingId) {
      // Save edit
      const updatedList = todoList.map(todo =>
        todo.id === editingId ? { ...todo, task: value } : todo
      );
      saveTodo(updatedList);
      setEditingId(null);
    } else {
      // Add new
      const isDuplicate = todoList.some(todo => todo.task.toLowerCase() === value.toLowerCase());
      if (isDuplicate) return alert("This task already exists.");

      const newTodo = { task: value, completed: false, id: Date.now() };
      saveTodo([...todoList, newTodo]);
    }

    inputRef.current.value = '';
  }

  function inputEnter(e) {
    if (e.key === 'Enter') handleTodo();
  }

  // Start editing a todo
  function onEditClick(id) {
    const todoToEdit = todoList.find(todo => todo.id === id);
    if (!todoToEdit) return;

    inputRef.current.value = todoToEdit.task;
    inputRef.current.focus();
    setEditingId(id);
  }

  // Delete todo
  function onDeleteClick(id) {
    const updatedList = todoList.filter(todo => todo.id !== id);
    saveTodo(updatedList);
    if (editingId === id) setEditingId(null); // reset if deleting the todo being edited
  }

  // Toggle completed
  function onCheckboxChange(id) {
    const updatedList = todoList.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodo(updatedList);
  }

  // Filter logic
  let visibleTodos = todoList;
  if (filter === 'pending') visibleTodos = todoList.filter(todo => !todo.completed);
  if (filter === 'completed') visibleTodos = todoList.filter(todo => todo.completed);

  return (
    <div className="app">
      <div className="todo-card">
        <h1 className="title">iTasks</h1>

        <div className="input-group">
          <input type="text" placeholder="Add a new task..." ref={inputRef} onKeyDown={inputEnter} />
          <button onClick={handleTodo}>{editingId ? "Save" : "Add"}</button>
        </div>

        <div className="filters">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pending</button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
        </div>

        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <li className={todo.completed ? "todo-item completed" : "todo-item"} key={todo.id}>
              <div className="todo-left">
                <input type="checkbox" checked={todo.completed} onChange={() => onCheckboxChange(todo.id)} />
                <span className="todo-text" onDoubleClick={() => onEditClick(todo.id)}>{todo.task}</span>
              </div>
              <div className="actions">
                <button onClick={() => onEditClick(todo.id)}>✏️</button>
                <button onClick={() => onDeleteClick(todo.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
