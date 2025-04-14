"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const useEditMyInfo = () => {
    const [userData, setUserData] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    location.href = "/pageLogin";
                    return;
                }

                const response = await fetch("http://localhost:8080/api/auth/stdnt/myinfo", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData({ ...data, newPwd: "" });
                } else {
                    throw new Error("사용자 정보를 불러오지 못했습니다.");
                }
            } catch (error) {
                console.error("서버 오류:", error);
                Swal.fire({
                    title: "서버 오류",
                    text: "사용자 정보를 불러오는 데 실패했습니다.",
                    icon: "error",
                    confirmButtonText: "확인",
                });
                location.href = "/pageLogin";
            }
        };

        fetchUserData();
    }, []);

    return { userData, setUserData, errors, setErrors };
};

export default useEditMyInfo;