"use client"

import {useCallback, useEffect, useRef, useState} from "react";
import { useSearchParams, useRouter } from "next/navigation";
//import { useAuthStore } from "@/stores/AuthStore";
import Swal from "sweetalert2";

const GoogleOAuthHandler = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    //const setAccessToken = useAuthStore((state) => state.setAccessToken);

    const sendAuthCodeToServer = async (code)=> {

        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
        params.append('client_secret', process.env.NEXT_PUBLIC_GOOGLE_SECRETKEY)
        params.append('code', code);
        params.append('redirect_uri', process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI);

        console.log(params);

        try {
            // fetch를 사용한 Kakao OAuth 토큰 요청
            const response = await fetch('https://accounts.google.com/o/oauth2/v2/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                body: params
            });

            if (!response.ok) {
                throw new Error(`HTTP 에러! 상태: ${response.status}`);
            }
            // 응답 데이터 파싱
            const data = await response.json();
            console.log('응답데이터 : ', data)

            const response2 = await fetch('http://localhost:8080/api/oauth/google/googleToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response2.ok) {
                throw new Error(`HTTP 에러! 상태: ${response2.status}`);
            }
            // 응답 데이터 파싱
            const data2 = await response2.json();
            console.log('응답데이터 : ', data2);


            // // 응답에서 access token 추출
            const token = data2.accessToken;
            console.log('엑세스 토큰:', token);
            localStorage.setItem("accessToken", token);
            localStorage.setItem("google", true);
            Swal.fire({
                title: '로그인 성공!',
                text: '환영합니다 😊',
                icon: 'success',
                confirmButtonText: '확인'
            });
            router.push("/dashboard");
        } catch (error) {
            console.error(`구글 로그인 실패:`, error);
            router.push("/pageLogin");
        }

    };

    useEffect(() => {
        // 카카오 로그인 후 인가코드 추출
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");

        if (code) {
            // 인가코드로 액세스 토큰 요청
            sendAuthCodeToServer(code);
        } else {
            router.push("/");
        }

    }, [router, sendAuthCodeToServer]);

}

export default GoogleOAuthHandler;
