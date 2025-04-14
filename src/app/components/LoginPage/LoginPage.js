"use client";
import { useState } from "react";
import "./pagelogin.css";
import LogoSection from "./LogoSection";
import LoginBox from "./LoginBox";

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState("student");

    return (
        <div className="login-page-wrap">
            <LogoSection />
            <LoginBox activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

export default LoginPage;
