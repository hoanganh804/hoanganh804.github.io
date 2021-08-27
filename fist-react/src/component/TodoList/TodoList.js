import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { v4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
  const [listTodo, setListTodo] = useState([]);
  const handleSubmit = (e) => {
    if (e.which === 13) {
      const text = e.target.value;
      if (text) {
        const todoText = { title: text, id: v4() };
        const newlistTodo = [...listTodo];
        newlistTodo.unshift(todoText);
        setListTodo(newlistTodo);
        e.target.value = "";
      }
    } else {
      return;
    }
  };
  const handleDelete = (id) => {
    const newlistTodo = [...listTodo];
    newlistTodo.splice(id, 1);
    setListTodo(newlistTodo);
  };

  return (
    <>
      <h2>Todo List</h2>
      <input type="text" onKeyDown={handleSubmit} placeholder="Nhap ...." />
      <ul>
        {listTodo.map((todo, index) => {
          return (
            <TodoItem
              key={todo.id}
              id={index}
              listItem={todo.title}
              deleteItem={handleDelete}
            />
          );
        })}
      </ul>
    </>
  );
}
