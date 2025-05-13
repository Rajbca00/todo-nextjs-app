"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    // Fetch todos from local storage
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const updateTodo = (id: string) => {
    // Update the todo item
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const deleteTodo = (id: string) => {
    // Delete the todo item
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    );
    // Optionally, you can also add a toast notification here
    toast.success("Todo deleted successfully!");
  }

  const addTodo = () => {
    const id = Math.random().toString(36).substring(2, 9);
    const newTodoItem: Todo = { id, title: newTodo, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodoItem]);
    setNewTodo(""); // Clear the input field
    localStorage.setItem("todos", JSON.stringify([...todos, newTodoItem]));
    // Optionally, you can also add a toast notification here
    toast.success("Todo added successfully!");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <section className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold">Welome to My Todo App</h1>
          <p className="text-sm text-gray-500 w-2/3 ">
            This is a simple todo app built with Next.js, TypeScript, and
            Tailwind CSS.
          </p>

          <fieldset className="fieldset">
            <legend className="fieldset-legend mt-5 ml-2">
              Write your todo
            </legend>
            <input
              type="text"
              className="input w-lg"
              placeholder="Type here"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </fieldset>

          <button className="btn btn-primary mt-5 w-lg" onClick={addTodo}>
            Add Todo
          </button>
        </section>

        <section className="">
          <h2 className="text-2xl font-bold">My Todos</h2>
          <ul className="list-disc list-inside mt-5">
            {todos &&
              todos.map((todo) => (
                <li key={todo.id} className="flex items-center gap-2 w-lg mt-3">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => updateTodo(todo.id)}
                      className="checkbox"
                    />
                    <span className="ml-2">{todo.title}</span>
                  </div>
                  <button
                    className="btn btn-error btn-sm"
                    type="button"
                    aria-label="Delete todo"
                    title="Delete todo"
                    onClick={() => deleteTodo(todo.id)}>X</button>
                </li>
              ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
