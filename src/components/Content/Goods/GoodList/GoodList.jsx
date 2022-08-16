import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { get_goods, delete_good } from "../../../../service/GoodService";

const GoodList = (props) => {
  const [goods, set_goods] = useState([]);

  useEffect(() => {
    fetch_goods(props.folder_id);
  }, [props.folder_id]);

  const fetch_goods = async (folder_id) => {
    get_goods(folder_id).then((response) => {
      set_goods(response);
    });
  };

  return (
    <>
      {goods.length == 0 && (
        <tr>
          <td>Добавь товар для начала работы</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )}
      {goods.map((item, i) => {
        return (
          <tr key={i}>
            <td className="col-md-9 col-lg-8">{item.name}</td>
            <td className=""></td>
            <td className=""></td>
            <td className="col-5 col-md-3 col-lg-2 text-end">
              <NavLink
                to="/good-view"
                state={{ name: item.name, id: item.id }}
                className="link-light"
              >
                <button type="button" className="btn btn-secondary" title="Просмотр">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-up-right-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
                    ></path>
                  </svg>
                </button>
              </NavLink>
              <NavLink
                to="/edit-good"
                state={{
                  name: item.name,
                  id: item.id,
                  folder_id: props.folder_id,
                }}
                className="link-light mx-1"
              >
                <button type="button" className="btn btn-secondary" title="Редактировать">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
                  </svg>
                </button>
              </NavLink>
              <button title="Удалить"
                className="btn btn-danger"
                onClick={() => {
                  delete_good(item.id).then((result) => {
                    if (result.error === false) {
                      fetch_goods(props.folder_id);
                    }
                  });
                }}
              >
                Х
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default GoodList;
