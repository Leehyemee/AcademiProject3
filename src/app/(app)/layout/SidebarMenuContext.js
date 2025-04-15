"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarMenuContext = createContext();

export const SidebarMenuProvider = ({ children }) => {
    const [collapsedMenus, setCollapsedMenus] = useState({
        post: true,
        course: true,
        myinfo: true,
    });

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSubMenu = (menuKey) => (e) => {
        e.preventDefault();
        setCollapsedMenus((prev) => ({
            ...prev,
            [menuKey]: !prev[menuKey],
        }));
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsSidebarCollapsed(true);
        } else {
            setIsSidebarCollapsed(false);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <SidebarMenuContext.Provider
            value={{
                collapsedMenus,
                toggleSubMenu,
                isSidebarCollapsed,
                toggleSidebar,
            }}
        >
            {children}
        </SidebarMenuContext.Provider>
    );
};

export const useSidebarMenu = () => useContext(SidebarMenuContext);
