import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/User/Login/Login";
import Register from "./components/User/Registration/Registration";
import './App.css';
import ResetPass from "./components/User/ResetPass/ResetPass";
import { Provider } from "./contexts/index"
import Good from "./components/Content/Goods/Good/Good";
import { MainTemplate } from "./components/MainTemplate/MainTemplate";
import Goods from "./components/Content/Goods/Goods";

function App() {
  return (
    <div className="App">
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/reset" element={<ResetPass />} />
              <Route exact path="/content" element={<MainTemplate> <Goods /> </MainTemplate>} />
              <Route exact path="/good-view" element={<MainTemplate> <Good /> </MainTemplate> } />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
