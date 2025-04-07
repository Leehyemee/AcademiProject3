'use client';

import React, { useState, useEffect } from "react";

const Header = () => {
    // 상태 관리
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [isOffcanvasActive, setIsOffcanvasActive] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    // window 크기 감지 및 초기 설정
    useEffect(() => {
        // 클라이언트 사이드에서만 실행되도록
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // 초기 로드 시 실행
        const handleLoad = () => {
            const width = window.innerWidth;
            setWindowWidth(width);

            // 1025px 미만일 때 초기 설정
            if (width < 1025) {
                setIsOffcanvasActive(true);
            }

            // navbar 높이에 따라 스타일 조정
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            document.querySelector('.right-sidebar')?.style.setProperty('top', `${navbarHeight}px`);

            if (document.querySelector('.has-content-menu')) {
                document.querySelector('.navbar + .main-content')?.style.setProperty('padding-top', `${navbarHeight}px`);
            }

            const sidebarHeight = document.querySelector('#sidebar-nav')?.offsetHeight || 0;
            const mainHeight = document.querySelector('.main')?.offsetHeight || 0;
            if (mainHeight < sidebarHeight) {
                document.querySelector('.main')?.style.setProperty('min-height', `${sidebarHeight}px`);
            }
        };

        // 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleLoad);

        // 초기 실행
        handleLoad();

        // cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    // 풀스크린 토글 핸들러
    const handleToggleFullWidth = () => {
        setIsFullWidth(prev => !prev);

        // body 클래스 조정
        const body = document.body;
        if (!isFullWidth) {
            body.classList.add('layout-fullwidth');
        } else {
            body.classList.remove('layout-fullwidth');
            body.classList.remove('layout-default');
        }

        // 1025px 미만일 때 offcanvas 토글
        if (windowWidth < 1025) {
            setIsOffcanvasActive(prev => !prev);
            if (!isOffcanvasActive) {
                body.classList.add('offcanvas-active');
            } else {
                body.classList.remove('offcanvas-active');
            }
        }
    };

    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="brand">
                <a href="/dashboard">
                    <img src="/assets/img/academiLogo.jpg" alt="Logo" className="img-responsive logo" />
                </a>
            </div>
            <div className="container-fluid">

                {/* NAVBAR-BTN */}
                <div className="navbar-btn">
                <button className="btn-toggle-fullwidth" onClick={handleToggleFullWidth}>
                    <i className={`lnr ${isFullWidth ? 'lnr-arrow-right-circle' : 'lnr-arrow-left-circle'}`}></i>
                </button>
                </div>

                <div className="navbar-btn navbar-btn-right">
                    <a
                        className="btn btn-success update-pro"
                        href="/pageLogin"
                        title="Upgrade to Pro"
                        target="_blank"
                    >
                        <i className="fa fa-rocket"></i> <span>LOGOUT</span>
                    </a>
                </div>
                <div id="navbar-menu">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle icon-menu" data-toggle="dropdown">
                                <i className="lnr lnr-alarm"></i>
                                <span className="badge bg-danger">5</span>
                            </a>
                            <ul className="dropdown-menu notifications">
                                <li><a href="#" className="notification-item"><span className="dot bg-warning"></span>System
                                    space is almost full</a></li>
                                <li><a href="#" className="notification-item"><span className="dot bg-danger"></span>You
                                    have 9 unfinished tasks</a></li>
                                <li><a href="#" className="notification-item"><span className="dot bg-success"></span>Monthly
                                    report is available</a></li>
                                <li><a href="#" className="notification-item"><span className="dot bg-warning"></span>Weekly
                                    meeting in 1 hour</a></li>
                                <li><a href="#" className="notification-item"><span className="dot bg-success"></span>Your
                                    request has been approved</a></li>
                                <li><a href="#" className="more">See all notifications</a></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <img src="/assets/img/user.png" className="img-circle" alt="Avatar"/>
                                <span>Samuel</span> <i className="icon-submenu lnr lnr-chevron-down"></i>
                            </a>
                            <ul className="dropdown-menu">
                                <li><a href="#"><i className="lnr lnr-user"></i> <span>My Profile</span></a></li>
                                <li><a href="#"><i className="lnr lnr-envelope"></i> <span>Message</span></a></li>
                                <li><a href="#"><i className="lnr lnr-cog"></i> <span>Settings</span></a></li>
                                <li><a href="#"><i className="lnr lnr-exit"></i> <span>Logout</span></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;