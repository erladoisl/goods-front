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
import { auth } from "./UserService";
import { admin_uids } from "./config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const edit_object = async (object, object_name) => {
  try {
    let objectRef = {};

    if (object.id && object.id !== -1) {
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

const get_objects_by_field = async (
  field_name,
  field_value,
  object_collection_name,
  ordered_field_name = "",
  ordered = false
) => {
  let objects = [];
  let q = null;
  const user = auth.currentUser;

  try {
    if (user !== null) {
      if (ordered) {
        q = query(
          collection(db, object_collection_name),
          orderBy(ordered_field_name),
          where(field_name, "==", field_value)
        );
      } else if (
        ["folder", "goods"].indexOf(object_collection_name) !== -1 &&
        admin_uids.indexOf(user.uid) === -1
      ) {
        q = query(
          collection(db, object_collection_name),
          where(field_name, "==", field_value),
          where("user_uid", "==", user.uid)
        );
      } else {
        q = query(
          collection(db, object_collection_name),
          where(field_name, "==", field_value)
        );
      }
      await getDocs(q).then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          objects.push({ ...doc.data(), id: doc.id });
        });
      });
    }
  } catch (err) {
    console.error(err);
    // alert(err.message);
  } finally {
    return objects;
  }
};

export {
  edit_object,
  delete_object_by_id,
  delete_objects_by_field,
  get_objects_by_field,
};
