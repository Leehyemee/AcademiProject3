"use client";
import { useState } from "react";
import Swal from "sweetalert2";

const useForgotPwd = () => {
    const [userId, setUserId] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    // 비밀번호 유효성 검사 (영어, 숫자 포함 6자 이상)
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return passwordRegex.test(password);
    };

    const handleStep1Submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/api/auth/stdnt/forgotPwd?userId=${userId}`, { method: "POST" });
            if (res.ok) {
                const data = await res.json();
                console.log("응답 데이터:", data);
                setEmail(data.email);
                setStep(2);
                Swal.fire({ icon: "success", title: "이메일로 인증 코드가 발송되었습니다.", text: "이메일에서 인증 절차를 완료하세요!" });
            } else {
                Swal.fire({ icon: "error", title: "실패", text: await res.text() });
            }
        } catch {
            Swal.fire({ icon: "error", title: "오류", text: "요청 실패" });
        } finally {
            setLoading(false);
        }
    };

    const handleStep2Submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/api/auth/stdnt/verifyCode", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ verificationCode }),
            });
            if (res.ok) {
                setStep(3);
                Swal.fire({ icon: "success", title: "인증 완료", text: "새 비밀번호를 입력하세요." });
            } else {
                Swal.fire({ icon: "error", title: "실패", text: await res.text() });
            }
        } catch {
            Swal.fire({ icon: "error", title: "서버 오류", text: "인증 실패" });
        }
    };

    const handleStep3Submit = async (e) => {
        e.preventDefault();

        // 비밀번호 유효성 검사
        if (!validatePassword(newPwd)) {
            Swal.fire({
                icon: "error",
                title: "비밀번호 오류",
                text: "비밀번호는 최소 6자 이상이어야 하며, 영어(대소문자 구분 없음)와 숫자를 포함해야 합니다.",
            });
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/auth/stdnt/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPwd, verificationCode }),
            });
            if (res.ok) {
                Swal.fire({
                    icon: "success", title: "완료", html: "비밀번호가 변경되었습니다.<br>로그인 페이지로 이동합니다.",
                }).then(() => window.location.href = "/pageLogin");
            } else {
                Swal.fire({ icon: "error", title: "실패", text: await res.text() });
            }
        } catch {
            Swal.fire({ icon: "error", title: "서버 오류", text: "비밀번호 변경 실패" });
        }
    };

    return {
        userId, setUserId,
        verificationCode, setVerificationCode,
        newPwd, setNewPwd,
        step, setStep,
        loading,
        email,
        handleStep1Submit,
        handleStep2Submit,
        handleStep3Submit,
    };
};

export default useForgotPwd;