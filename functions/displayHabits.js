import { deleteHabit } from "./deleteHabits.js";
import { updateHabit } from "./updateHabit.js";
import { loadHabits } from "./loadHabits.js";

const habitsBox = document.querySelector('.habits');

export const displayHabits = (habits) => {
  habitsBox.innerHTML = '';

  habits.forEach(habit => {
    const habitCard = `
        <div class="habit-box ${habit.completed ? 'completed' : ''}" data-id="${habit.id}">
            <div>
                <div class="habit-icon"></div>
                <p class="habit-text">${habit.name}</p> 
            </div>
            <div>
                <i class="del-habit fa-solid fa-trash"></i>
                <div class="checkMark">
                <i class="fa-solid fa-check"></i>
                </div>
            </div>
        </div>`;
    habitsBox.insertAdjacentHTML("afterbegin", habitCard);
  });

  updateProgress(habits);
};

const updateProgress = (habits) => {
  const completed = habits.filter(h => h.completed).length;
  const pending = habits.length - completed;
  const progress = habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0;

  const circleProgress = document.querySelector('circle-progress');
  if (circleProgress) {
    circleProgress.value = progress;
  }

  document.getElementById('completedNum').textContent = completed;
  document.getElementById('pendingNum').textContent = pending;
};

habitsBox.addEventListener('click', async (e) => {
    if (e.target.closest('.checkMark')) {
        const card = e.target.closest('.habit-box');
        const id = parseInt(card.dataset.id, 10);
        const currentCompleted = card.classList.contains('completed');
        await updateHabit(id, { completed: !currentCompleted });
        loadHabits();
    }

    else if (e.target.classList.contains('del-habit')) {
        const card = e.target.closest('.habit-box');
        const id = parseInt(card.dataset.id, 10);
        await deleteHabit(id);
        card.remove();
        loadHabits();
    }
});
