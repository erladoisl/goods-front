
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    orderBy,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAcUQCGoycGVdR98Ocusf4aEs0tlZo_SGE",
    authDomain: "goods-gazer.firebaseapp.com",
    projectId: "goods-gazer",
    storageBucket: "goods-gazer.appspot.com",
    messagingSenderId: "514677023453",
    appId: "1:514677023453:web:7227fe4faca68aa29d3134"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


const add_goods = async (good) => {
    try {
        const goodRef = await addDoc(collection(db, "goods"), good);
        console.log("Document written with ID: ", goodRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const get_goods = async () => {
    const goods = [];
    try {
        await getDocs(collection(db, 'goods'))
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    goods.push({ ...doc.data(), id: doc.id });
                });
            });
    } catch (err) {
        console.error(err);
        alert(err.message);
    } finally {
        return goods;
    }

};

const get_links = async (good_id) => {
    const links = [];
    try {
        const q = query(collection(db, 'links'), where('good_id', '==', good_id))

        await getDocs(q)
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    links.push({ ...doc.data(), id: doc.id });
                });
            });
    } catch (err) {
        console.error(err);
        alert(err.message);
    } finally {
        return links;
    }
};

const get_prices = async (link_id) => {
    const links = [];
    try {
        const q = query(collection(db, 'prices'), orderBy("date"), where('link_id', '==', link_id))

        await getDocs(q)
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    links.push({ ...doc.data(), id: doc.id });
                });
            });
    } catch (err) {
        console.error(err);
        alert(err.message);
    } finally {
        return links;
    }
};
export {
    get_goods,
    add_goods,
    get_links,
    get_prices
}