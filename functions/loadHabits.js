import { initDB } from "../config/db.config.js";
import { displayHabits } from "./displayHabits.js";

export const loadHabits = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction(["habits"], "readonly");
    const store = transaction.objectStore("habits");
    const request = store.getAll();

    request.onsuccess = () => {
      const habits = request.result;
      displayHabits(habits);
    };

    request.onerror = () => {
      console.error("Failed to load habits");
    };
  } catch (err) {
    console.error("Failed to load habits:", err);
  }
};
