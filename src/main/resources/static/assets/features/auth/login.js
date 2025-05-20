export function openLoginModal() {
    fetch(fetch("/assets/features/auth/login.html"))
        .then(res => res.text()) // input에서 text를 가져옴
        .then(html => { // 가져온 text임
            const container = document.getElementById("loginModalContainer");
            container.innerHTML = html;
            initLoginModal(); // 초기화
        });
}

function initLoginModal() {
    const modal = document.getElementById("loginModal");
    const closeBtn = modal.querySelector(".close");

    // ?는 옵셔널 체인지 id를 못찾아서 넘어감
    document.getElementById("authButton")?.addEventListener("click", () => {
        // style.display: 해당 요소의 **화면 표시 방식 (CSS display 속성)**을 바꾸는 속성
        // "flex": CSS의 Flexbox 레이아웃 방식
        modal.style.display = "flex";
    });

    // 닫기 버튼 클릭 시
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 로그인 모달 이외 다른 곳 클릭 시
    window.addEventListener("click()", event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // async는 비동기인데 feach로 로그인 검사하는데 시간이 걸리므로 처리할 때까지 대기
    document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const memberId = document.getElementById("memberId").value;
        const memberPass = document.getElementById("memberPass").value;

        const messageEl = document.getElementById("loginMessage");
        try {

            const res = await feach("/login", {
                method: "POST",
                header: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberInputId: memberId, memberInputPass: memberPass})
            });
            const data = await res.json();
            if (data.success()) {
                // 성공 메시지
                messageEl.textContent = "로그인에 성공했습니다!";
                messageEl.classList.remove("error");
                messageEl.classList.add("success");

                // 토큰 저장 후 모달 닫고 새로고침
                localStorage.setItem("accessToken", data.token);
                setTimeout(() => {
                    document.getElementById("loginModal").style.display = "none";
                    window.location.reload();
                }, 1000); // 1초 후 새로고침
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