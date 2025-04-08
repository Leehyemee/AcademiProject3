"use client";

import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import "@/app/(app)/myinfo.css";

const PageMyInfo = () => {
    const breadcrumbItems = [
        { label: "대시보드", href: "/dashboard" },
        { label: "마이페이지" },
        { label: "회원정보", href: "/myinfo" },
    ];

    const defaultUserData = {
        stdnt_id: "student123",
        stdnt_nm: "홍길동",
        gen_cd: "남성",
        phone: "010-1234-5678",
        addr: "서울특별시 강남구",
        addr_dtl: "123-45",
        stdnt_regdate: "2024-01-15",
    };

    const handleEditClick = () => {
        window.location.href = "/myinfoedit"; // 페이지 이동
    };

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />

            <div className="container mx-auto p-6 bg-white shadow rounded">
                <h2 className="myinfo">홍길동님의 회원정보</h2>
                <div className="info-grid">
                    <div><strong>아이디:</strong></div><div>{defaultUserData.stdnt_id}</div>
                    <div><strong>이름:</strong></div><div>{defaultUserData.stdnt_nm}</div>
                    <div><strong>성별:</strong></div><div>{defaultUserData.gen_cd}</div>
                    <div><strong>전화번호:</strong></div><div>{defaultUserData.phone}</div>
                    <div><strong>주소:</strong></div><div>{defaultUserData.addr}</div>
                    <div><strong>상세 주소:</strong></div><div>{defaultUserData.addr_dtl}</div>
                    <div><strong>가입일:</strong></div><div>{defaultUserData.stdnt_regdate}</div>
                </div>
                <div className="flex justify-center mt-6">
                    <button onClick={handleEditClick} className="btn-complate">
                        수정하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageMyInfo;
