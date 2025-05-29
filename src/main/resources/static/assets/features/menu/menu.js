import { formatDate } from "../../common/util.js";
import { getMemberNoFromJwt, getToken } from "../../common/auth-util.js";

// export function initMenuCard(date) {
//     // 첫 렌더링은 달력에서 처리
//     renderMenuCard(date)
// }

let selectedDate = null
let memberNo = null;

export function renderMenuCard(date) {
    // calendar에 있는 menu 영역(menu-card)
    const container = document.getElementById("menu-card");
    const fixedMenu = ["고구마치즈돈까스", "치즈돈까스"];

    selectedDate = date;
    memberNo = getMemberNoFromJwt();
    let dateFormat = formatDate(selectedDate);
    console.log(dateFormat)
    fetch(`/menu/find?menuDate=${dateFormat}`)
        .then(res => res.text())
        .then(async (data) => {
            const menuitem = data.split(",").map(item => item.trim());
            // await Promise.all([...]) -> 비동기 병렬 처리
            const menuData = await Promise.all(
                menuitem.map(async (item) => {
                    try {
                        const res = await fetch(`/menu/info`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "text/plain",
                                Authorization: `Bearer ${getToken()}`
                            },
                            body: item
                        });
                        if (!res.ok) {
                            console.warn(`[주의] menuName=${item} 요청 실패 (${res.status})`);
                            return {
                                menuName: item,
                                likeByMe: false,
                                likeCount: 0,
                                reviewCount: 0,
                                reciewRate: 0
                            };
                        }
                        const jsonData = await res.json();
                        return {
                            menuName: item,
                            likeByMe: jsonData.likedByMe,
                            likeCount: jsonData.likeCount,
                            reviewCount: jsonData.reviewCount,
                            reviewRate: jsonData.reviewRate
                        };
                    } catch (e) {
                        console.error(`menuName=${item} 요청 중 예외 발생`, e);
                        return {
                            menuName: item,
                            likeByMe: false,
                            likeCount: 0,
                            reviewCount: 0,
                            reviewRate: 0
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
                            ${menuData.map(item  => `
                                <li>
                                    <strong>${item.menuName}</strong><br/> 
                                    <button class="like-button" data-name="${item.menuName}">
                                        ${item.likeByMe ? "❤️" : "🤍"}
                                    </button>
                                    좋아요: ${item.likeCount} / 
                                    <button class="review-button" data-name="${item.menuName}">💬</button>
                                    리뷰: ${item.reviewCount} / 
                                    평점: ${item.reviewRate}
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
document.addEventListener("click", likeButtonHandler);
document.addEventListener("click", reviewButtonHandler);

function likeButtonHandler(e) {
    if (e.target.classList.contains("like-button")) {
        const menuName = e.target.dataset.name;
        console.log(localStorage.getItem("accessToken"));
        fetch(`/menu_like/update`, {
            method: "POST",
            headers: {
                "Content-type": "text/plain",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}` // 토큰이 필요한 경우
            },
            body: menuName
        })
            .then(res => {
                if (res.status === 403) {
                    alert("로그인이 필요한 기능입니다.");
                    document.getElementById("loginModal").classList.add("show");
                } else {
                    renderMenuCard(selectedDate);
                }
            });
    }
}

function reviewButtonHandler(e) {
    if (e.target.classList.contains("review-button")) {
        const menuName = e.target.dataset.name;
        console.log(localStorage.getItem("accessToken"));

        if (memberNo != null) {
            window.location.href = `/review?menuName=${encodeURIComponent(menuName)}`;
        } else {
            alert("로그인이 필요한 기능입니다.");
            document.getElementById("loginModal").classList.add("show");
        }
    }
}
