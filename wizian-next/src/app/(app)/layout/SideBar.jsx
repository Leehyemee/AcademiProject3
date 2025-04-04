"use client";

import React, { useState } from "react";
import Link from "next/link";

const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSubMenu = (e) => {
        e.preventDefault(); // 페이지 이동 방지
        setIsCollapsed((prev) => !prev);
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
                            <Link href="/elements">
                                <i className="lnr lnr-code"></i> <span>Elements</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/myinfo">
                                <i className="lnr lnr-chart-bars"></i> <span>개인정보</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/panels">
                                <i className="lnr lnr-cog"></i> <span>Panels</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/notifications">
                                <i className="lnr lnr-alarm"></i> <span>Notifications</span>
                            </Link>
                        </li>

                        <li>
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
                        </li>

                        <li>
                            <Link href="/tables">
                                <i className="lnr lnr-dice"></i> <span>Tables</span>
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
