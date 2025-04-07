"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const [collapsedMenus, setCollapsedMenus] = useState({
        post: true,
        course: true,
    });

    const toggleSubMenu = (menuKey) => (e) => {
        e.preventDefault();
        setCollapsedMenus((prev) => ({
            ...prev,
            [menuKey]: !prev[menuKey],
        }));
    };

    return (
        <div id="sidebar-nav" className="sidebar">
            <div className="sidebar-scroll">
                <nav>
                    <ul className="nav">
                        <li>
                            <Link href="/dashboard">
                                <i className="lnr lnr-home"></i> <span>Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <a
                                href="#courseSubMenu"
                                className={`collapsed ${collapsedMenus.course ? "" : "active"}`}
                                onClick={toggleSubMenu("course")}
                            >
                                <i className="lnr lnr-heart"></i>
                                <span>수강 관리</span>
                            </a>

                            <div id="subPages" className={`collapse ${collapsedMenus.course ? "" : "show"}`}>
                                <ul className="nav">
                                    <li>
                                        <Link href="/dashboard">수강중인 과정</Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard">완료 과정</Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard">수료증 발급</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>


                        <li>
                            <a
                                href="#postSubMenu"
                                className={`collapsed ${collapsedMenus.post ? "" : "active"}`}
                                onClick={toggleSubMenu("post")}
                            >
                                <i className="lnr lnr-pencil"></i>
                                <span>내 게시글 관리</span>
                            </a>

                            <div id="subPages" className={`collapse ${collapsedMenus.post ? "" : "show"}`}>
                                <ul className="nav">
                                    <li>
                                        <Link href="/dashboard">강의게시판</Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard">Q&A</Link>
                                    </li>
                                </ul>
                            </div>

                        </li>


                        <li>
                            <Link href="/myinfo">
                                <i className="lnr lnr-user"></i> <span>마이페이지</span>
                            </Link>
                        </li>





                        {/* <li>
                            <a
                                href="#subPages"
                                className={`collapsed ${isCollapsed ? "" : "active"}`}
                                onClick={toggleSubMenu}
                            >
                                <i className="lnr lnr-file-empty"></i>
                                <span>Pages</span>
                            </a>

                            <div id="subPages" className={`collapse ${isCollapsed ? "" : "show"}`}>
                                <ul className="nav">
                                    <li>
                                        <Link href="/pageProfile">Profile</Link>
                                    </li>
                                    <li>
                                        <Link href="/pageLogin">Login</Link>
                                    </li>
                                    <li>
                                        <Link href="/pageLockscreen">Lockscreen</Link>
                                    </li>
                                </ul>
                            </div>
                        </li> */}

                        <li>
                            <Link href="/typography">
                                <i className="lnr lnr-text-format"></i> <span>////</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/typography">
                                <i className="lnr lnr-text-format"></i> <span>Typography</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/icons">
                                <i className="lnr lnr-linearicons"></i> <span>Icons</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
