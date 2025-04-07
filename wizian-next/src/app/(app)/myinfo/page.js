"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "@/app/(app)/myinfo.css";

const PageMyInfo = () => {
    const defaultUserData = {
        stdnt_id: "student123",
        pwd: "",
        stdnt_nm: "홍길동",
        gen_cd: "남성",
        phone: "010-1234-5678",
        addr: "서울특별시 강남구",
        addr_dtl: "123-45",
        stdnt_regdate: "2024-01-15",
    };

    const [userData, setUserData] = useState(defaultUserData);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "변경사항을 적용하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니오",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "변경 완료되었습니다!",
                    icon: "success",
                    confirmButtonText: "확인",
                });
                setIsEditMode(false);
            }
        });
    };

    const handleCancel = () => {
        setUserData(defaultUserData);
        setIsEditMode(false);
    };

    if (!isEditMode) {
        return (
            <div className="container">
                <h2 className="myinfo">홍길동님의 회원정보</h2>
                <div className="info-grid">
                    <div><strong>아이디:</strong></div><div>{userData.stdnt_id}</div>
                    <div><strong>이름:</strong></div><div>{userData.stdnt_nm}</div>
                    <div><strong>성별:</strong></div><div>{userData.gen_cd}</div>
                    <div><strong>전화번호:</strong></div><div>{userData.phone}</div>
                    <div><strong>주소:</strong></div><div>{userData.addr}</div>
                    <div><strong>상세 주소:</strong></div><div>{userData.addr_dtl}</div>
                    <div><strong>가입일:</strong></div><div>{userData.stdnt_regdate}</div>
                </div>
                <div className="flex justify-center mt-6">
                    <button onClick={() => setIsEditMode(true)} className="btn-complate">
                        수정하기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-xl p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-6 text-center myinfo">개인정보 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                    <label htmlFor="stdnt_id" className="font-semibold block mb-1">아이디:</label>
                    <input id="stdnt_id" name="stdnt_id" className="w-full border px-3 py-2 rounded bg-gray-100" value={userData.stdnt_id} readOnly />
                </div>

                <div>
                    <label htmlFor="pwd" className="font-semibold block mb-1">비밀번호:</label>
                    <input id="pwd" type="password" name="pwd" className="w-full border px-3 py-2 rounded" placeholder="비밀번호" value={userData.pwd} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="stdnt_nm" className="font-semibold block mb-1">이름:</label>
                    <input id="stdnt_nm" name="stdnt_nm" className="w-full border px-3 py-2 rounded bg-gray-100" value={userData.stdnt_nm} readOnly />
                </div>

                <div className="gender-inline">
                    <label className="font-semibold mr-4">성별:</label>
                    <div className="gender-button-group">
                        <button
                            type="button"
                            className={`gender-button ${userData.gen_cd === '남성' ? 'active-male' : ''}`}
                            disabled
                        >
                            남자
                        </button>
                        <button
                            type="button"
                            className={`gender-button ${userData.gen_cd === '여성' ? 'active-female' : ''}`}
                            disabled
                        >
                            여자
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="font-semibold block mb-1">전화번호:</label>
                    <input id="phone" name="phone" className="w-full border px-3 py-2 rounded" placeholder="전화번호" value={userData.phone} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="addr" className="font-semibold block mb-1">주소:</label>
                    <div className="address-row">
                        <input id="addr" name="addr" className="address-input" placeholder="주소" value={userData.addr} onChange={handleChange} />
                        <button type="button" className="search-address-btn" onClick={() => alert('주소 검색 API 예정')}>주소 검색</button>
                    </div>
                </div>

                <div>
                    <label htmlFor="addr_dtl" className="font-semibold block mb-1">상세 주소:</label>
                    <input id="addr_dtl" name="addr_dtl" className="w-full border px-3 py-2 rounded" placeholder="상세 주소" value={userData.addr_dtl} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="stdnt_regdate" className="font-semibold block mb-1">가입일:</label>
                    <input id="stdnt_regdate" name="stdnt_regdate" className="w-full border px-3 py-2 rounded bg-gray-100" value={userData.stdnt_regdate} readOnly />
                </div>

                <div className="flex justify-between mt-6">
                    <button type="submit" className="btn-complate">수정 완료</button>
                    <button type="button" onClick={handleCancel} className="btn-cansle">취소</button>
                </div>
            </form>
        </div>
    );
};

export default PageMyInfo;
