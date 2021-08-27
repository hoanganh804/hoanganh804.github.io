import React, { useState } from "react";
import "./ColorBox.css";

const changeColorRandom = () => {
  const colors_box = ["deeppink", "green", "yellow", "black", "blue"];
  const color_box = colors_box[Math.floor(Math.random() * 4)];
  console.log(Math.floor(Math.random() * 5));
  return color_box;
};

export default function ColorBox() {
  const [color, setColor] = useState(() => {
    const fistColor = localStorage.getItem("color_box") || "deeppink";
    return fistColor;
  });

  const handleColorBoxClick = () => {
    const colorNow = changeColorRandom();
    setColor(colorNow);
    localStorage.setItem("color_box", colorNow);
  };
  return (
    <div
      className="box"
      onClick={handleColorBoxClick}
      style={{ backgroundColor: color }}
    ></div>
  );
}
