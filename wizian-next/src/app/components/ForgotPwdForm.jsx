"use client";
import React from "react";

// 이메일 마스킹 함수
const maskEmail = (email) => {
    if (!email) {
        return '';
    }

    const [localPart, domain] = email.split('@');
    const maskedLocalPart = localPart.slice(0, -4) + '****';
    const [domainName, domainExt] = domain.split('.');
    const maskedDomain = domainName.slice(0, 2) + '****.' + domainExt;

    return `${maskedLocalPart}@${maskedDomain}`;
};

const ForgotPwdForm = ({
                           step, userId, setUserId, verificationCode, setVerificationCode,
                           newPwd, setNewPwd, handleStep1Submit, handleStep2Submit, handleStep3Submit, loading, email
                       }) => {
    const maskedEmail = maskEmail(email); // 마스킹된 이메일 주소

    return (
        <div className="login-page-wrap">
            <div className="logo-wrap">
                <img src="/assets/img/academiLogo_login.png" alt="academi Logo" className="logo-img" />
            </div>

            <div className="login-box">
                <div className="content text-center">
                    <h3>비밀번호 찾기</h3>

                    {step === 1 && (
                        <form onSubmit={handleStep1Submit}>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="아이디를 입력하세요"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                            <button type="submit" className="custom-btn" disabled={loading}>
                                {loading ? <span className="spinner"></span> : "아이디 확인"}
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleStep2Submit}>
                            <p>가입 시 사용하신 이메일로 인증 코드를 보냈습니다.</p>
                            <p>이메일: <strong>{maskedEmail}</strong></p> {/* 마스킹된 이메일 표시 */}
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="인증 코드를 입력하세요"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                            />
                            <button type="submit" className="custom-btn">인증 코드 확인</button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleStep3Submit}>
                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="새 비밀번호를 입력하세요"
                                value={newPwd}
                                onChange={(e) => setNewPwd(e.target.value)}
                                required
                            />
                            <button type="submit" className="custom-btn">비밀번호 변경</button>
                        </form>
                    )}

                    <div className="mt-3">
                        <a href="/pageLogin">← 로그인으로 돌아가기</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPwdForm;