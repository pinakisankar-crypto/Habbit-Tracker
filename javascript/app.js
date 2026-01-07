import { initDB } from "../config/db.config.js";
import { loadHabits } from "../functions/loadHabits.js";
const closeFormButton = document.querySelector("#close-form");
const addHabbitBox = document.querySelector(".addHabitBox");
const openFormButton = document.querySelector("#addHabitBtn");
const backgroundOpaque = document.querySelector(".opaque-box");
const habitForm = document.querySelector("#habitForm");
const habitName = document.querySelector(".habit-text");

(function () {
  // initDB();
  loadHabits();
})();

closeFormButton.addEventListener("click", () => {
  addHabbitBox.style.display = "none";
  backgroundOpaque.style.display = "none";
});

openFormButton.addEventListener("click", () => {
  addHabbitBox.style.display = "block";
  backgroundOpaque.style.display = "block";
});

habitForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newHabit = {
    name: habitName.value.trim(),
    completed: false,
  };

  try {
    const db = await initDB();
    const transaction = db.transaction(["habits"], "readwrite");
    const store = transaction.objectStore("habits");

    const request = store.add(newHabit);

    request.onsuccess = () => {
      console.log("Habit added successfully!");
      habitForm.reset();
      loadHabits();
      addHabbitBox.style.display = "none";
      backgroundOpaque.style.display = "none";
      alert("Habit Created Locally!");
    };
  } catch (err) {
    console.error("Failed to save habit:", err);
  }

  //TODO: Need to add logic for quick suggestions

});

