'use client';
import { useEffect, useState } from 'react';
import '@/app/components/VerifyEmail.css';

export default function VerifyEmailPage({ params }) {
    const { userid, email, code } = params;  // 동적 경로에서 값 가져오기
    const [message, setMessage] = useState('잠시만 기다려주세요...');

    useEffect(() => {
        if (userid && email && code) {
            const encodedEmail = encodeURIComponent(email);  // 이메일 인코딩

            // 백엔드에서 기대하는 URL 형식에 맞춰 fetch
            fetch(`/api/auth/stdnt/verifyCode/${userid}/${encodedEmail}/${code}`)
                .then((res) => {
                    if (res.ok) return res.text();
                    else throw new Error('인증 실패');
                })
                .then((data) => setMessage(data))
                .catch(() => setMessage('이메일 인증 실패 - 코드를 다시 확인하세요.'));
        }
    }, [userid, email, code]);

    return (
        <div className="verify-email-container">
            <div className="verify-email-box">
                <h2 className="verify-email-title">이메일 인증</h2>
                <p className="verify-email-message">{message}</p>
            </div>
        </div>
    );
}
