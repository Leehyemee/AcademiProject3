"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import "@/app/(app)/myinfodeit.css";

const PageMyInfoEdit = () => {
    const breadcrumbItems = [
        { label: "대시보드", href: "/dashboard" },
        { label: "마이페이지", href: "/myinfo" },
        { label: "회원정보", href: "/myinfo" },
        { label: "회원정보 수정", href: "/myinfoedit" },
    ];

    const defaultUserData = {
        stdnt_id: "student123",
        pwd: "",
        stdnt_nm: "홍길동",
        stdnt_email: "",
        gen_cd: "남성",
        phone: "010-1234-5678",
        zip_cd: "",
        addr: "서울특별시 강남구",
        addr_dtl: "123-45",
        stdnt_regdate: "2024-01-15",
    };

    const [userData, setUserData] = useState(defaultUserData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
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
            if (result.isConfirmed) {
                Swal.fire({
                    title: "변경 완료되었습니다!",
                    icon: "success",
                    confirmButtonText: "확인",
                });
            }
        });
    };

    const handleCancel = () => {
        setUserData(defaultUserData);
        setErrors({});
    };

    const validateEditForm = (values) => {
        let formErrors = {};

        if (!values.pwd) {
            formErrors.pwd = "비밀번호를 입력하세요!!";
        } else if (values.pwd.length < 6) {
            formErrors.pwd = "비밀번호는 6자 이상이어야 합니다!!";
        }

        if (!values.stdnt_email) {
            formErrors.stdnt_email = "이메일을 입력하세요!!";
        } else if (!/\S+@\S+\.\S+/.test(values.stdnt_email)) {
            formErrors.stdnt_email = "유효한 이메일 주소를 입력하세요!!";
        }

        if (!values.stdnt_nm) {
            formErrors.stdnt_nm = "이름을 입력하세요!!";
        }

        if (!values.phone) {
            formErrors.phone = "전화번호를 입력하세요!!";
        } else if (!/^010-\d{4}-\d{4}$/.test(values.phone)) {
            formErrors.phone = "유효한 전화번호 형식이 아닙니다!!";
        }

        if (!values.zip_cd || !values.addr) {
            formErrors.zip_cd = "주소 검색 후 우편번호를 입력하세요!!";
            formErrors.addr = "주소 검색 후 주소를 입력하세요!!";
        }

        return formErrors;
    };

    const handleAddressSearch = () => {
        if (window.daum && window.daum.Postcode) {
            openDaumPostcode();
        } else {
            const script = document.createElement("script");
            script.src = "https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js";
            script.onload = () => {
                setTimeout(() => {
                    openDaumPostcode();
                }, 100);
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
                    zip_cd: zonecode,
                    addr: fullAddress,
                }));
            },
        }).open();
    };

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />

            <div className="container mx-auto p-6 bg-white shadow rounded">
                <h2 className="text-2xl font-bold mb-6 text-center myinfo">개인정보 수정</h2>
                <form className="space-y-4 text-sm">
                    <div>
                        <label htmlFor="stdnt_id" className="font-semibold block mb-1">아이디:</label>
                        <input id="stdnt_id" name="stdnt_id" className="w-full border px-3 py-2 rounded bg-gray-100" value={userData.stdnt_id} readOnly />
                    </div>

                    <div>
                        <label>이름</label>
                        <input name="stdnt_nm" onChange={handleChange} value={userData.stdnt_nm} type="text" />
                        {errors.stdnt_nm && <p className="error-msg">{errors.stdnt_nm}</p>}
                    </div>

                    <div>
                        <label>성별</label>
                        <div className="gender-options">
                            <button type="button" className={`gender-btn ${userData.gen_cd === "남성" ? "active" : ""}`}
                                    onClick={() => setUserData((prev) => ({ ...prev, gen_cd: "남성" }))}>남</button>
                            <button type="button" className={`gender-btn ${userData.gen_cd === "여성" ? "active" : ""}`}
                                    onClick={() => setUserData((prev) => ({ ...prev, gen_cd: "여성" }))}>여</button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="stdnt_regdate" className="font-semibold block mb-1">가입일:</label>
                        <input id="stdnt_regdate" name="stdnt_regdate" className="w-full border px-3 py-2 rounded bg-gray-100" value={userData.stdnt_regdate} readOnly />
                    </div>
                </form>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label htmlFor="pwd" className="font-semibold block mb-1">비밀번호:</label>
                        <input id="pwd" type="password" name="pwd" className="w-full border px-3 py-2 rounded" placeholder="비밀번호" value={userData.pwd} onChange={handleChange} />
                        {errors.pwd && <p className="error-msg">{errors.pwd}</p>}
                    </div>

                    <div>
                        <label>이메일</label>
                        <input name="stdnt_email" onChange={handleChange} value={userData.stdnt_email} type="email" placeholder="예) abc123@domain.com" />
                        {errors.stdnt_email && <p className="error-msg">{errors.stdnt_email}</p>}
                    </div>

                    <div>
                        <label>전화번호</label>
                        <input name="phone" onChange={handleChange} value={userData.phone} type="text" placeholder="예: 010-1234-5678" />
                        {errors.phone && <p className="error-msg">{errors.phone}</p>}
                    </div>

                    <div>
                        <label>우편번호</label>
                        <div className="zip-row">
                            <input name="zip_cd" onChange={handleChange} value={userData.zip_cd} type="text" placeholder="주소 검색 시 자동 입력됩니다." />
                            <button type="button" className="addrbtn" onClick={handleAddressSearch}>주소 검색</button>
                        </div>
                        {errors.zip_cd && <p className="error-msg">{errors.zip_cd}</p>}
                    </div>

                    <div>
                        <label>주소</label>
                        <input name="addr" onChange={handleChange} value={userData.addr} type="text" placeholder="기본 주소" />
                        {errors.addr && <p className="error-msg">{errors.addr}</p>}
                    </div>

                    <div>
                        <label>상세주소</label>
                        <input name="addr_dtl" onChange={handleChange} value={userData.addr_dtl} type="text" placeholder="나머지 주소(선택입력 가능)" />
                    </div>

                    <div className="flex justify-between mt-6">
                        <button type="submit" className="btn-complate">수정 완료</button>
                        <button type="button" onClick={handleCancel} className="btn-cansle">취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PageMyInfoEdit;
