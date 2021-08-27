import "./App.css";
import TodoList from "./component/TodoList/TodoList";
import ClickMe from "./component/ClickMe";
import ColorBox from "./component/ColorBox";

function App() {
  return (
    <div className="App">
      <ClickMe />
      <ColorBox />
      <TodoList />
    </div>
  );
}

export default App;
