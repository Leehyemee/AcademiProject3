"use client";

const GoogleLogin = () => {
    const GOOGLE_LOGIN_URL = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL || "http://localhost:8080/api/oauth/google/login";

    const handleGoogleLogin = () => {
        window.location.href = GOOGLE_LOGIN_URL;
    };

    return (
        <div className="d-flex justify-content-center py-2 gap-2">
            <img
                src="/assets/img/google.png"
                alt="google"
                className="sns-btn google-btn"
                onClick={handleGoogleLogin}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default GoogleLogin;
