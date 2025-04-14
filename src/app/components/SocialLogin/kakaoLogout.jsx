"use client";
import { useEffect } from "react";

const Logout = () => {
    useEffect(() => {
        const loginType = localStorage.getItem("loginType");
        const kakao = localStorage.getItem("kakao");

        // 저장된 토큰, 로그인 정보 삭제
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loginType");
        localStorage.removeItem("kakao");

        if (loginType === "kakao" || kakao) {
            // Spring 백엔드의 로그아웃 처리 경로로 이동 (서버에서 카카오 로그아웃 + redirect 수행)
            window.location.href = "http://localhost:8080/api/oauth/kakao/logout";
        } else {
            // 일반 로그아웃일 경우 로그인 페이지로 이동
            window.location.href = "/pageLogin";
        }
    }, []);

    return null;
};

export default Logout;
