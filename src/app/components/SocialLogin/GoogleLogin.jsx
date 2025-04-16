"use client";

const GoogleLogin = () => {
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

    const handleGoogleLogin = () => {
        const authorizeUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const params = `?client_id=${GOOGLE_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid profile email`;

        window.location.href = authorizeUrl + params;
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
