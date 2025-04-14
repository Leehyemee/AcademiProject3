import { useRouter } from 'next/navigation';

export const useLogout = () => {
    const router = useRouter();

    const logout = () => {
        const loginType = localStorage.getItem("loginType");
        const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
        const googleLogoutUrl = `https://accounts.google.com/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/pageLogin`;

        localStorage.removeItem("accessToken");
        localStorage.removeItem("loginType");
        localStorage.removeItem("_grecaptcha");
        localStorage.removeItem("kakao");

        if (loginType === "kakao") {
            window.location.href = `https://accounts.kakao.com/logout?continue=` +
                `https://kauth.kakao.com/oauth/logout?client_id=${kakaoClientId}` +
                `&logout_redirect_uri=http://localhost:3000/pageLogin`;
        } else if (loginType === "google") {
            window.location.href = googleLogoutUrl;
        } else {
            router.push("/pageLogin");
        }
    };

    return logout;
};
