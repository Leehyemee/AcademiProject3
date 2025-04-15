"use client";

import { useState, useEffect } from "react";

const useSidebarMenu = () => {
    const [collapsedMenus, setCollapsedMenus] = useState({
        post: true,
        course: true,
        myinfo: true,
    });
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // 사이드바 전체 collapsed 상태

    const toggleSubMenu = (menuKey) => (e) => {
        e.preventDefault();
        setCollapsedMenus((prev) => ({
            ...prev,
            [menuKey]: !prev[menuKey],
        }));
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev); // 전체 사이드바 상태 토글
    };

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsSidebarCollapsed(true); // 작은 화면에서 기본적으로 사이드바 접힘
        } else {
            setIsSidebarCollapsed(false); // 큰 화면에서는 펼쳐짐
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        collapsedMenus,
        toggleSubMenu,
        isSidebarCollapsed,
        toggleSidebar, // 사이드바 상태 변경 함수 반환
    };
};

export default useSidebarMenu;