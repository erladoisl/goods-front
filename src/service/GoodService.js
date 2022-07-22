
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
    doc, deleteDoc
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


const edit_good = async (good) => {
    try {
        let goodRef = {};

        if (good.id != -1) {
            const good_doc = doc(db, 'goods', good.id)
            goodRef = await updateDoc(good_doc, good);
        } else {
            goodRef = await addDoc(collection(db, "goods"), good);
        }
        const good_id = good.id === -1 ? goodRef.id : good.id

        return { error: false, message: '', id: good_id };
    } catch (e) {
        console.error("Error adding good: ", e);

        return { error: true, message: 'Ошибка при добавлении продукта', id: good.id };
    };
};

const delete_link = async (link_id) => {
    try {
        await deleteDoc(doc(db, 'links', link_id))

        return { error: false, message: 'Успешно удалено' };
    } catch (e) {
        console.error("Error deleting link: ", e);

        return { error: true, message: 'Ошибка при удалении ссылки' };
    }
}

const delete_goods_prices = async (good_id) => {
    const prices = query(collection(db, 'prices'), where('good_id', '==', good_id))

    await getDocs(prices)
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                deleteDoc(doc)
            });
        });
}

const delete_goods_links = async (good_id) => {
    const links = query(collection(db, 'links'), where('good_id', '==', good_id))

    await getDocs(links)
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                deleteDoc(doc)
            });
        });
}

const delete_good = async (good_id) => {
    try {          
        await delete_goods_prices(good_id)
        await delete_goods_links(good_id);
        await deleteDoc(doc(db, 'goods', good_id))

        return { error: false, message: 'Успешно удалено' };
    } catch (e) {
        console.error("Error deleting good: ", e);

        return { error: true, message: 'Ошибка при удалении продукта' };
    }
}

const delete_folder = async (folder_id) => {
    try {  
        const goods = query(collection(db, 'goods'), where('folder_id', '==', folder_id))

        await getDocs(goods)
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    delete_good(doc.id)
                });
            });

        await deleteDoc(doc(db, 'folders', folder_id))

        return { error: false, message: 'Успешно удалено' };
    } catch (e) {
        console.error("Error deleting folder: ", e);

        return { error: true, message: 'Ошибка при удалении папки' };
    }
}

const add_link = async (link) => {
    try {
        const linkRef = await addDoc(collection(db, "links"), link);

        return { error: false, message: '', id: linkRef.id }
    } catch (e) {
        console.error("Error adding link: ", e);
        return { error: true, message: 'Ошибка при добавлении ссылки', id: -1 }
    }
};


const get_goods = async (folder_id = '0') => {
    const goods = [];
    try {
        const q = query(collection(db, 'goods'), where('folder_id', '==', folder_id))

        await getDocs(q)
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

const get_folders = async (folder_id = '0') => {
    const folders = [];
    try {
        const q = query(collection(db, 'folder'), where('parent_id', '==', folder_id))

        await getDocs(q)
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    folders.push({ ...doc.data(), id: doc.id });
                });
            });
    } catch (err) {
        console.error(err);
        alert(err.message);
    } finally {
        return folders;
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
    edit_good,
    get_links,
    get_prices,
    add_link,
    delete_good,
    delete_link,
    get_folders,
    delete_folder
}