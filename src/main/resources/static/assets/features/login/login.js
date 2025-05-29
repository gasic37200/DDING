import { renderNavbar } from "../../components/navbar.js";
import {renderMenuCard} from "../menu/menu.js";

export function openLoginModal() {
    fetch("/assets/features/login/login.html")
        .then(res => res.text()) // input에서 text를 가져옴
        .then(html => { // 가져온 text임
            const container = document.getElementById("loginModalContainer");
            container.innerHTML = html;
            setTimeout(() => {
                initLoginModal();
            }, 0); // DOM 렌더링 직후 실행
        }).catch(e => console.log(e));
}

function initLoginModal() {
    const loginModal = document.getElementById("loginModal");
    const closeBtn = loginModal.querySelector(".close");
    const modalContent = loginModal.querySelector(".modal-content");

    const modal = document.getElementById("loginModal");

    Object.defineProperty(modal.style, "display", {
        set(value) {
            console.trace("🚨 loginModal.style.display = ", value);
        }
    });

    // 닫기 버튼 클릭 시
    closeBtn.addEventListener("click", () => {
        console.log("닫기 닫기")
        loginModal.classList.remove("show");
    });

    // 모달 바깥 클릭 시에만 닫히게
    loginModal.addEventListener("click", event => {
        if (event.target === loginModal) {
            console.log("바깥 닫기")
            loginModal.classList.remove("show");
        }
    });

    modalContent.addEventListener("click", event => {
        event.stopPropagation();
    });

    // async는 비동기인데 feach로 로그인 검사하는데 시간이 걸리므로 처리할 때까지 대기
    document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const memberId = document.getElementById("memberId").value;
        const memberPass = document.getElementById("memberPass").value;

        const messageEl = document.getElementById("loginMessage");
        try {

            const res = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberInputId: memberId, memberInputPass: memberPass})
            });
            const data = await res.json();
            if (data.success) {
                // 성공 메시지
                messageEl.textContent = "로그인에 성공했습니다!";
                messageEl.classList.remove("error");
                messageEl.classList.add("success");

                // 토큰 저장 후 모달 닫고 새로고침
                localStorage.setItem("accessToken", data.token);
                setTimeout(() => {
                    renderNavbar();
                    renderMenuCard(new Date())
                }, 0);
            } else {
                // 실패 메시지
                messageEl.textContent = "아이디 또는 비밀번호가 틀렸습니다.";
                messageEl.classList.remove("success");
                messageEl.classList.add("error");
            }
        } catch (err) {
            messageEl.textContent = "서버 오류가 발생했습니다. 다시 시도해 주세요.";
            messageEl.classList.remove("success");
            messageEl.classList.add("error");
        }
    });
}