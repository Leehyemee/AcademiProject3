import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleOAuthHandler = () => {
    const navigate = useNavigate();

    const sendAuthCodeToServer = async (code) => {
        try {
            const response = await fetch("/api/oauth/google/callback?code=" + code, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`HTTP 에러! 상태: ${response.status}`);
            }

            // 응답 데이터 파싱
            const data = await response.json();
            console.log("백엔드 응답 데이터:", data);

            // JWT 토큰을 로컬 스토리지에 저장
            const token = data.accessToken;
            localStorage.setItem("accessToken", token);
            localStorage.setItem("google", true);

            alert("구글 로그인 성공!");
            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error("구글 로그인 실패:", error);
            navigate("/pageLogin", { replace: true });
        }
    };

    useEffect(() => {
        // 구글 로그인 후 인가코드 추출
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");

        if (code) {
            // 인가코드로 백엔드에 요청
            sendAuthCodeToServer(code);
        } else {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    return null;
};

export default GoogleOAuthHandler;
