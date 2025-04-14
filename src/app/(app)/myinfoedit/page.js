"use client";

import React from "react";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import useEditMyInfo from "@/app/hooks/useEditMyInfo";
import MyInfoEditForm from "@/app/components/Myinfo/MyInfoEditForm";
import "@/app/(app)/myinfodeit.css";

const PageMyInfoEdit = () => {
    const breadcrumbItems = [
        { label: "대시보드", href: "/dashboard" },
        { label: "마이페이지" },
        { label: "회원정보", href: "/myinfo" },
        { label: "회원정보 수정", href: "/myinfoedit" },
    ];

    const { userData, setUserData, errors, setErrors } = useEditMyInfo();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        location.href = "/myinfo";
    };

    const handleAddressSearch = () => {
        if (typeof window.daum !== "undefined" && typeof window.daum.Postcode === "function") {
            openDaumPostcode();
        } else {
            const script = document.createElement("script");
            script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
            script.async = true;
            script.onload = () => {
                if (typeof window.daum !== "undefined" && typeof window.daum.Postcode === "function") {
                    openDaumPostcode();
                } else {
                    console.error("Daum Postcode API 로딩 실패");
                }
            };
            document.body.appendChild(script);
        }
    };


    const openDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                const fullAddress = data.address;
                const zonecode = data.zonecode;

                setUserData((prev) => ({
                    ...prev,
                    zipCd: zonecode,
                    addr: fullAddress,
                }));
            },
        }).open();
    };

    const validateEditForm = (values) => {
        let formErrors = {};
        if (values.newPwd && values.newPwd.length < 6) formErrors.newPwd = "비밀번호는 6자 이상이어야 합니다!!";
        if (values.stdntEmail && !/\S+@\S+\.\S+/.test(values.stdntEmail)) formErrors.stdntEmail = "유효한 이메일 주소를 입력하세요!!";
        if (values.phone && !/^010-\d{4}-\d{4}$/.test(values.phone)) formErrors.phone = "유효한 전화번호 형식이 아닙니다!!";
        if (values.zipCd && !values.addr) {
            formErrors.zipCd = "주소 검색 후 우편번호를 입력하세요!!";
            formErrors.addr = "주소 검색 후 주소를 입력하세요!!";
        }
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateEditForm(userData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        Swal.fire({
            title: "변경사항을 적용하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니오",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) updateUserInfo(userData);
        });
    };

    const updateUserInfo = async (userData) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                location.href = "/PageLogin";
                return;
            }

            const updatedData = { ...userData };
            if (!updatedData.newPwd) delete updatedData.newPwd;

            const response = await fetch("http://localhost:8080/api/auth/stdnt/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                Swal.fire({
                    title: "변경 완료되었습니다!",
                    text: "회원정보 화면으로 이동합니다.",
                    icon: "success",
                    confirmButtonText: "확인",
                }).then(() => {
                    location.href = "/myinfo";
                });
            } else {
                throw new Error("서버 오류: 정보를 수정할 수 없습니다.");
            }
        } catch (error) {
            console.error("서버 오류:", error);
            Swal.fire({
                title: "서버 오류",
                text: "회원 정보를 수정하는 데 실패했습니다.",
                icon: "error",
                confirmButtonText: "확인",
            });
        }
    };

    if (!userData) return <div>로딩 중...</div>;

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />

            <div className="container mx-auto p-6 bg-white shadow rounded">
                <h2 className="text-2xl font-bold mb-6 text-center myinfo">개인정보 수정</h2>
                <div className="card-vertical-wrap">
                    <div className="card">
                        <h3 className="section-title">수정 불가 항목</h3>
                        <div className="form-group"><label>아이디</label><input type="text" value={userData.stdntId} readOnly /></div>
                        <div className="form-group"><label>이름</label><input type="text" value={userData.stdntNm} readOnly /></div>
                        <div className="form-group"><label>성별</label><input type="text" value={userData.genCd === "M" ? "남자" : "여자"} readOnly /></div>
                    </div>

                    <div className="card">
                        <h3 className="section-title">수정 가능한 항목</h3>
                        <MyInfoEditForm
                            userData={userData}
                            setUserData={setUserData}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            handleCancel={handleCancel}
                            handleChange={handleChange}
                            handleAddressSearch={handleAddressSearch}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageMyInfoEdit;