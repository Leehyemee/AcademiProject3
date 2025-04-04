"use client";
import { useState } from "react";
import "@/app/(app)/pagelogin.css"

const PageLogin = () => {
    const [activeTab, setActiveTab] = useState("student");

    return (
        <div className="vertical-align-wrap">
            <div className="vertical-align-middle">
                <div className="auth-box">
                    <div className="content">
                        <div className="header text-center">
                            <div className="logo mb-4">
                                <img src="/assets/img/academiLogo.jpg" alt="Klorofil Logo" />
                            </div>
                            <div className="tab-buttons flex justify-center mb-4">
                                <button
                                    onClick={() => setActiveTab("student")}
                                    className={activeTab === "student" ? "active" : "inactive"}
                                >
                                    학생 계정
                                </button>
                                <button
                                    onClick={() => setActiveTab("teacher")}
                                    className={activeTab === "teacher" ? "active" : "inactive"}
                                >
                                    강사 계정
                                </button>
                            </div>
                        </div>

                        <form className="form-auth-small">
                            <div className="form-group">
                                <label htmlFor="signin-email" className="control-label sr-only">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="signin-email"
                                    placeholder={activeTab === "student" ? "학생 이메일" : "강사 이메일"}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signin-password" className="control-label sr-only">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="signin-password"
                                    placeholder="비밀번호"
                                />
                            </div>
                            <div className="form-group clearfix">
                                <label className="fancy-checkbox element-left">
                                    <input type="checkbox" />
                                    <span>기억하기</span>
                                </label>
                            </div>

                            <button type="submit" className="btn btn-login btn-lg btn-block">
                                {activeTab === "student" ? "학생 로그인" : "강사 로그인"}
                            </button>

                            {/* 학생 로그인 탭일 때만 보이도록 조건부 렌더링 */}
                            {activeTab === "student" && (
                                <>
                                    <button type="button" className="btn btn-kakao btn-lg btn-block">Kakao 계정으로 로그인</button>
                                    <button type="button" className="btn btn-google btn-lg btn-block">Google 계정으로 로그인</button>
                                </>
                            )}

                            <div className="bottom mt-2">
                                <span className="helper-text"><i className="fa fa-lock"></i> <a href="#">아이디/비밀번호 찾기</a></span>
                            </div>
                        </form>

                        <a href="/dashboard">대시보드</a>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
    );
};

export default PageLogin;
