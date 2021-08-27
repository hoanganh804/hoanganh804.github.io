import React from "react";

export default function TodoItem(props) {
  return (
    <div>
      <li onClick={() => props.deleteItem(props.id)}>{props.listItem}</li>
    </div>
  );
}
