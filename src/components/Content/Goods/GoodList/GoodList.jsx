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
      {goods.map((item, i) => {
        return (
          <tr key={i}>
            <td className="col-6">{item.name}</td>
            <td className="col-1">
              <NavLink
                to="/good-view"
                state={{ name: item.name, id: item.id }}
                className="link-light"
              >
                Просмотреть
              </NavLink>
            </td>
            <td className="col-1">
              <NavLink
                to="/edit-good"
                state={{
                  name: item.name,
                  id: item.id,
                  folder_id: props.folder_id,
                }}
                className="link-light"
              >
                Редактировать
              </NavLink>
            </td>
            <td className="col-1">
              <button
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
