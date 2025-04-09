"use client";
import { useState } from "react";
import "@/app/(app)/pagelogin.css";
import Login from "../../components/Login";

const PageLogin = () => {
    const [activeTab, setActiveTab] = useState("student");

    return (
        <div className="vertical-align-wrap">
            <div className="vertical-align-middle">
                <div className="login-box">
                    <div className="content">
                        <div className="header text-center">
                            <div className="logo mb-4">
                                <img src="/assets/img/academiLogo_login.jpg" alt="academi Logo" />
                            </div>
                            <div className="login-tab-buttons">
                                <button
                                    onClick={() => setActiveTab("student")}
                                    className={activeTab === "student" ? "tab-active" : "tab-inactive"}
                                >
                                    학생 계정
                                </button>
                                <button
                                    onClick={() => setActiveTab("teacher")}
                                    className={activeTab === "teacher" ? "tab-active" : "tab-inactive"}
                                >
                                    강사 계정
                                </button>
                            </div>
                        </div>

                        {activeTab === "student" ? (
                            <Login />
                        ) : (
                            <div className="login-btn-center">
                                <button type="button" className="btn-grid">강사 로그인</button>
                            </div>
                        )}

                        <div className="bottom mt-2">
                            <span className="helper-text"><i className="fa fa-lock"></i> <a href="#">비밀번호 찾기</a></span>
                        </div>
                        <a href="/dashboard">대시보드</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLogin;
