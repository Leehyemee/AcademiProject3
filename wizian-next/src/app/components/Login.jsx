"use client";
import { useRef, useState } from "react";

const Login = () => {
    const formLoginRef = useRef(null);
    const [errors, setErrors] = useState({});

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
                    alert("로그인 성공!!");
                    location.href = "/dashboard";
                } else {
                    alert("다시 로그인 하세요!!");
                    location.href = "/pageLogin";
                }
            } else if (response.status === 401) {
                alert(await response.text());
            }
        } catch (error) {
            console.error("서버 오류:", error);
            alert("서버와 통신 중 오류 발생!!");
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
            <div className="form-group remember-join-wrap">
                <label className="fancy-checkbox">
                    <input type="checkbox" />
                    <span className="rem-text">기억하기</span>
                </label>
            </div>
            <div className="login-btn-grid">
                <button type="button" className="btn-grid" onClick={() => location.href = "/join"}>회원가입</button>
                <button type="submit" className="btn-grid">학생 로그인</button>
                <button type="button" className="btn-grid kakao">Kakao 로그인</button>
                <button type="button" className="btn-grid google">Google 로그인</button>
            </div>
        </form>
    );
};

export default Login;
