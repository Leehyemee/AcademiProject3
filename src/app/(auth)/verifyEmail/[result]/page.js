'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import '../../../components/VerifyEmail.css';

const VerifyEmailResultPage = () => {
    const params = useParams();
    const { result } = params;

    let title = '';
    let message = '';

    switch (result) {
        case 'ok':
            title = '✅ 이메일 인증 성공';
            message = '이제 로그인을 진행할 수 있습니다.';
            break;
        case 'fail':
            title = '❌ 이메일 인증 실패';
            message = '유효하지 않은 인증 링크이거나 만료되었습니다.';
            break;
        case 'already':
            title = '⚠️ 이미 인증된 계정입니다.';
            message = '이메일 인증은 이미 완료되었습니다.';
            break;
        default:
            title = '⚠️ 알 수 없는 결과';
            message = '잘못된 접근입니다.';
            break;
    }

    return (
        <div className="verify-email-container">
            <div className="verify-email-box">
                <h2 className="verify-email-title">{title}</h2>
                <p className="verify-email-message">{message}</p>
                <Link href="/pageLogin">로그인 하러 가기</Link>
            </div>
        </div>
    );
};

export default VerifyEmailResultPage;