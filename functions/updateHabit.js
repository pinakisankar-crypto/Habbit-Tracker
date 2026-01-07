import { initDB } from "../config/db.config.js";

export const updateHabit = async (id, updates) => {
  try {
    const db = await initDB();
    const transaction = db.transaction(["habits"], "readwrite");
    const store = transaction.objectStore("habits");

    const getRequest = store.get(id);
    getRequest.onsuccess = () => {
      const habit = getRequest.result;
      if (habit) {
        const updatedHabit = { ...habit, ...updates };
        const putRequest = store.put(updatedHabit);
        putRequest.onsuccess = () => {
          console.log("Habit updated successfully!");
        };
        putRequest.onerror = () => {
          console.error("Failed to update habit");
        };
      }
    };
    getRequest.onerror = () => {
      console.error("Failed to retrieve habit for update");
    };
  } catch (err) {
    console.error("Failed to update habit:", err);
  }
};