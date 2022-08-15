import React, { useEffect, useState } from "react";
import {
  edit_notification,
  get_notifications,
  delete_notification,
} from "../../../../../service/GoodService";
import c from "./Notifications.module.css";

const Notifications = (props) => {
  const operators = ["меньше", "больше"];
  const [notifications, set_notifications] = useState([]);
  const [show_new_notification, set_show_new_notification] = useState(false);

  const [notification, set_notification] = useState({
    id: -1,
    good_id: props.good_id,
    operator: "<",
    value: 0,
  });

  useEffect(() => {
    fetch_notifications(props.good_id);
  }, []);

  useEffect(() => {
    if (props.good_id > 0) {
      fetch_notifications(props.good_id);
      set_notification({ ...notification, good_id: props.good_id });
    }
  }, [props.good_id]);

  const fetch_notifications = async (good_id) => {
    get_notifications(good_id).then((response) => {
      set_notifications(response);
    });
  };

  const add_notification = (e) => {
    e.preventDefault();

    if (props.good_id === -1) {
      alert("Сначала нужно сохранить название продукта!");
    } else {
      edit_notification(notification).then(function (result) {
        if (result.error === false) {
          fetch_notifications(props.good_id);
          set_notification({
            id: -1,
            good_id: props.good_id,
            operator: "<",
            value: 0,
          });
          set_show_new_notification(false);
        } else {
          console.log(result);
        }
      });
    }
  };

  return (
    <div className="container text-white p-0">
      <div className="row">
        <div className="mb-3 col-6 m-auto">
          <hr />
          <div className="row">
            <h4 className="mb-3 col-10">Оповещения:</h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-plus m-0 col-2"
              style={{ cursor: "pointer" }}
              viewBox="0 0 16 16"
              onClick={() => {
                set_show_new_notification(true);
              }}
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
            </svg>
          </div>

          {notifications.length === 0
            ? "Не добавлено ни одного правила оповещения"
            : ""}
        </div>
      </div>
      {notifications.map((item, i) => {
        return (
          <div key={i} className="row">
            <div className="col-6 m-auto">
              <div key={i} className="row">
                <div className="col-10">
                  <div className="row">
                    <div className="col-auto">Оповестить, когда цена будет</div>
                    <div className="col-auto">
                      {item.operator === "<" ? "меньше" : "больше"}
                    </div>
                    <div className="col-auto">{item.value}</div>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="red"
                  className="bi bi-plus m-0 col-2"
                  style={{ cursor: "pointer" }}
                  viewBox="0 0 16 16"
                  onClick={(e) => {
                    e.preventDefault();
                    delete_notification(item.id).then((result) => {
                      if (result.error === false) {
                        fetch_notifications(props.good_id);
                      }
                    });
                  }}
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
      {show_new_notification && (
        <>
          <br />
          <div className="row">
            <div className="col-6 m-auto">
              <div className="row">
                <hr />
                <h4 className="mb-3 col-10">Новое оповещение:</h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-plus m-0 col-2"
                  style={{ cursor: "pointer" }}
                  viewBox="0 0 16 16"
                  onClick={() => {
                    set_show_new_notification(false);
                  }}
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
              <div className="row m-auto">
                <div className="col-auto p-0">
                  <div className="">Оповестить, когда цена будет</div>
                </div>
                <div className="col-auto p-0">
                  <select
                    className={`${c.transparent} text-white py-0`}
                    aria-label="Default select example"
                    defaultValue={notification.operator}
                    onChange={(event) => {
                      set_notification({
                        ...notification,
                        operator: event.target.value,
                      });
                    }}
                  >
                    {operators.map((name, i) => {
                      return (
                        <option key={i} value={name}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <input
                    type="text"
                    value={notification.value}
                    onChange={(e) =>
                      set_notification({
                        ...notification,
                        value: e.target.value,
                      })
                    }
                    className={`p-0 form-control m-0 ${c.transparent} text-white`}
                    id="sum"
                    placeholder="сумма..."
                  />
                </div>
              </div>

              <div className="row m-auto py-2">
                <button
                  onClick={add_notification}
                  className="btn col-auto btn-secondary"
                >
                  Добавить
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <br />
    </div>
  );
};

export default Notifications;
