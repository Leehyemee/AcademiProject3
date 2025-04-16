"use client";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import "@/app/components/LoginPage/pagelogin.css";

const TeacherLogin = () => {
    const formLoginRef = useRef(null);
    const [errors, setErrors] = useState({});

    const processLoginok = async (values) => {
        console.log(values);

        try {
            const response = await fetch("http://localhost:8080/api/auth/inst/signin", {
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
                        text: '강사 대시보드로 이동합니다.',
                        icon: 'success',
                        confirmButtonText: '확인',
                    }).then(() => {
                        location.href = "http://localhost:3001/instDashboard";
                    });
                } else {
                    Swal.fire({
                        title: '다시 로그인 하세요!!',
                        text: '문제가 발생했습니다.',
                        icon: 'error',
                        confirmButtonText: '확인',
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

    const validateLoginForm = (values) => {
        const errors = {};
        if (!values.instId || values.instId.length < 6) {
            errors.instId = "아이디는 6자 이상 입력하세요!";
        }
        if (!values.passwd || values.passwd.length < 6) {
            errors.passwd = "비밀번호는 6자 이상 입력하세요!";
        }
        return errors;
    };

    return (
        <form ref={formLoginRef} onSubmit={handleLoginSubmit} className="form-login">
            <div className="form-group">
                <input
                    type="text"
                    name="instId"
                    className="form-control"
                    placeholder="강사 아이디"
                />
                {errors.instId && <p className="error-msg">{errors.instId}</p>}
            </div>

            <div className="form-group">
                <input
                    type="password"
                    name="passwd"
                    className="form-control"
                    placeholder="비밀번호"
                />
                {errors.passwd && <p className="error-msg">{errors.passwd}</p>}
            </div>


            <div className="login-btn-center">
                <button type="submit" className="custom-btn login-btn">강사 로그인</button>
            </div>
        </form>
    );
};

export default TeacherLogin;