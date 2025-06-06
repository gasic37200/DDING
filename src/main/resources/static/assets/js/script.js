 /* 
   기본 동작:
  - 기본값(USE_DUMMY_DATA = true)로 더미 데이터를 사용하여 화면 미리보기가 가능합니다.

   실제 API 연동 시:
  - 아래 USE_DUMMY_DATA 값을 false로 변경하세요. (18번째 줄)

   API 응답 형식 (JSON):
  {
    "2025-04-16": { menu: ["김치", "된장국"] },    //매일 바뀌는 메인 메뉴들의 값만 입력해 주세요.(고정 메뉴 제외)
    "2025-04-17": { menu: ["불고기", "쌀밥", "미역국"] }
  }

   실제 백엔드 API 호출 위치 →  34번째 줄
*/


const USE_DUMMY_DATA = true;  //  false로 설정 시 실제 백엔드 API 사용

let currentDate = new Date();
let selectedDate = new Date();
let allMeals = {};  //  날짜별 식단 데이터를 저장할 전역 객체

function fetchAllMeals(callback) {
  if (USE_DUMMY_DATA) {
    // 테스트용 더미 데이터
    allMeals = {
      "2025-04-16": { menu: ["김치", "김치", "김치", "김치", "김치"] },
      "2025-04-17": { menu: ["김치", "김치", "김치", "김치", "김치"] },
    };
    selectedDate = new Date(); 
    callback();  //  더미 데이터 로딩 완료 후 렌더링 실행
  } else {
    fetch("https://your-backend.com/api/meals")  //  백엔드 데이터 요청 (식단 정보)
      .then((response) => response.json())       //  JSON 형식으로 파싱
      .then((data) => {
        allMeals = data;                         //  받은 데이터를 전역 변수에 저장
        selectedDate = new Date();
        callback();                              //  렌더링 콜백 실행
      })
      .catch((error) => {
        console.error(" 식단 정보를 불러오는 데 실패했습니다:", error);
        allMeals = {}; 
        selectedDate = new Date();
        callback(); 
      });
  }
}

function renderCalendar(date) {
  const calendarTable = document.getElementById("calendar-table");
  const calendarMonth = document.getElementById("calendar-month");

  const year = date.getFullYear();
  const month = date.getMonth();
  calendarMonth.textContent = `${year}년 ${month + 1}월`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let html = "<thead><tr>";
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  for (const day of days) html += `<th>${day}</th>`;
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

    html += `<td class="${isToday ? "today" : ""} ${isSelected ? "selected" : ""}" data-date="${thisDate}">${d}</td>`;
    dayCount++;
    if (dayCount % 7 === 0) html += "</tr><tr>";
  }

  while (dayCount % 7 !== 0) {
    html += "<td></td>";
    dayCount++;
  }

  html += "</tr></tbody>";
  calendarTable.innerHTML = html;

  //  날짜 클릭 시 선택 및 식단 갱신
  calendarTable.querySelectorAll("td[data-date]").forEach((td) => {
    td.addEventListener("click", () => {
      selectedDate = new Date(td.dataset.date);
      renderCalendar(currentDate);
      renderMealCard(selectedDate);
    });
  });
}

function renderMealCard(date) {
  const mealCard = document.getElementById("meal-card");
  const dateString = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

  const title = "학생식당";
  const time = "11:00 ~ 13:30";
  const location = "본관 지하 1층";
  const price = "6,000원";
  const fixedMenu = ["고구마치즈돈까스", "치즈돈까스"];  //  고정 메뉴는 하드코딩됨

  const menuData = allMeals[dateString];  //  날짜별 식단 데이터
  const menu = menuData ? menuData.menu : null;  //   백엔드에서 데이터 들어가는 곳

  mealCard.innerHTML = `
    <div class="meal-header"><h2>${title}</h2><span class="location">${location}</span></div>
    <div class="time">${time}</div>
    ${
      !menu || menu.length === 0
        ? "<p>식단 정보가 없습니다.</p>"  //  데이터 없음
        : `
      <ul class="meal-list">${menu.map((item) => `<li>${item}</li>`).join("")}</ul>
      <hr />
      <h3>고정 메뉴</h3>
      <ul class="fixed-list">${fixedMenu.map((item) => `<li>${item}</li>`).join("")}</ul>
      <div class="price">가격: ${price}</div>
      `
    }
  `;
}

function showMain() {
  const mainContent = document.getElementById("main-content");

  //  메인 페이지 렌더링
  mainContent.innerHTML = `
    <div class="left-side">
      <div class="calendar-container">
        <div id="calendar-header" class="calendar-header">
          <button id="prev-month">&lt;</button>
          <span id="calendar-month"></span>
          <button id="next-month">&gt;</button>
        </div>
        <table class="calendar" id="calendar-table"></table>
      </div>
    </div>

    <div class="menu-card" id="menu-card"></div>
  `;

  //  월 변경 버튼 동작
  document.getElementById("prev-month").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  };

  document.getElementById("next-month").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  };

  //  초기 렌더링
  renderCalendar(currentDate);
  renderMealCard(selectedDate);

  //  데이터 로딩 → 렌더링
  fetchAllMeals(() => {
    renderCalendar(currentDate);
    renderMealCard(selectedDate);
  });
}

//  간단한 페이지 (게시판, 마이페이지 등)
function showSimplePage(pageName) {
  const mainContent = document.getElementById("main-content");
  const titles = {
    board: "게시판 페이지입니다.",
    mypage: "마이페이지입니다.",
    login: "로그인 페이지입니다.",
  };
  mainContent.innerHTML = `<div class="simple-page"><h2>${titles[pageName] || "페이지 없음"}</h2></div>`;
}

//  SPA 해시 라우팅 처리
function handleRoute() {
  const hash = location.hash.replace("#", "");
  if (hash === "" || hash === "menu") {
    showMain();
  } else {
    showSimplePage(hash);
  }
}

window.addEventListener("DOMContentLoaded", handleRoute);
window.addEventListener("hashchange", handleRoute);
