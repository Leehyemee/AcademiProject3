'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

const Header = () => {
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [isOffcanvasActive, setIsOffcanvasActive] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            if (width < 1025) {
                setIsOffcanvasActive(true);
                document.body.classList.add('offcanvas-active');
            } else {
                document.body.classList.add('layout-default'); // 초기 레이아웃 설정
            }
        }
    }, []);

    const handleToggleFullWidth = () => {
        const body = document.body;
        const isCurrentlyFullWidth = body.classList.contains("layout-fullwidth");

        if (isCurrentlyFullWidth) {
            body.classList.remove("layout-fullwidth");
            body.classList.add("layout-default");
        } else {
            body.classList.add("layout-fullwidth");
            body.classList.remove("layout-default");
        }

        // 모바일: 오프캔버스 처리
        if (window.innerWidth < 1025) {
            setIsOffcanvasActive((prev) => {
                const toggled = !prev;
                if (toggled) {
                    body.classList.add("offcanvas-active");
                } else {
                    body.classList.remove("offcanvas-active");
                }
                return toggled;
            });
        }

        setIsFullWidth(!isCurrentlyFullWidth); // 아이콘 전환용 state 업데이트
    };

    const handleLogout = () => {
        Swal.fire({
            title: '로그아웃 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '네',
            cancelButtonText: '아니오',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const loginType = localStorage.getItem("loginType");
                const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

                // 로컬 스토리지 정리
                localStorage.removeItem("accessToken");
                localStorage.removeItem("loginType");
                localStorage.removeItem("_grecaptcha");
                localStorage.removeItem("kakao");

                if (loginType === "kakao") {
                    // 카카오 로그아웃
                    const kakaoLogoutUrl =
                        `https://accounts.kakao.com/logout?continue=` +
                        `https://kauth.kakao.com/oauth/logout?client_id=${kakaoClientId}` +
                        `&logout_redirect_uri=http://localhost:3000/pageLogin`;
                    window.location.href = kakaoLogoutUrl;

                } else if (loginType === "google") {
                    // 구글 세션 로그아웃까지 포함
                    const googleLogoutUrl =
                        "https://accounts.google.com/Logout?continue=" +
                        "https://appengine.google.com/_ah/logout?continue=http://localhost:3000/pageLogin";
                    window.location.href = googleLogoutUrl;

                } else {
                    // 일반 로그인
                    router.push("/pageLogin");
                }
            }
        });
    };

    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="brand">
                <a href="/dashboard">
                    <img src="/assets/img/academiLogo.jpg" alt="academi Logo" className="img-responsive logo" />
                </a>
            </div>

            <div className="container-fluid">
                <div className="navbar-btn">
                    <button className="btn-toggle-fullwidth" onClick={handleToggleFullWidth}>
                        <i className={`lnr ${isFullWidth ? 'lnr-arrow-right-circle' : 'lnr-arrow-left-circle'}`}></i>
                    </button>
                </div>

                <div className="navbar-btn navbar-btn-right">
                    <button className="btn-logout" onClick={handleLogout}>
                        <i className="lnr lnr-power-switch"></i> <span>LOGOUT</span>
                    </button>
                </div>

                <div id="navbar-menu">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle icon-menu" data-toggle="dropdown">
                                <i className="lnr lnr-alarm"></i>
                                <span className="badge bg-danger">5</span>
                            </a>
                            <ul className="dropdown-menu notifications">
                                <li><a href="#" className="notification-item"><span className="dot bg-warning"></span>System space is almost full</a></li>
                                <li><a href="#" className="notification-item"><span className="dot bg-danger"></span>You have 9 unfinished tasks</a></li>
                                <li><a href="#" className="notification-item"><span className="dot bg-success"></span>Monthly report is available</a></li>
                                <li><a href="#" className="notification-item"><span className="dot bg-warning"></span>Weekly meeting in 1 hour</a></li>
                                <li><a href="#" className="notification-item"><span className="dot bg-success"></span>Your request has been approved</a></li>
                                <li><a href="#" className="more">See all notifications</a></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <img src="/assets/img/user.png" className="img-circle" alt="Avatar" />
                                <span>Samuel</span> <i className="icon-submenu lnr lnr-chevron-down"></i>
                            </a>
                            <ul className="dropdown-menu">
                                <li><a href="#"><i className="lnr lnr-user"></i> <span>My Profile</span></a></li>
                                <li><a href="#"><i className="lnr lnr-envelope"></i> <span>Message</span></a></li>
                                <li><a href="#"><i className="lnr lnr-cog"></i> <span>Settings</span></a></li>
                                <li><a href="#" onClick={handleLogout}><i className="lnr lnr-exit"></i> <span>Logout</span></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
