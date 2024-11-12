// app.js

let db;

// Membuka database IndexedDB atau membuat baru
const openDatabase = () => {
    const request = indexedDB.open("PWAData", 1);

    request.onerror = (event) => {
        console.error("Error membuka database:", event.target.error);
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log("Database dibuka atau dibuat:", db);
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        // Membuat object store untuk menyimpan data
        const objectStore = db.createObjectStore("items", { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("name", "name", { unique: false });
        console.log("Object Store 'items' dibuat");
    };
};

// Menyimpan data ke IndexedDB
const saveData = () => {
    if (!db) {
        console.log("Database belum siap.");
        return;
    }

    const transaction = db.transaction(["items"], "readwrite");
    const objectStore = transaction.objectStore("items");

    const data = {
        name: "Item PWA",
        description: "Ini adalah contoh penyimpanan data di IndexedDB",
        timestamp: new Date()
    };

    const request = objectStore.add(data);

    request.onsuccess = () => {
        console.log("Data berhasil disimpan.");
    };

    request.onerror = (event) => {
        console.error("Gagal menyimpan data:", event.target.error);
    };
};

// Mengambil data dari IndexedDB
const getData = () => {
    if (!db) {
        console.log("Database belum siap.");
        return;
    }

    const transaction = db.transaction(["items"], "readonly");
    const objectStore = transaction.objectStore("items");

    const request = objectStore.getAll();

    request.onsuccess = (event) => {
        console.log("Data yang diambil:", event.target.result);
    };

    request.onerror = (event) => {
        console.error("Gagal mengambil data:", event.target.error);
    };
};

// Menghapus semua data dalam IndexedDB
const clearData = () => {
    if (!db) {
        console.log("Database belum siap.");
        return;
    }

    const transaction = db.transaction(["items"], "readwrite");
    const objectStore = transaction.objectStore("items");

    const request = objectStore.clear();

    request.onsuccess = () => {
        console.log("Semua data telah dihapus.");
    };

    request.onerror = (event) => {
        console.error("Gagal menghapus data:", event.target.error);
    };
};

// Menyiapkan IndexedDB saat halaman dimuat
window.onload = () => {
    openDatabase();
};
