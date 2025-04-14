"use client";

const GoogleLogin = () => {
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/api/oauth/google/login";
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
