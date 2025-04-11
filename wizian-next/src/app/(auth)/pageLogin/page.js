"use client";
import { useState } from "react";
import "@/app/(app)/pagelogin.css";
import Login from "../../components/Login";
import TeacherLogin from "../../components/TeacherLogin";

const PageLogin = () => {
    const [activeTab, setActiveTab] = useState("student");

    return (
        <div className="login-page-wrap">
            <div className="logo-wrap">
                <img src="/assets/img/academiLogo.png" alt="academi Logo" className="logo-img" />
            </div>

            <div className="login-box">
                <div className="content text-center">
                    <h3>로그인</h3>

                    <div className="login-tab-buttons">
                        <button
                            onClick={() => setActiveTab("student")}
                            className={`tab-btn ${activeTab === "student" ? "tab-active" : "tab-inactive"}`}
                        >
                            학생 계정
                        </button>
                        <button
                            onClick={() => setActiveTab("teacher")}
                            className={`tab-btn ${activeTab === "teacher" ? "tab-active" : "tab-inactive"}`}
                        >
                            강사 계정
                        </button>
                    </div>

                    {activeTab === "student" ? (
                        <Login />
                    ) : (
                        <TeacherLogin />
                    )}

                    <div className="bottom mt-2">
            <span className="helper-text">
              <i className="fa fa-lock"></i> <a href="/forgotPwd">비밀번호 찾기</a>
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLogin;
