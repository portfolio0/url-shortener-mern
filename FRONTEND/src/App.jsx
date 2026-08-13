import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Url_form from "./components/url_form/Url_form";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="">
        <Homepage />
      </h1>
    </>
  );
}

export default App;
