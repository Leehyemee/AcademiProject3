'use client';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import '../lect.css';
import jwt_decode from 'jwt-decode';

const breadcrumbItems = [
    { label: '대시보드', href: '/dashboard' },
    { label: '수강관리' },
    { label: '수강신청', href: '/lect_apply' },
];

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes < 10 ? '0' + minutes : minutes}분`;
};

export default function LectureApplyPage() {
    const [lectures, setLectures] = useState([]);
    const [selectedLecture, setSelectedLecture] = useState(null);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await fetch('http://localhost:8080/api/auth/lect/check', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 401) {
                    alert('로그인이 만료되었습니다. 다시 로그인해주세요!');
                    window.location.href = '/login'; // 또는 useRouter() 써서 router.push('/login')
                    return;
                }

                const data = await response.json();

                // 데이터가 배열인지 확인
                if (!Array.isArray(data)) {
                    console.error('서버 응답이 배열이 아닙니다:', data);
                    return;
                }

                setLectures(data);
            } catch (error) {
                console.error('강의 목록을 가져오는 데 실패했습니다:', error);
            }
        };

        fetchLectures();
    }, []);

    const handleDetailClick = (lecture) => setSelectedLecture(lecture);

    const handleApply = async (lecture) => {
        if (lecture.applied) {
            await Swal.fire('신청 불가', '이미 신청하신 강의입니다!', 'warning');
            return;
        }

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            await Swal.fire('로그인 필요', '로그인 후 수강신청을 해주세요.', 'warning');
            return;
        }

        const result = await Swal.fire({
            title: '수강 신청하시겠습니까?',
            text: `강의명: ${lecture.lectNm}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '네, 신청할게요!',
            cancelButtonText: '아니오',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/lect/apply/${lecture.lectNo}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    await Swal.fire('신청 완료!', `"${lecture.lectNm}" 수강 신청이 완료되었습니다.`, 'success');
                    // 상태 업데이트: 해당 강의 applied = true로
                    setLectures(prev =>
                        prev.map(l => l.lectNo === lecture.lectNo ? { ...l, applied: true } : l)
                    );
                } else if (response.status === 409) {
                    const errorText = await response.text();
                    await Swal.fire('이미 신청한 강의입니다!', errorText, 'info');
                } else {
                    const errorText = await response.text();
                    await Swal.fire('오류 발생', errorText || '알 수 없는 오류입니다.', 'error');
                }
            } catch (error) {
                console.error('신청 요청 실패:', error);
                await Swal.fire('요청 실패', '서버와 연결할 수 없습니다.', 'error');
            }
        }
    };

    return (
        <div className="lecture-container">
            <Breadcrumb items={breadcrumbItems} />

            <div className="card">
                <h1 className="lecture-title">전체 강의 목록</h1>
                <table className="lecture-table">
                    <thead>
                    <tr>
                        <th>강의명</th>
                        <th>강사명</th>
                        <th>수업 시작일자</th>
                        <th>수강신청 마감</th>
                        <th>장소</th>
                        <th>상태</th>
                        <th>상세보기</th>
                        <th>신청</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lectures.map((lect) => (
                        <tr key={lect.lectNo}>
                            <td>{lect.lectNm}</td>
                            <td>
                                    <span className="inst-name" onClick={() => handleDetailClick(lect)}>
                                        {lect.instNm}
                                    </span>
                            </td>
                            <td>{formatDate(lect.lectStart)}</td>
                            <td>{formatDate(lect.lectSubmit)}</td>
                            <td>{lect.lectLoc}</td>
                            <td>{lect.lectStatus}</td>
                            <td>
                                <button onClick={() => handleDetailClick(lect)}>상세보기</button>
                            </td>
                            <td>
                                <button
                                    className={`apply-button ${lect.applied ? 'applied' : ''}`}
                                    onClick={() => handleApply(lect)}
                                    disabled={lect.applied}
                                >
                                    {lect.applied ? '신청 완료' : '수강 신청'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <h6 className="cansle">수강 취소는 <a href="/lect_applied" className="lecture-link">내 강의 정보</a> 에서 가능합니다.</h6>
            </div>

            {selectedLecture && (
                <div className="card lecture-detail-card">
                    <div className="card-header">
                        <h2 className="content">강의 상세 정보</h2>
                        <button className="close-detail-button" onClick={() => setSelectedLecture(null)}>X</button>
                    </div>
                    <table className="detail-table">
                        <tbody className="semi_tit">
                        <tr><th className="all_th">강의명</th><td>{selectedLecture.lectNm}</td></tr>
                        <tr><th className="all_th">강사명</th><td>{selectedLecture.instNm}</td></tr>
                        <tr><th className="all_th">강의 설명</th><td>{selectedLecture.lectDesc}</td></tr>
                        <tr><th className="all_th">일정</th><td>{selectedLecture.lectSchd}</td></tr>
                        <tr><th className="all_th">장소</th><td>{selectedLecture.lectLoc}</td></tr>
                        <tr><th className="all_th">인원</th><td>{selectedLecture.lectPers} / {selectedLecture.studtLimit}</td></tr>
                        <tr><th className="all_th">가격</th><td>{selectedLecture.lectPrice.toLocaleString()} 원</td></tr>
                        </tbody>
                    </table>
                    <h4 className="inst">강사명 클릭 시 강사 상세정보 확인 가능합니다.</h4>
                </div>
            )}
        </div>
    );
}
