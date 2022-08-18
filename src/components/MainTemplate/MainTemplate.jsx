import React from "react";
import Header from "../Content/Header/Header";
import c from "./MainTemplate.module.css";

export const MainTemplate = ({ children }) => {
  return (
    <div className={`${c.text_center}`}>
      <Header />
      <div className="cover-container d-flex w-100 h-100 p-md-5 p-1 pt-4 mx-auto flex-column">
        <div className={c.content}>{children}</div>
      </div>
    </div>
  );
};
