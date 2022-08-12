import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  orderBy,
  where,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const edit_object = async (object, object_name) => {
  try {
    let objectRef = {};

    if (object.id !== -1) {
      const object_doc = doc(db, object_name, object.id);
      objectRef = await updateDoc(object_doc, object);
    } else {
      objectRef = await addDoc(collection(db, object_name), object);
    }
    const object_id = object.id === -1 ? objectRef.id : object.id;

    return { error: false, message: "", id: object_id };
  } catch (e) {
    console.error(`Error adding ${object_name}: `, e);

    return {
      error: true,
      message: `Ошибка при добавлении ${object}`,
      id: object.id,
    };
  }
};

const edit_rule = async (rule) => {
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

const delete_object_by_id = async (id, object_collection_name) => {
  try {
    await deleteDoc(doc(db, object_collection_name, id));

    return { error: false, message: "Успешно удалено" };
  } catch (e) {
    console.error(`Error deleting object ${object_collection_name}`, e);

    return {
      error: true,
      message: `Ошибка при удалении ${object_collection_name}`,
    };
  }
};

const delete_objects_by_field = async (
  object_collection_name,
  field_name,
  field_value
) => {
  try {
    const q = query(
      collection(db, object_collection_name),
      where(field_name, "==", field_value)
    );

    await getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.forEach((object) => {
        deleteDoc(doc(db, object_collection_name, object.id));
      });
    });
    return {
      error: false,
      message: `Успешно удален объект ${object_collection_name}`,
    };
  } catch (e) {
    console.error(
      `Error deleting ${object_collection_name} by ${field_name} === ${field_value}`,
      e
    );

    return { error: true, message: "Ошибка при удалении продукта" };
  }
};

const delete_link = async (link_id) => {
  delete_objects_by_field("prices", "link_id", link_id).then((result) => {
    if (result.error === false) {
      delete_object_by_id(link_id, "links").then((result) => {
        return result;
      });
    } else return result;
  });
};

const delete_rule = async (link_id) => {
  const result = await delete_object_by_id(link_id, "rules")

  return result
};

const delete_goods_prices = async (good_id) => {
  const response = await delete_objects_by_field("prices", "good_id", good_id);

  return response;
};

const delete_goods_links = async (good_id) => {
  let result = await delete_goods_prices(good_id);

  if (result.error === false) {
    result = await delete_objects_by_field("links", "good_id", good_id);

    return result;
  }
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

const get_objects_by_field = async (
  field_name,
  field_value,
  object_name,
  ordered_field_name = "",
  ordered = false
) => {
  let objects = [];
  let q = null;

  try {
    if (ordered) {
      q = query(
        collection(db, object_name),
        orderBy(ordered_field_name),
        where(field_name, "==", field_value)
      );
    } else {
      q = query(
        collection(db, object_name),
        where(field_name, "==", field_value)
      );
    }

    await getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        objects.push({ ...doc.data(), id: doc.id });
      });
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    return objects;
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

const get_rules = async (good_id) => {
  return await get_objects_by_field("good_id", good_id, "rules");
};

export {
  get_goods,
  get_links,
  get_prices,
  get_folders,
  get_rules,
  edit_good,
  edit_folder,
  edit_link,
  edit_rule,
  delete_good,
  delete_link,
  delete_folder,
  delete_rule,
};
