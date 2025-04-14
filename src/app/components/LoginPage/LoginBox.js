"use client";
import Login from "./Login";
import TeacherLogin from "./TeacherLogin";
import LoginTabButtons from "./LoginTabButtons";
import LoginBottomHelper from "./LoginBottomHelper";

const LoginBox = ({ activeTab, setActiveTab }) => (
    <div className="login-box">
        <div className="content text-center">
            <h3>로그인</h3>
            <LoginTabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "student" ? <Login /> : <TeacherLogin />}
            <LoginBottomHelper />
        </div>
    </div>
);

export default LoginBox;
