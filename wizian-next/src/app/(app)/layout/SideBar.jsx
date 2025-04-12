"use client";

import React from "react";
import Link from "next/link";
import useSidebarMenu from "./useSidebarMenu";
import SidebarMenuGroup from "./SidebarMenuGroup";


const SideBar = () => {
    const { collapsedMenus, toggleSubMenu } = useSidebarMenu();

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

                        <SidebarMenuGroup
                            menuKey="course"
                            title="수강 관리"
                            iconClass="lnr-graduation-hat"
                            isCollapsed={collapsedMenus.course}
                            onToggle={toggleSubMenu("course")}
                            links={[
                                { href: "/dashboard", label: "수강 신청" },
                                { href: "/dashboard", label: "과제 관리" },
                                { href: "/dashboard", label: "설문 관리" },
                                { href: "/dashboard", label: "내 강의 정보" },
                            ]}
                        />

                        <SidebarMenuGroup
                            menuKey="post"
                            title="게시판 관리"
                            iconClass="lnr-pencil"
                            isCollapsed={collapsedMenus.post}
                            onToggle={toggleSubMenu("post")}
                            links={[
                                { href: "/board", label: "강의게시판" },
                                { href: "/dashboard", label: "Q&A" },
                            ]}
                        />

                        <SidebarMenuGroup
                            menuKey="myinfo"
                            title="마이페이지"
                            iconClass="lnr-user"
                            isCollapsed={collapsedMenus.myinfo}
                            onToggle={toggleSubMenu("myinfo")}
                            links={[{ href: "/myinfo", label: "회원 정보" }]}
                        />

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
