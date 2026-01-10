import { initDB } from "../config/db.config.js";
import { loadHabits } from "../functions/loadHabits.js";
import { loadDate } from "../functions/loadDate.js";

const closeFormButton = document.querySelector("#close-form");
const addHabbitBox = document.querySelector(".addHabitBox");
const openFormButton = document.querySelector("#addHabitBtn");
const backgroundOpaque = document.querySelector(".opaque-box");
const habitForm = document.querySelector("#habitForm");
const habitName = document.querySelector(".habit-text");
const status = document.querySelector(".status");

(function () {
  loadHabits();
  loadDate();
})();

let isOffline = false;

status.addEventListener("click", () => {
  isOffline === false ? (isOffline = true) : (isOffline = false);
  if (isOffline) {
    status.style.backgroundColor = "rgba(255, 3, 3, 0.18)";
    status.style.color = "red";
    status.style.border = "1px solid red";
    status.innerHTML = `<i class="fa-solid fa-wifi"></i> Offline`;
    openFormButton.style.display = "none";
  } else {
    status.style.backgroundColor = "#d8f3dc";
    status.style.color = "#198038";
    status.style.border = "#198038";
    status.innerHTML = `<i class="fa-solid fa-wifi"></i> Online`;
    openFormButton.style.display = "block";
  }
});

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
      Toastify({
        text: "Habit created!!!",
        duration: 3000,
        close: true,
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#198038",
        },
      }).showToast()
    };
  } catch (err) {
    console.error("Failed to save habit:", err);
  }

  //TODO: Need to add logic for quick suggestions
});
