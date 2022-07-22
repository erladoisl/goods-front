import React, { useEffect } from "react";
import { useState } from "react";
import { get_folders, delete_folder } from "../../../service/GoodService";
import Folder from "./Folder/Folder";

const Folders = (props) => {
  const [folders, set_folders] = useState([]);

  useEffect(() => {
    fetch_folders();
  }, [props.folder_id]);

  const fetch_folders = async () => {
    get_folders(props.folder_id).then((response) => {
      set_folders(response);
    });
  };

  return (
    <>
      {folders.map((item, i) => {
        return (
          <tr key={i}>
            <Folder item={item} parent_folder_id={props.folder_id} />
            <td className="col-1">
              <button
                className="btn btn-danger"
                onClick={() => {
                  delete_folder(item.id).then((result) => {
                    if (result.error === false) {
                      fetch_folders();
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

export default Folders;
