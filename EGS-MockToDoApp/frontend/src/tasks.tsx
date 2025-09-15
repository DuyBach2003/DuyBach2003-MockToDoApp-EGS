import React, { useEffect, useState } from "react";
import "./tasks.css";

function Tasks() {
  type Todo = {
    id: number;
    title: string;
  };
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [completedTasks, setCompletedTasks] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const findAllTodos = async () => {
    const res = await fetch('http://localhost:4000/v1/tasks');
    const data = await res.json();
    const uncompletedTasks = data.filter((t: any) => t.status === 'uncompleted');
    const completedTasks = data.filter((t: any) => t.status === 'completed');
    setTodos(uncompletedTasks);
    setCompletedTasks(completedTasks);
  }

  const addTodo = async () => {
    try {
      const res = await fetch('http://localhost:4000/v1/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      });
      if (!res.ok) {
        throw new Error('Failed to add todo');
      }
      findAllTodos();
      setNewTodo('');
    }
    catch {
      console.error('Error adding todo');
    }
  };

  const removeTodo = async (id: number, title: string) => {
    try {
      const res = await fetch(`http://localhost:4000/v1/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title })
      });
      if (!res.ok) {
        throw new Error('Failed to delete todo');
      }
      findAllTodos();
    }
    catch {
      console.error('Error deleting todo');
    }
  };
  const updateTodo = async (id: number, updatedTitle: string) => {
    setEditingId(id);
    setNewTodo(updatedTitle);
    try {
      const res = await fetch(`http://localhost:4000/v1/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle })
      });
      if (!res.ok) {
        throw new Error('Failed to update todo');
      }
      findAllTodos();
    }
    catch {
      console.error('Error updating todo');
    }
  }
  const updateTodoStatus = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:4000/v1/tasks/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) {
        throw new Error('Failed to update todo status');
      }
      findAllTodos();
    }
    catch {
      console.error('Error updating todo status');
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTodo.trim() === "") {
      alert('Task title is required.')
      return;
    }
    for (const todo of todos) {
      if (newTodo.trim() === todo.title) {
        alert('Task title already exists.');
        return;
      }
    }

    if (editingId === null) {
      addTodo();
    } else {
      updateTodo(editingId, newTodo);
    }

    setNewTodo("");
    setEditingId(null);
  };

  useEffect(() => {
    findAllTodos()
  }, [])
  return (
    <div className="container">
      <h2>Mock Todo App</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder={editingId === null ? "Enter new task" : "Update task title"}
          className="input"
        />
        <button type="submit" className="add-btn">
          {editingId === null ? 'Add' : 'Update'}
        </button>
      </form>

      <div className="lists-container">
        <ul className="list">
          <h3>Uncompleted tasks</h3>
          {todos?.map((todo) => (
            <li className="list-item" key={`active-${todo.id}`}>
              <span>{todo.title}</span>
              <div className="button-group">
                <button onClick={() => updateTodo(todo.id, todo.title)} className="update-btn">
                  Update
                </button>
                <button onClick={() => updateTodoStatus(todo.id)} className="update-status-btn">
                  {'>'}
                </button>
              </div>
            </li>
          ))}
        </ul>

        <ul className="list">
          <h3>Completed tasks</h3>
          {completedTasks?.map((todo) => (
            <li className="list-item" key={`completed-${todo.id}`}>
              <span>{todo.title}</span>
              <div className="button-group">
                <button onClick={() => updateTodoStatus(todo.id)} className="update-status-btn">
                  {'<'}
                </button>
                <button onClick={() =>  removeTodo(todo.id, todo.title)} className="remove-btn">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
