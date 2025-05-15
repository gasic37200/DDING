import { formatDate } from "../../common/util.js";
import { renderMealCard } from "../meal/meal.js";

let currentDate = new Date();
let selectedDate = new Date();

export function initCalendar() {
    renderCalendar(currentDate);
}

function renderCalendar(date) {
    const container = document.getElementById("main-content");

    container.innerHTML = `
    <div class="calendar-container">
      <div class="calendar-header">
        <button id="prev-month">&lt;</button>
        <span id="calendar-month">${date.getFullYear()}년 ${date.getMonth() + 1}월</span>
        <button id="next-month">&gt;</button>
      </div>
      <table class="calendar-table" id="calendar-table"></table>
    </div>
    <div id="meal-card"></div>
  `;

    document.getElementById("prev-month").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    };

    document.getElementById("next-month").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    };

    renderDates(date);
}

function renderDates(date) {
    const table = document.getElementById("calendar-table");
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let html = "<thead><tr>";
    ["일", "월", "화", "수", "목", "금", "토"].forEach(day => html += `<th>${day}</th>`);
    html += "</tr></thead><tbody><tr>";

    let dayCount = 0;
    for (let i = 0; i < firstDay; i++) {
        html += "<td></td>";
        dayCount++;
    }

    for (let d = 1; d <= lastDate; d++) {
        const thisDate = new Date(year, month, d);
        const isToday = thisDate.toDateString() === new Date().toDateString();
        const isSelected = thisDate.toDateString() === selectedDate.toDateString();
        html += `<td class="${isToday ? "today" : ""} ${isSelected ? "selected" : ""}" data-date="${thisDate.toISOString()}">${d}</td>`;
        dayCount++;
        if (dayCount % 7 === 0) html += "</tr><tr>";
    }

    while (dayCount % 7 !== 0) {
        html += "<td></td>";
        dayCount++;
    }

    html += "</tr></tbody>";
    table.innerHTML = html;

    // 날짜 클릭 처리
    table.querySelectorAll("td[data-date]").forEach(td => {
        td.addEventListener("click", () => {
            selectedDate = new Date(td.dataset.date);
            renderCalendar(currentDate);
            renderMealCard(selectedDate);
        });
    });

    renderMealCard(selectedDate);
}