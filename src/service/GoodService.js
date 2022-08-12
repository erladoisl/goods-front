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

const edit_good = async (good) => {
  return await edit_object(good, "goods");
};

const edit_folder = async (folder) => {
  return await edit_object(folder, "folder");
};

const delete_link = async (link_id) => {
  try {
    await deleteDoc(doc(db, "links", link_id));

    return { error: false, message: "Успешно удалено" };
  } catch (e) {
    console.error("Error deleting link: ", e);

    return { error: true, message: "Ошибка при удалении ссылки" };
  }
};

const delete_goods_prices = async (good_id) => {
  const prices = query(
    collection(db, "prices"),
    where("good_id", "==", good_id)
  );

  await getDocs(prices).then((querySnapshot) => {
    querySnapshot.docs.forEach((price) => {
      deleteDoc(doc(db, "prices", price.id));
    });
  });
};

const delete_goods_links = async (good_id) => {
  const links = query(collection(db, "links"), where("good_id", "==", good_id));
  await delete_goods_prices(good_id);

  await getDocs(links).then((querySnapshot) => {
    querySnapshot.docs.forEach((link) => {
      deleteDoc(doc(db, "links", link.id));
    });
  });
};

const delete_good = async (good_id) => {
  try {
    await delete_goods_prices(good_id);
    await delete_goods_links(good_id);
    await deleteDoc(doc(db, "goods", good_id));

    return { error: false, message: "Успешно удалено" };
  } catch (e) {
    console.error("Error deleting good: ", e);

    return { error: true, message: "Ошибка при удалении продукта" };
  }
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

const add_link = async (link) => {
  try {
    const linkRef = await addDoc(collection(db, "links"), link);

    return { error: false, message: "", id: linkRef.id };
  } catch (e) {
    console.error("Error adding link: ", e);
    return { error: true, message: "Ошибка при добавлении ссылки", id: -1 };
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
  add_link,
  edit_good,
  edit_folder,
  delete_good,
  delete_link,
  delete_folder,
};
