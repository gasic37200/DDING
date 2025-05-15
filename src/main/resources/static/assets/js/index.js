import { initCalendar } from "../features/calendar/calendar.js";
import { initMealCard } from "../features/meal/meal.js";

window.addEventListener("DOMContentLoaded", () => {
    initCalendar();
    initMealCard();
});