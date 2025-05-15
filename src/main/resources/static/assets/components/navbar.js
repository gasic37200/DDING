import { isLoggedIn, logout } from "../common/auth-util.js";

// static/assets/components/navbar.js

export function renderNavbar() {
    const header = document.querySelector("header");
    if (header) {
        const loggedIn = isLoggedIn();

        header.innerHTML = `
            <div class="title">학식 알리미</div>
            <nav class="nav">
                <a href="#menu">식단</a>
                <a href="#board">게시판</a>
                ${logout ? '<a href="#mypage">마이페이지</a>' : ''}
                <!-- 로그인 버튼 -->
                <button id="authButton">${isLoggedIn() ? "로그아웃" : "로그인"}</button>
                <!-- 로그인 모달을 불러올 div -->
                <div id="loginModalContainer"></div>
            </nav>
            `;

        const authButton = document.getElementById("authButton");
        if (loggedIn) {
            authButton.addEventListener('click', logout);
        } else {
            authButton.addEventListener('click', () => {
                // 로그인 모달 스크립트 동적 로드
                import('/assets/features/auth/login.js').then(module => {
                    module.openLoginModal()
                })
            });
        }
    }
}