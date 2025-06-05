import { isLoggedIn, logout } from "../common/auth-util.js";
import { openLoginModal } from "../features/login/login.js";
import { renderMenuCard } from "../features/menu/menu.js";

// static/assets/components/navbar.js

export function renderNavbar() {
    const header = document.querySelector("header");
    if (header) {
        const loggedIn = isLoggedIn();

        header.innerHTML = `
            <div class="title">학식 알리미</div>
            <nav class="nav">
                <a href="/">식단</a>
                <a href="/board">게시판</a>
                ${loggedIn ? '<a href="/mypage">마이페이지</a>' : ''}
                <!-- 로그인 버튼 -->
                <button id="authButton">${loggedIn ? "로그아웃" : "로그인"}</button>
                <!-- 로그인 모달을 불러올 div -->
                <div id="loginModalContainer"></div>
            </nav>
            `;

        // ?는 옵셔널 체인지 id를 못찾아서 넘어감
        console.log(loggedIn)
        if (!loggedIn) {
            openLoginModal();
        }
        document.getElementById("authButton")?.addEventListener("click", () => {
            // style.display: 해당 요소의 **화면 표시 방식 (CSS display 속성)**을 바꾸는 속성
            // "flex": CSS의 Flexbox 레이아웃 방식
            if (isLoggedIn()) {
                console.log("비활성화")
                logout();
                renderNavbar();
                renderMenuCard(new Date());
            } else {
                console.log("활성화")
                document.getElementById("loginModal").classList.add("show");
            }
        });
        console.log(loggedIn)
    }
}