"use client";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
    const formLoginRef = useRef(null);
    const [errors, setErrors] = useState({});

    // 일반 로그인 처리
    const processLoginok = async (values) => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/stdnt/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.accessToken) {
                    localStorage.setItem("accessToken", data.accessToken);
                    Swal.fire({
                        title: '로그인 성공!!',
                        text: '대시보드로 이동합니다.',
                        icon: 'success',
                        confirmButtonText: '확인',
                    }).then(() => {
                        location.href = "/dashboard";
                    });
                } else {
                    Swal.fire({
                        title: '다시 로그인 하세요!!',
                        text: '문제가 발생했습니다.',
                        icon: 'error',
                        confirmButtonText: '확인',
                    }).then(() => {
                        location.href = "/pageLogin";
                    });
                }
            } else if (response.status === 401) {
                const errorMsg = await response.text();
                Swal.fire({
                    title: '인증 오류',
                    text: errorMsg,
                    icon: 'error',
                    confirmButtonText: '확인',
                });
            }
        } catch (error) {
            console.error("서버 오류:", error);
            Swal.fire({
                title: '서버 오류',
                text: '서버와 통신 중 오류 발생!!',
                icon: 'error',
                confirmButtonText: '확인',
            });
        }
    };

    // 로그인 폼 제출 처리
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formLoginRef.current);
        const formValues = Object.fromEntries(formData.entries());

        const formErrors = validateLoginForm(formValues);
        if (Object.keys(formErrors).length === 0) {
            processLoginok(formValues);
        } else {
            setErrors(formErrors);
        }
    };

    // 폼 유효성 검사
    const validateLoginForm = (values) => {
        const errors = {};
        if (!values.stdntId || values.stdntId.length < 6) {
            errors.stdntId = "아이디는 6자 이상 입력하세요!";
        }
        if (!values.pwd || values.pwd.length < 6) {
            errors.pwd = "비밀번호는 6자 이상 입력하세요!";
        }
        return errors;
    };

    return (
        <form ref={formLoginRef} onSubmit={handleLoginSubmit} className="form-login">
            <div className="form-group">
                <input
                    type="text"
                    name="stdntId"
                    className="form-control"
                    placeholder="학생 아이디"
                />
                {errors.stdntId && <p className="error-msg">{errors.stdntId}</p>}
            </div>

            <div className="form-group">
                <input
                    type="password"
                    name="pwd"
                    className="form-control"
                    placeholder="비밀번호"
                />
                {errors.pwd && <p className="error-msg">{errors.pwd}</p>}
            </div>

            <div className="login-btn-grid">
                <div className="btn-row">
                    <button
                        type="button"
                        className="custom-btn join-btn"
                        onClick={() => location.href = "/join"}
                    >
                        회원가입
                    </button>
                    <button
                        type="submit"
                        className="custom-btn login-btn"
                    >
                        학생 로그인
                    </button>
                </div>

                <div className="btn-row">
                    <KakaoLogin />
                    <GoogleLogin />
                </div>
            </div>
        </form>
    );
};

export default Login;
