import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Content.css";
import { auth } from "../../firebase";
import Header from "./Header/Header";

function Content() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <div className="dashboard text_center">
      <Header />
      Содержимое
    </div>
  );
}
export default Content;