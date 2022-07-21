import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/User/Login/Login";
import Register from "./components/User/Registration/Registration";
import './App.css';
import ResetPass from "./components/User/ResetPass/ResetPass";
import { Provider } from "./contexts/index"
import Good from "./components/Content/Goods/Good/Good";
import { MainTemplate } from "./components/MainTemplate/MainTemplate";
import GoodsPage from "./components/Content/Goods/GoodsPage";
import React from "react";
import Edit from "./components/Content/Goods/Edit/Edit";

function App() {
  return (
    <div className="App">
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/reset" element={<ResetPass />} />
              <Route exact path="/content" element={<MainTemplate> <GoodsPage /> </MainTemplate>} />
              <Route exact path="/good-view" element={<MainTemplate> <Good /> </MainTemplate> } />
              <Route exact path="/edit-good" element={<MainTemplate> <Edit /> </MainTemplate> } />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
