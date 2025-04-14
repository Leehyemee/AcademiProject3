"use client";
import React from "react";
import "./Breadcrumb.css";

const Breadcrumb = ({ items }) => (
    <nav className="breadcrumb-wrapper text-sm text-gray-500 mb-6 mt-4">
        <ul className="breadcrumb-list space-x-2">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <li>
                        {item.href ? (
                            <a
                                href={item.href}
                                className={`text-blue-600 hover:underline ${index === items.length - 1 ? 'active-breadcrumb' : ''}`}
                            >
                                {item.label}
                            </a>
                        ) : (
                            <span className={`text-gray-700 font-medium ${index === items.length - 1 ? 'active-breadcrumb' : ''}`}>
                                {item.label}
                            </span>
                        )}
                    </li>
                    {index < items.length - 1 && (
                        <li className="mx-2 text-gray-400">{' > '}</li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    </nav>
);

export default Breadcrumb;
