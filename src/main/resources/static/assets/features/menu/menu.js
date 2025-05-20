import { formatDate } from "../../common/util.js";

// export function initMenuCard(date) {
//     // 첫 렌더링은 달력에서 처리
//     renderMenuCard(date)
// }

export function renderMenuCard(date) {
    // calendar에 있는 menu 영역(menu-card)
    const container = document.getElementById("menu-card");
    const fixedMenu = ["고구마치즈돈까스", "치즈돈까스"];

    let dateFormat = formatDate(date);
    console.log(dateFormat)
    fetch(`/findMenu?menuDate=${dateFormat}`)
        .then(res => res.text())
        .then(data => {
            const menuitem = data.split(" ",).map(item => item.trim());
            container.innerHTML = `
            <div class="menu-header">
              <h2>학생식당</h2>
              <span class="location">본관 지하 1층</span>
            </div>
            <div class="time">11:00 ~ 13:30</div>
            ${
                !data || data.length === 0
                    ? "<p>식단 정보가 없습니다.</p>"
                    : `
                      <ul class="menu-list">${menuitem.map(item => `<li>${item}</li>`)}</ul>
                      <hr />
                      <h3>고정 메뉴</h3>
                      <ul class="fixed-list">${fixedMenu.map(item => `<li>${item}</li>`).join("")}</ul>
                      <div class="price">가격: 6,000원</div>
                    `
            }
      `;
    });


}
