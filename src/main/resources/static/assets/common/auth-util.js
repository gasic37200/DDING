// static/assets/common/auth-util.js

export function getToken() {
    return localStorage.getItem("accessToken");
}

export function isLoggedIn() {
    // !!는 강제로 boolean으로 변환(값 -> true, null -> false)
    const token = getToken();
    console.log(token)
    return !!token;
}

export function logout() {
    localStorage.removeItem("accessToken"); // localStorage의 정보를 지우고
}

export function token() {
    if (response.status === 401) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
    }
}

export function getMemberNoFromJwt() {
    const token = getToken();
    if (!token) return null;

    // jwt의 토큰 구조 - 헤더.페이로드.서명
    const payload = token.split(".")[1]; // 페이로드
    const decoded = JSON.parse(atob(payload)); //
    return decoded.memberNo;
}