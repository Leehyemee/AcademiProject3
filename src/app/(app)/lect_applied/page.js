'use client';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import "../lect_applied.css";
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";

const breadcrumbItems = [
    { label: '대시보드', href: '/dashboard' },
    { label: '수강관리' },
    { label: '수강신청', href: '/lect_apply' },
    { label: '내 강의 정보', href: '/lect_applied' }
];

export default function AppliedLecturesPage() {
    const [appliedLectures, setAppliedLectures] = useState([]);

    useEffect(() => {
        const fetchAppliedLectures = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            try {
                const response = await fetch('http://localhost:8080/api/auth/lect/mine', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (Array.isArray(data)) {
                    setAppliedLectures(data);
                } else {
                    setAppliedLectures([]);
                }
            } catch (error) {
                console.error('신청 내역 가져오기 실패:', error);
                setAppliedLectures([]);
            }
        };

        fetchAppliedLectures();
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';

        const date = new Date(dateStr);

        if (isNaN(date)) return ''; // Invalid Date 처리

        // 날짜 포맷: 2025년 4월 14일
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    const cancelLecture = async (lectNo, lectNm) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        const result = await Swal.fire({
            title: `정말 ${lectNm} 강의를 수강신청을 취소하시겠습니까?`,
            text: `모집 후 개설된 강의는 취소 불가`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '네, 취소할게요!',
            cancelButtonText: '아니오',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/lect/cancel/${lectNo}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    await Swal.fire('수강신청 취소', '수강신청이 취소되었습니다.', 'success');
                    setAppliedLectures(appliedLectures.filter(lect => lect.lectInfo.lectNo !== lectNo));
                } else {
                    Swal.fire('오류', '수강신청 취소에 실패했습니다.', 'error');
                }
            } catch (error) {
                console.error('수강신청 취소 실패:', error);
                Swal.fire('오류', '수강신청 취소에 실패했습니다.', 'error');
            }
        }
    };

    return (
        <div className="lecture-container">
            <Breadcrumb items={breadcrumbItems} />

            <div className="card applied-lectures-card">
                <h1 className="lecture-title">내 수강 신청 내역</h1>
                {Array.isArray(appliedLectures) && appliedLectures.length === 0 ? (
                    <div className="no-lectures-container">
                        <p className="no-lectures-msg">신청한 강의가 없습니다. 😔</p>
                        <a href="/lect_apply" className="apply-link">수강신청하러 가기</a>
                    </div>
                ) : (
                    <div className="lecture-table-container">
                        <table className="lecture-table">
                            <thead>
                            <tr>
                                <th>강의명</th>
                                <th>강사명</th>
                                <th>시작일</th>
                                <th>장소</th>
                                <th>수강 상태</th>
                                <th>신청일</th>
                                <th>수업 설명</th>
                                <th>수강 취소</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(appliedLectures) && appliedLectures.map(lect => (
                                <tr key={lect.lectInfo.lectNo}>
                                    <td>{lect.lectInfo.lectNm}</td>
                                    <td>{lect.lectInfo.instNm}</td>
                                    <td>{formatDate(lect.lectInfo.lectStart)}</td>
                                    <td>{lect.lectInfo.lectLoc}</td>
                                    <td>{lect.applyStatus}</td>
                                    <td>{formatDate(lect.applyDate)}</td>
                                    <td>{lect.lectInfo.lectDesc}</td>
                                    <td>
                                        {lect.applyStatus === '수강신청중' && (
                                            <button
                                                className="cancel-button"
                                                onClick={() => cancelLecture(lect.lectInfo.lectNo, lect.lectInfo.lectNm)}>
                                                취소
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
