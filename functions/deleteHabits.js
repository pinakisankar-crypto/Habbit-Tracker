import { initDB } from "../config/db.config.js";

export const deleteHabit = async (id) => {
  try {
    const db = await initDB();
    const transaction = db.transaction(["habits"], "readwrite");
    const store = transaction.objectStore("habits");
    const request = store.delete(id);

    request.onsuccess = () => {
      console.log("Habit deleted successfully!");
    };

    request.onerror = () => {
      console.error("Failed to delete habit");
    };
  } catch (err) {
    console.error("Failed to delete habit:", err);
  }
};