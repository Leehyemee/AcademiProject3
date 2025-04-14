const LoginTabButtons = ({ activeTab, setActiveTab }) => {
    return (
        <div className="login-tab-buttons">
            <button
                onClick={() => setActiveTab("student")}
                className={`tab-btn ${activeTab === "student" ? "tab-active" : "tab-inactive"}`}
            >
                학생 계정
            </button>
            <button
                onClick={() => setActiveTab("teacher")}
                className={`tab-btn ${activeTab === "teacher" ? "tab-active" : "tab-inactive"}`}
            >
                강사 계정
            </button>
        </div>
    );
};

export default LoginTabButtons;
