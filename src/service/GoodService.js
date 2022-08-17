import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./config";
import { get_objects_by_field, delete_object_by_id, delete_objects_by_field, edit_object } from "./FirebaseService";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const edit_notification = async (rule) => {
  return await edit_object(rule, "rules");
};

const edit_link = async (link) => {
  return await edit_object(link, "links");
};

const edit_good = async (good) => {
  return await edit_object(good, "goods");
};

const edit_folder = async (folder) => {
  return await edit_object(folder, "folder");
};

const delete_link = async (link_id) => {
  let result = await delete_objects_by_field("prices", "link_id", link_id);

  if (result.error === false) {
    result = await delete_object_by_id(link_id, "links");
  }

  return result;
};

const delete_notification = async (link_id) => {
  const result = await delete_object_by_id(link_id, "rules");

  return result;
};

const delete_goods_prices = async (good_id) => {
  const response = await delete_objects_by_field("prices", "good_id", good_id);

  return response;
};

const delete_goods_links = async (good_id) => {
  let result = await delete_goods_prices(good_id);

  if (result.error === false) {
    result = await delete_objects_by_field("links", "good_id", good_id);
  }

  return result;
};

const delete_good = async (good_id) => {
  let result = await delete_goods_links(good_id);

  if (result.error === false) {
    result = await delete_object_by_id(good_id, "rules");
  }

  if (result.error === false) {
    result = await delete_object_by_id(good_id, "goods");
  }

  return result;
};

const delete_folder = async (folder_id) => {
  try {
    const goods = query(
      collection(db, "goods"),
      where("folder_id", "==", folder_id)
    );

    await getDocs(goods).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        delete_good(doc.id);
      });
    });

    await deleteDoc(doc(db, "folder", folder_id));

    return { error: false, message: "Успешно удалено" };
  } catch (e) {
    console.error("Error deleting folder: ", e);

    return { error: true, message: "Ошибка при удалении папки" };
  }
};

const get_goods = async (folder_id = "0") => {
  return await get_objects_by_field("folder_id", folder_id, "goods");
};

const get_links = async (good_id) => {
  return await get_objects_by_field("good_id", good_id, "links");
};

const get_folders = async (folder_id = "0") => {
  return await get_objects_by_field("parent_id", folder_id, "folder");
};

const get_prices = async (link_id) => {
  return await get_objects_by_field("link_id", link_id, "prices", "date", true);
};

const get_notifications = async (good_id) => {
  return await get_objects_by_field("good_id", good_id, "rules");
};

export {
  get_goods,
  get_links,
  get_prices,
  get_folders,
  get_notifications,
  edit_good,
  edit_folder,
  edit_link,
  edit_notification,
  delete_good,
  delete_link,
  delete_folder,
  delete_notification,
};
