"use client";
import useForgotPwd from "@/app/hooks/useForgotPwd";
import ForgotPwdForm from "@/app/components/ForgotPwdForm";
import "@/app/(app)/forgotPwd.css";

const ForgotPwdPage = () => {
    const {
        userId, setUserId,
        verificationCode, setVerificationCode,
        newPwd, setNewPwd,
        step,
        handleStep1Submit,
        handleStep2Submit,
        handleStep3Submit,
        loading,
        email
    } = useForgotPwd();

    return (
        <ForgotPwdForm
            step={step}
            userId={userId}
            setUserId={setUserId}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            newPwd={newPwd}
            setNewPwd={setNewPwd}
            handleStep1Submit={handleStep1Submit}
            handleStep2Submit={handleStep2Submit}
            handleStep3Submit={handleStep3Submit}
            loading={loading}
            email={email}
        />
    );
};

export default ForgotPwdPage;