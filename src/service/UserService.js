import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  firebase
} from "firebase/firestore";

import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }

    return {
      error: false,
      message: 'Успешно'
    };
  } catch (err) {
    console.error(`Login error with google  ${err.message}`);

    return {
      error: true,
      message: `Ошибка входа по учетной записи google. Пожалуйста, попробуйте позже.`,
    };
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    return {
      error: false,
      message: 'Успешно'
    };
  } catch (err) {
    console.error(`Login error  ${err.message}`);

    return {
      error: true,
      message: `Ошибка входа. Пожалуйста, попробуйте позже.`,
    };
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    return {
      error: false,
      message: 'Успешно'
    };
  } catch (err) {
    alert(err.message)
    console.log(err)
    console.error(`Login error  ${err.message}`);

    return {
      error: true,
      message: `Ошибка регистрации. Пожалуйста, попробуйте позже.`,
    };
  }
};

const sendPasswordReset = async (email) => {
  try {
    const message = "Ссылка на пароль была отправлена по почте!"
    await sendPasswordResetEmail(auth, email);
    alert(message);

    return {
      error: false,
      message: message
    };
  } catch (err) {
    console.error(`Login error  ${err.message}`);

    return {
      error: true,
      message: `Ошибка смены пароля. Пожалуйста, попробуйте позже.`,
    };
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
