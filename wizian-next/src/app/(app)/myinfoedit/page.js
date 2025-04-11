"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import "@/app/(app)/myinfodeit.css";

const PageMyInfoEdit = () => {
    const breadcrumbItems = [
        { label: "대시보드", href: "/dashboard" },
        { label: "마이페이지" },
        { label: "회원정보", href: "/myinfo" },
        { label: "회원정보 수정", href: "/myinfoedit" },
    ];

    const [userData, setUserData] = useState(null);
    const [errors, setErrors] = useState({});

    // useEffect로 백엔드에서 사용자 정보를 가져옵니다.
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
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
            if (result.isConfirmed) {
                updateUserInfo(userData);
            }
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
            if (!updatedData.newPwd) {
                delete updatedData.newPwd;
            }

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

    const handleCancel = () => {
        location.href = "/myinfo";
    };

    const validateEditForm = (values) => {
        let formErrors = {};

        // 비밀번호가 변경되었을 때만 검사
        if (values.newPwd && values.newPwd.length < 6) {
            formErrors.newPwd = "비밀번호는 6자 이상이어야 합니다!!";
        }

        // 이메일이 변경되었을 때만 검사
        if (values.stdnt_email && !/\S+@\S+\.\S+/.test(values.stdnt_email)) {
            formErrors.stdnt_email = "유효한 이메일 주소를 입력하세요!!";
        }

        // 전화번호가 변경되었을 때만 검사
        if (values.phone && !/^010-\d{4}-\d{4}$/.test(values.phone)) {
            formErrors.phone = "유효한 전화번호 형식이 아닙니다!!";
        }

        // 주소가 변경되었을 때만 검사
        if (values.zip_cd && !values.addr) {
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

    if (!userData) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />

            <div className="container mx-auto p-6 bg-white shadow rounded">
                <h2 className="text-2xl font-bold mb-6 text-center myinfo">개인정보 수정</h2>

                {/* 변경 불가 항목 카드 */}
                <div className="card-vertical-wrap">
                    {/* 변경 불가 항목 카드 */}
                    <div className="card">
                        <h3 className="section-title">수정 불가 항목</h3>
                        <div className="form-group">
                            <label>아이디</label>
                            <input type="text" value={userData.stdntId} readOnly />
                        </div>
                        <div className="form-group">
                            <label>이름</label>
                            <input type="text" value={userData.stdntNm} readOnly />
                        </div>
                        <div className="form-group">
                            <label>성별</label>
                            <input type="text" value={userData.genCd === "M" ? "남자" : "여자"} readOnly />
                        </div>
                    </div>

                    {/* 변경 가능한 항목 카드 */}
                    <div className="card">
                        <h3 className="section-title">수정 가능한 항목</h3>
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label>비밀번호</label>
                                <input type="password" name="newPwd" value={userData.newPwd || ''}
                                       onChange={(e) => setUserData({ ...userData, newPwd: e.target.value })}
                                       placeholder="비밀번호 입력 (변경하지 않으려면 비워두세요)"/>
                                <span className="hint-text">(변경하시려면 새 비밀번호 입력, 공백이면 기존 비밀번호 유지)</span>
                            </div>
                            <div className="form-group">
                                <label>이메일</label>
                                <input type="email" name="stdntEmail" value={userData.stdntEmail} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>전화번호</label>
                                <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group address-group">
                                <label>우편번호</label>
                                <div className="zip-row">
                                    <input name="zipCd" value={userData.zipCd} onChange={handleChange} />
                                    <button type="button" onClick={handleAddressSearch}>주소 검색</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>주소</label>
                                <input name="addr" value={userData.addr} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>상세주소</label>
                                <input name="addrDtl" value={userData.addrDtl || ''} onChange={handleChange} />
                            </div>

                            <div className="form-button-row">
                                <button type="button" className="btn-cansle" onClick={handleCancel}>취소</button>
                                <button type="submit" className="btn-complate">수정 완료</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageMyInfoEdit;
