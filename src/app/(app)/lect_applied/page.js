'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import "../lect_applied.css";

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
                setAppliedLectures(data);
            } catch (error) {
                console.error('신청 내역 가져오기 실패:', error);
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

    const cancelLecture = async (lectNo) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:8080/api/auth/lect/cancel/${lectNo}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                Swal.fire('수강신청 취소', '수강신청이 취소되었습니다.', 'success');
                setAppliedLectures(appliedLectures.filter(lect => lect.lectNo !== lectNo));거
            } else {
                Swal.fire('오류', '수강신청 취소에 실패했습니다.', 'error');
            }
        } catch (error) {
            console.error('수강신청 취소 실패:', error);
            Swal.fire('오류', '수강신청 취소에 실패했습니다.', 'error');
        }
    };

    return (
        <div className="lecture-container">
            <h1>내 수강 신청 내역</h1>
            {appliedLectures.length === 0 ? (
                <p>신청한 강의가 없습니다.</p>
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
                        {appliedLectures.map(lect => (
                            <tr key={lect.lectInfo.lectNo}>
                                <td>{lect.lectInfo.lectNm}</td>
                                <td>{lect.lectInfo.instNm}</td>
                                <td>{formatDate(lect.lectInfo.lectStart)}</td>
                                <td>{lect.lectInfo.lectLoc}</td>
                                <td>{lect.applyStatus}</td>
                                <td>{formatDate(lect.applyDate)}</td>
                                <td>{lect.lectInfo.lectDesc}</td>
                                <td>
                                    <button
                                        className="cancel-button"
                                        onClick={() => cancelLecture(lect.lectNo)}>
                                        취소
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
