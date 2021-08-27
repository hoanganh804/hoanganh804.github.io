import React, { useState } from "react";
import "./ClickMe.css";

export default function ClickMe() {
  const [count, setCount] = useState(() => {
    const countFirst = parseInt(localStorage.getItem("clicked")) || 0;
    return countFirst;
  });
  const clickButtonTang = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem("clicked", newCount);
  };

  const clickButtonGiam = () => {
    const newCount = count - 1;
    setCount(newCount);
    localStorage.setItem("clicked", newCount);
  };
  return (
    <div>
      <h2>So lan click la: {count}</h2>
      <button type="button" onClick={clickButtonGiam}>
        Click Giam
      </button>
      <button type="button" onClick={clickButtonTang}>
        Click Tang
      </button>
    </div>
  );
}
