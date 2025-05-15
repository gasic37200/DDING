// static/assets/common/auth-util.js

export function isLoggedIn() {
    // !!는 강제로 boolean으로 변환(값 -> true, null -> false)
    return !!localStorage.getitem
}

export function logout() {
    localStorage.removeItem(); // localStorage의 정보를 지우고
    window.location.reload(); // 다시 로딩해서 isLoggedIn()을 통해 로그아웃 진행
}