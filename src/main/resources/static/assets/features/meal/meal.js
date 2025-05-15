import { formatDate } from "../../common/util.js";

let allMeals = {
    "2025-05-14": { menu: ["김치", "된장국", "불고기"] },
};

export function initMealCard() {
    // 첫 렌더링은 달력에서 처리
}

export function renderMealCard(date) {
    const container = document.getElementById("meal-card");
    const dateKey = formatDate(date);
    const meal = allMeals[dateKey];
    const fixedMenu = ["고구마치즈돈까스", "치즈돈까스"];

    container.innerHTML = `
    <div class="meal-header">
      <h2>학생식당</h2>
      <span class="location">본관 지하 1층</span>
    </div>
    <div class="time">11:00 ~ 13:30</div>
    ${
        !meal
            ? "<p>식단 정보가 없습니다.</p>"
            : `
      <ul class="meal-list">${meal.menu.map(item => `<li>${item}</li>`).join("")}</ul>
      <hr />
      <h3>고정 메뉴</h3>
      <ul class="fixed-list">${fixedMenu.map(item => `<li>${item}</li>`).join("")}</ul>
      <div class="price">가격: 6,000원</div>
    `
    }
  `;
}