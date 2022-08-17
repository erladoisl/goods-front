import { NavLink } from "react-router-dom";
import { Notification } from "../../Notification/Notification";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db, logout } from "../../../service/UserService";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/");
    if (user) {
      fetchUserName();
    }
  }, [user, loading]);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      console.error("An error occured while fetching user data");
    }
  };

  return (
    <header>
      <Notification />
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <NavLink to="/content" className="navbar-brand">
            Goods
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink to="/content" className="nav-link ">
                  Мониторинг
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/content" className="nav-link ">
                  База
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/content" className="nav-link ">
                  Помощь
                </NavLink>
              </li>
            </ul>
            <div className="ms-auto link-light">
              <span className="d-sm-inline-block my-2 my-md-0 ms-md-3 text-white">
                {!loading && (
                  <NavLink to="/content" className="nav-link text-white">
                    {name}({user?.email})
                  </NavLink>
                )}
              </span>
              <button
                className="btn btn-dark d-lg-inline-block my-2 my-md-0 ms-md-3 text-white"
                onClick={logout}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
