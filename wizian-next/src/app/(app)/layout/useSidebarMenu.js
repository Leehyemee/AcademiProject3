"use client";

import { useState } from "react";

const useSidebarMenu = () => {
    const [collapsedMenus, setCollapsedMenus] = useState({
        post: true,
        course: true,
        myinfo: true,
    });

    const toggleSubMenu = (menuKey) => (e) => {
        e.preventDefault();
        setCollapsedMenus((prev) => ({
            ...prev,
            [menuKey]: !prev[menuKey],
        }));
    };

    return {
        collapsedMenus,
        toggleSubMenu,
    };
};

export default useSidebarMenu;