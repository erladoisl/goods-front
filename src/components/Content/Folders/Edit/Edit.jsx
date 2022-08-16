import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { edit_folder } from "../../../../service/GoodService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../service/UserService";

const Edit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const close_button = useRef(null);
  const [user, loading, error] = useAuthState(auth);
  const [folder, set_folder_name] = useState({
    id: -1,
    name: "",
    parent_id: state && state.folder_id ? state.folder_id : "0",
    user_uid: -1,
  });

  useEffect(() => {
    if (loading) return;
    if (user) {
      set_folder_name({ ...folder, user_uid: user.uid });
    }
  }, [user, loading]);

  const go_to_folder = (folder_id) => {
    navigate("/content", { state: { folder_id: folder_id } });
    close_button.current.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    );
  };

  const addLinkSubmit = () => {
    if (folder.name !== "") {
      edit_folder(folder).then(function (result) {
        if (result.error === false) {
          set_folder_name({ ...folder, name: "" });
          go_to_folder(result.id);
        } else {
          alert(result.message);
        }
      });
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-lg btn-dark m-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Добавить папку
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Новая папка
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={close_button}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 m-1">
                  {/* <label for="address" className="form-label">Название магазина</label> */}
                  <input
                    type="text"
                    value={folder.name}
                    onChange={(e) =>
                      set_folder_name({ ...folder, name: e.target.value })
                    }
                    className="form-control"
                    id="address"
                    placeholder="Название папки"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-lg m-2 btn-secondary"
                data-bs-dismiss="modal"
              >
                Отмена
              </button>
              <button
                type="button"
                className="btn btn-lg btn-success m-2"
                onClick={addLinkSubmit}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
