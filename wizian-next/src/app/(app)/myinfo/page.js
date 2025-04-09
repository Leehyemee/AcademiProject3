"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import "@/app/(app)/myinfo.css";
import Swal from 'sweetalert2';

const PageMyInfo = () => {
    const breadcrumbItems = [
        { label: "대시보드", href: "/dashboard" },
        { label: "마이페이지" },
        { label: "회원정보", href: "/myinfo" },
    ];

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // 토큰 가져오기
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    // 토큰이 없으면 로그인 페이지로 리다이렉션
                    location.href = "/member/login";
                    return;
                }

                // 요청 헤더 설정
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

                // 사용자 정보 API 호출
                const response = await fetch("http://localhost:8080/api/auth/stdnt/myinfo", {
                    method: "GET",
                    headers: headers
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    throw new Error("사용자 정보를 불러오지 못했습니다.");
                }
            } catch (error) {
                console.error("서버 오류:", error);
                Swal.fire({
                    title: '서버 오류',
                    text: '사용자 정보를 불러오는 데 실패했습니다.',
                    icon: 'error',
                    confirmButtonText: '확인',
                });
                location.href = "/member/login";  // 오류 발생 시 로그인 페이지로 이동
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = () => {
        window.location.href = "/myinfoedit"; // 페이지 이동
    };

    if (!userData) {
        return <div>오류가 발생하였습니다... 다시 시도해주세요</div>;
    }

    const genderText = userData.genCd === "M" ? "남자" : userData.genCd === "F" ? "여자" : "알 수 없음";

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
    };

    const detailedAddress = userData.addrDtl ? userData.addrDtl : "미기재";

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />

            <div className="container mx-auto p-6 bg-white shadow rounded">
                <h2 className="myinfo">{userData.stdntNm}님의 회원정보</h2>
                <div className="info-grid">
                    <div><strong>아이디:</strong></div><div>{userData.stdntId}</div>
                    <div><strong>이름:</strong></div><div>{userData.stdntNm}</div>
                    <div><strong>이메일:</strong></div><div>{userData.stdntEmail}</div>
                    <div><strong>성별:</strong></div><div>{genderText}</div>
                    <div><strong>전화번호:</strong></div><div>{userData.phone}</div>
                    <div><strong>우편번호:</strong></div><div>{userData.zipCd}</div>
                    <div><strong>주소:</strong></div><div>{userData.addr}</div>
                    <div><strong>상세 주소:</strong></div><div>{detailedAddress}</div>
                    <div><strong>가입일:</strong></div><div>{formatDate(userData.stdntRegdate)}</div>
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
