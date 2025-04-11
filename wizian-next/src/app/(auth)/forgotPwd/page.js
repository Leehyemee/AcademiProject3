"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import "@/app/(app)/forgotPwd.css";

const ForgotPwd = () => {
    const [userId, setUserId] = useState("");  // 아이디 입력
    const [verificationCode, setVerificationCode] = useState("");  // 인증 코드 입력
    const [newPwd, setNewPwd] = useState("");  // 새 비밀번호 입력
    const [step, setStep] = useState(1);  // 현재 단계 (1, 2, 3)
    const [loading, setLoading] = useState(false);

    // 1단계: 아이디 입력 후 인증 코드 발송
    const handleStep1Submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/api/auth/stdnt/forgotPwd?userId=${userId}`, {
                method: "POST",
            });

            if (response.ok) {
                setStep(2);
                Swal.fire({ icon: "success", title: "성공", text: "이메일 전송 완료!" });
            } else {
                const text = await response.text();
                Swal.fire({ icon: "error", title: "실패", text: text });
            }
        } catch (err) {
            Swal.fire({ icon: "error", title: "오류", text: "요청 실패" });
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    // 2단계: 인증 코드 입력
    const handleStep2Submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/stdnt/verifyCode", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ verificationCode }),
            });

            if (response.ok) {
                setStep(3);  // 3단계로 이동
                Swal.fire({
                    icon: "success",
                    title: "인증 코드 확인 완료",
                    text: "이제 새 비밀번호를 입력해주세요.",
                });
            } else {
                const text = await response.text();
                Swal.fire({
                    icon: "error",
                    title: "인증 실패",
                    text: text || "인증 코드가 올바르지 않습니다.",
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "서버 오류",
                text: "인증 코드 확인 중 문제가 발생했습니다.",
            });
        }
    };

    // 3단계: 새 비밀번호 입력
    const handleStep3Submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/stdnt/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPwd, verificationCode }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "비밀번호 변경 완료",
                    html: "비밀번호가 성공적으로 변경되었습니다.<br>로그인 페이지로 이동합니다.",
                }).then(() => {
                    window.location.href = "/pageLogin";
                });
            } else {
                const text = await response.text();
                Swal.fire({
                    icon: "error",
                    title: "실패",
                    text: text || "비밀번호 변경 중 오류가 발생했습니다.",
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "서버 오류",
                text: "새 비밀번호 변경 중 문제가 발생했습니다.",
            });
        }
    };

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
                            <p>가입 시 입력한 이메일로 인증 코드를 보냈습니다.</p>
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

export default ForgotPwd;
