import { NavLink } from "react-router-dom";
import GoodList from "./GoodList/GoodList";
import Folders from "../Folders/Folders";
import { useLocation } from "react-router-dom";

const Goods = (props) => {
  const { state } = useLocation();
  const get_back_link = () => {
    if (state && state.folder_id && state.folder_id != "0") {
      return (
        <NavLink
          to="/content"
          state={{ id: -1, name: "" }}
          className="link-light text-start"
        >
          Назад
        </NavLink>
      );
    }
  };
  return (
    <div>
      <main>
        <p className="lead text-end">
          <NavLink
            to="/edit-good"
            state={{
              id: -1,
              name: "",
              folder_id:
                state && state.folder_id && state.folder_id != "0"
                  ? state.folder_id
                  : "0",
            }}
            className="btn btn-lg btn-dark m-2"
          >
            Добавить товар
          </NavLink>
          <NavLink
            to="/edit-folder"
            state={{
              id: -1,
              name: "",
              folder_id:
                state && state.folder_id && state.folder_id != "0"
                  ? state.folder_id
                  : "0",
            }}
            className="btn btn-lg btn-dark m-2"
          >
            Добавить папку
          </NavLink>
        </p>
      </main>
      <div className="container text-white">
        <h3>Товары для мониторинга:</h3>

        <div className="text-start">{get_back_link()}</div>

        <h5>{props.name}</h5>
        <table className="table text-white text-start">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col"> </th>
              <th scope="col"> </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            <Folders folder_id={state ? state.folder_id : "0"} />
            <GoodList folder_id={state ? state.folder_id : "0"} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Goods;
