"use client";

const KakaoLogin = () => {
    const handleKakaoLogin = () => {
        window.location.href = "http://localhost:8080/api/oauth/kakao/login";
    };

    return (
        <div className="d-flex justify-content-center py-2 gap-2">
            <img
                src="/assets/img/kakao.png"
                alt="kakao"
                className="sns-btn"
                onClick={handleKakaoLogin}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default KakaoLogin;
