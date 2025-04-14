import React from "react";
import Link from "next/link";

const SidebarMenuGroup = ({ menuKey, title, iconClass, isCollapsed, onToggle, links }) => {
    return (
        <li>
            <a
                href={`#${menuKey}SubMenu`}
                className={`collapsed ${isCollapsed ? "" : "active"}`}
                onClick={onToggle}
            >
                <i className={`lnr ${iconClass}`}></i>
                <span>{title}</span>
            </a>

            <div id="subPages" className={`collapse ${isCollapsed ? "" : "show"}`}>
                <ul className="nav">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
};

export default SidebarMenuGroup;
