import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/User/Login/Login";
import Register from "./components/User/Registration/Registration";
import './App.css';
import ResetPass from "./components/User/ResetPass/ResetPass";
import Content from "./components/Content/Content";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<ResetPass />} />
          <Route exact path="/content" element={<Content />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
