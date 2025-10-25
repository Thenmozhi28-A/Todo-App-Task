// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "..//api/todoApi";

function Dashboard({ currentUser }) {
  const { data, error, isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [newTodo, setNewTodo] = useState("");

  if (!currentUser) return <Navigate to="/" />;

  const handleAdd = async () => {
    if (newTodo.trim()) {
      await addTodo({ todo: newTodo, completed: false, userId: 1 });
      setNewTodo("");
    }
  };

  const handleToggle = async (todo) => {
    await updateTodo({ id: todo.id, completed: !todo.completed });
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  return (
    <DashboardLayout currentUser={currentUser}>
      <h2 className="text-2xl font-bold mb-4">Todo App</h2>

      {/* Add Todo */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 border rounded-l px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error fetching todos</p>}

      <ul className="space-y-2">
        {data?.todos?.slice(0, 10).map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white shadow p-2 rounded"
          >
            <span
              onClick={() => handleToggle(todo)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.todo}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
}

export default Dashboard;
