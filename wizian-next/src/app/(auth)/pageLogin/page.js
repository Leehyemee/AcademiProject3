"use client";
import { useState } from "react";
import "@/app/(app)/pagelogin.css";
import Link from "next/link";

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

                        <form className="form-login" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder={activeTab === "student" ? "학생 아이디" : "강사 아이디"}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="비밀번호" />
                            </div>

                            <div className="form-group remember-join-wrap">
                                <label className="fancy-checkbox">
                                    <input type="checkbox" />
                                    <span className="rem-text">기억하기</span>
                                </label>
                            </div>

                            {activeTab === "student" ? (
                                <div className="login-btn-grid">
                                    <button type="button" className="btn-grid">학생 로그인</button>
                                    <button type="button" className="btn-grid" onClick={() => window.location.href = '/join'}>
                                        회원가입
                                    </button>
                                    <button type="button" className="btn-grid kakao">Kakao 로그인</button>
                                    <button type="button" className="btn-grid google">Google 로그인</button>
                                </div>
                            ) : (
                                <div className="login-btn-center">
                                    <button type="submit" className="btn-grid">강사 로그인</button>
                                </div>
                            )}

                            <div className="bottom mt-2">
                                <span className="helper-text"><i className="fa fa-lock"></i> <a href="#">비밀번호 찾기</a></span>
                            </div>
                        </form>

                        <a href="/dashboard">대시보드</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLogin;
