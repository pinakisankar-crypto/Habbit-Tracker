const DB_NAME = "habitTrackerDB";
const DB_VERSION = 1;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("habits")) {
        db.createObjectStore("habits", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
      console.log("DB is successgully initialized");
    };
    request.onerror = () => {
      reject("IndexedDB Error");
    };
  });
};
