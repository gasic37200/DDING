import { formatDate } from "../../common/util.js";
import { getMemberNoFromJwt } from "../../common/auth-util.js";

// export function initMenuCard(date) {
//     // 첫 렌더링은 달력에서 처리
//     renderMenuCard(date)
// }

export function renderMenuCard(date) {
    const memberNo = getMemberNoFromJwt();
    // calendar에 있는 menu 영역(menu-card)
    const container = document.getElementById("menu-card");
    const fixedMenu = ["고구마치즈돈까스", "치즈돈까스"];

    let dateFormat = formatDate(date);
    console.log(dateFormat)
    fetch(`/menu/find?menuDate=${dateFormat}`)
        .then(res => res.text())
        .then(async (data) => {
            const menuitem = data.split(",").map(item => item.trim());
            // await Promise.all([...]) -> 비동기 병렬 처리
            const menuData = await Promise.all(
                menuitem.map(async (item) => {
                    try {
                        let url = `/menu/info?menuName=${encodeURIComponent(item)}`;
                        if (memberNo !== null && memberNo !== undefined) {
                            url += `&memberNo=${memberNo}`;
                        }

                        const res = await fetch(url);
                        if (!res.ok) {
                            console.warn(`[주의] menuName=${item} 요청 실패 (${res.status})`);
                            return {
                                menuName: item,
                                likeCount: 0,
                                likeByMe: false,
                                reviewCount: 0
                            };
                        }
                        const jsonData = await res.json();
                        return {
                            menuName: item,
                            likeCount: jsonData.likeCount,
                            likeByMe: jsonData.likedByMe,
                            reviewCount: jsonData.reviewCount
                        };
                    } catch (e) {
                        console.error(`menuName=${item} 요청 중 예외 발생`, e);
                        return {
                            menuName: item,
                            likeCount: 0,
                            likeByMe: false,
                            reviewCount: 0
                        };
                    }
                })
            );

            container.innerHTML = `
            <div class="menu-header">
              <h2>학생식당</h2>
              <span class="location">본관 지하 1층</span>
            </div>
            <div class="time">11:00 ~ 13:30</div>
            ${
                menuData.every(item => !item.menuName)
                    ? "<p>식단 정보가 없습니다.</p>"
                    : `
                    <ul class="menu-list">
                        ${menuData.map(item => `
                            <li>
                                <button id="${item.menuName}">${item.likeByMe ? "❤️" : "🤍"}</button>
                                <strong>${item.menuName}</strong><br/> 
                                좋아요: ${item.likeCount} / 💬 리뷰: ${item.reviewCount}
                            </li>
                        `).join("")}
                    </ul>
                    <hr/>
                    <h3>고정 메뉴</h3>
                    <ul class="fixed-list">
                      ${fixedMenu.map(item => `<li>${item}</li>`).join("")}
                    </ul>
                    <div class="price">가격: 6,000원</div>
                    `
            }
      `;
        });


}
