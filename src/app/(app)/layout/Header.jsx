'use client';

import React from "react";
import Swal from "sweetalert2";
import { useHeaderLayout } from "./useHeaderLayout";
import { useLogout } from "@/app/components/useLogout";
import useSidebarMenu from "./useSidebarMenu";

const Header = () => {
    const { isFullWidth, handleToggleFullWidth } = useHeaderLayout();
    const { isSidebarCollapsed, toggleSidebar } = useSidebarMenu();
    const logout = useLogout();

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
                logout();
            }
        });
    };

    const handleToggleSidebar = () => {
        toggleSidebar();
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
                    <button className="btn-toggle-sidebar" onClick={toggleSidebar}>
                        <i className={`lnr ${isSidebarCollapsed ? 'lnr-arrow-right-circle' : 'lnr-arrow-left-circle'}`}></i>
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
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <span><i className="lnr lnr-user"></i></span> <i className="icon-submenu lnr lnr-chevron-down"></i>
                            </a>
                            <ul className="dropdown-menu">
                                <li><a href="/myinfo"><i className="lnr lnr-user"></i> <span>My Profile</span></a></li>
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