import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  get_links,
  edit_link,
  edit_good,
  delete_link,
} from "../../../../service/GoodService";
import Notifications from "./Notifications/Notifications";

const Edit = () => {
  const { state } = useLocation();
  const [links, set_links] = useState([]);
  const [show_new_link_form, set_show_new_link_form] = useState(false);
  const [goodFormData, setGoodFormData] = useState({
    id: state.id,
    name: state.name,
    user_id: -1,
    folder_id: state.folder_id,
  });

  const [newLinkFormData, setNewLinkFormData] = useState({
    id: -1,
    good_id: goodFormData.id,
    name: "",
    url: "",
    status: "active",
  });

  useEffect(() => {
    if (goodFormData.id !== -1) {
      fetch_links(goodFormData.id);
    }
  }, [goodFormData.id]);

  const fetch_links = async (good_id) => {
    get_links(good_id).then((response) => {
      set_links(response);
    });
  };

  const addGoodSubmit = (e) => {
    e.preventDefault();

    if (goodFormData.name !== "") {
      edit_good(goodFormData).then(function (result) {
        if (result.error === false) {
          setGoodFormData({ ...goodFormData, id: result.id });
          setNewLinkFormData({ ...newLinkFormData, good_id: result.id });
          alert(`Успешно сохранено`);
        } else {
          alert(result.message);
        }
      });
    }
  };

  const addLinkSubmit = (e) => {
    e.preventDefault();

    if (goodFormData.id === -1) {
      alert("Сначала нужно сохранить название товара!");
    } else if (newLinkFormData.name !== "" && newLinkFormData.url !== "") {
      edit_link(newLinkFormData).then(function (result) {
        if (result.error === false) {
          fetch_links(goodFormData.id);
          setNewLinkFormData({
            id: -1,
            ...newLinkFormData,
            name: "",
            url: "",
          });
          set_show_new_link_form(false);
        } else {
          console.log(result);
        }
      });
    }
  };

  return (
    <div className="container text-white">
      <h4 className="mb-3">
        {state.id > 0 ? state.name : "Добавление нового продукта"}
      </h4>
      <br />
      <form className="needs-validation text-start">
        <div className="row my-1">
          <div className="col-6 m-auto">
            <label htmlFor="address" className="form-label">
              Название продукта
            </label>
            <input
              type="text"
              value={goodFormData.name}
              onChange={(e) =>
                setGoodFormData({ ...goodFormData, name: e.target.value })
              }
              className="form-control"
              id="address"
              placeholder="Название продукта"
              required=""
            />
            <div className="invalid-feedback">
              Название продукта обязательно для заполнения.
            </div>
          </div>
        </div>
        <div className="row pt-1">
          <div className="col-6 m-auto">
            <button onClick={addGoodSubmit} className="btn btn-secondary my-2">
              Сохранить
            </button>
            <hr />
          </div>
        </div>
        <div className="container text-white p-0">
          <div className="row">
            <div className="mb-3 col-6 m-auto">
              <div className="row">
                <h4 className="mb-3 col-10">Ссылки на продукт:</h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-plus m-0 col-2"
                  style={{ cursor: "pointer" }}
                  viewBox="0 0 16 16"
                  onClick={() => {
                    set_show_new_link_form(true);
                  }}
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
              </div>

              {links.length === 0
                ? "Не добавлено ни одной ссылки на продукт"
                : "Добавленные ссылки:"}
            </div>
          </div>

          {links.map((item, i) => {
            return (
              <div key={i} className="row">
                <div className="mb-3 col-6 m-auto">
                  <div key={i} className="row">
                    <h4 className="col-10"> {i + 1}) {item.name} </h4>

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
                        delete_link(item.id).then((result) => {
                          if (result.error === false) {
                            fetch_links(goodFormData.id);
                          }
                        });
                      }}
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    <div className="col-12" style={{overflow: 'hidden'}}>Ссылка: {item.url}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {show_new_link_form && (
            <div className="row">
              <div className="col-6 m-auto">
                <hr />
                <div className="row">
                  <div className="mb-3  m-auto">
                    <div className="row">
                      <h4 className="mb-3 col-10">Добавление новой ссылки:</h4>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-plus m-0 col-2"
                        style={{ cursor: "pointer" }}
                        viewBox="0 0 16 16"
                        onClick={() => {
                          set_show_new_link_form(false);
                        }}
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        value={newLinkFormData.name}
                        onChange={(e) =>
                          setNewLinkFormData({
                            ...newLinkFormData,
                            name: e.target.value,
                          })
                        }
                        className="form-control"
                        id="address"
                        placeholder="Название магазина"
                        required=""
                      />
                      <div className="invalid-feedback">
                        Название магазина обязательно для заполнения.
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      value={newLinkFormData.url}
                      onChange={(e) =>
                        setNewLinkFormData({
                          ...newLinkFormData,
                          url: e.target.value,
                        })
                      }
                      className="form-control"
                      id="address"
                      placeholder="Ссылка на товар"
                      required=""
                    />
                    <div className="invalid-feedback">
                      Ссылка на товар обязательно для заполнения.
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      onClick={addLinkSubmit}
                      className="btn btn-secondary my-3"
                    >
                      Добавить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Notifications good_id={state.id} />
      </form>
    </div>
  );
};

export default Edit;
