"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "@/app/(app)/myinfo.css"

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: '변경사항을 적용하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '변경 완료되었습니다!',
                    icon: 'success',
                    confirmButtonText: '확인'
                });
            }
        });
    };

    const handleCancel = () => {
        setUserData(defaultUserData);
    };

    return (
        <div className="container mx-auto max-w-xl p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-6 text-center myinfo">개인정보 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">

                {/* 아이디 */}
                <div>
                    <label htmlFor="stdnt_id" className="font-semibold block mb-1">아이디:</label>
                    <input
                        id="stdnt_id"
                        name="stdnt_id"
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                        value={userData.stdnt_id}
                        readOnly
                    />
                </div>

                {/* 비밀번호 */}
                <div>
                    <label htmlFor="pwd" className="font-semibold block mb-1">비밀번호:</label>
                    <input
                        id="pwd"
                        type="pwd"
                        name="pwd"
                        className="w-full border px-3 py-2 rounded"
                        placeholder="비밀번호"
                        value={userData.pwd}
                        onChange={handleChange}
                    />
                </div>

                {/* 이름 */}
                <div>
                    <label htmlFor="stdnt_nm" className="font-semibold block mb-1">이름:</label>
                    <input
                        id="stdnt_nm"
                        name="stdnt_nm"
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                        value={userData.stdnt_nm}
                        readOnly
                    />
                </div>

                {/* 성별 */}
                <div>
                    <span className="font-semibold">성별:</span> {userData.gender}
                </div>

                {/* 전화번호 */}
                <div>
                    <label htmlFor="phone" className="font-semibold block mb-1">전화번호:</label>
                    <input
                        id="phone"
                        name="phone"
                        className="w-full border px-3 py-2 rounded"
                        placeholder="전화번호"
                        value={userData.phone}
                        onChange={handleChange}
                    />
                </div>

                {/* 주소 */}
                <div>
                    <label htmlFor="addr" className="font-semibold block mb-1">주소:</label>
                    <div className="address-row">
                        <input
                            id="addr"
                            name="addr"
                            className="address-input"
                            placeholder="주소"
                            value={userData.addr}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="search-address-btn"
                            onClick={() => alert('주소 검색 api 넣을 예정~!')}
                        >
                            주소 검색
                        </button>
                    </div>
                </div>

                {/* 상세주소 */}
                <div>
                    <label htmlFor="addr_dtl" className="font-semibold block mb-1">상세 주소:</label>
                    <input
                        id="addr_dtl"
                        name="addr_dtl"
                        className="w-full border px-3 py-2 rounded"
                        placeholder="상세 주소"
                        value={userData.addr_dtl}
                        onChange={handleChange}
                    />
                </div>

                {/* 가입일 */}
                <div>
                    <label htmlFor="stdnt_regdate" className="font-semibold block mb-1">가입일:</label>
                    <input
                        id="stdnt_regdate"
                        name="stdnt_regdate"
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                        value={userData.stdnt_regdate}
                        readOnly
                    />
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="btn-complate"
                    >
                        수정 완료
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn-cansle"
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PageMyInfo;
