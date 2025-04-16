'use client';
import React, { useState } from 'react';
import '../assignments.css';
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb"; // CSS 파일 임포트

// 과제 모달 컴포넌트
const breadcrumbItems = [
    { label: '대시보드', href: '/dashboard' },
    { label: '수강 관리' },
    { label: '과제 관리', href: '/assignment' },
];

const AssignmentModal = ({ assignment, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>📘 {assignment.title}</h3>
                <p><strong>과정명:</strong> {assignment.lectureName}</p>
                <p><strong>강사:</strong> {assignment.instructor}</p>
                <p><strong>질문:</strong></p>
                <p className="question-box">{assignment.question}</p>
                <textarea placeholder="여기에 답안을 입력하세요..." className="answer-box"></textarea>
                <div className="modal-buttons">
                    <button className="submit-btn">제출하기</button>
                    <button className="cancel-btn" onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

// 과제 목록 컴포넌트
const AssignmentListPanel = () => {
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const dummyAssignments = [
        {
            id: 1,
            lectureName: 'Java 기초반',
            title: '변수와 자료형 과제',
            instructor: '김개발',
            year: '2025',
            month: '04',
            assignDate: '2025-04-01',
            dueDate: '2025-04-15',
            status: '진행중',
            question: '변수 선언과 초기화를 설명하시오.',
        },
        {
            id: 2,
            lectureName: 'Spring 입문',
            title: '의존성 주입 과제',
            instructor: '이자바',
            year: '2025',
            month: '04',
            assignDate: '2025-04-05',
            dueDate: '2025-04-20',
            status: '대기중',
            question: 'DI 개념과 예제를 작성하시오.',
        },
    ];

    return (
        <div className="assignment-container">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="assignment-title">과제 목록</h2>
            <table className="assignment-table">
                <thead>
                <tr>
                    <th>과정명</th>
                    <th>과제명</th>
                    <th>강사</th>
                    <th>연도</th>
                    <th>월</th>
                    <th>등록일</th>
                    <th>마감일</th>
                    <th>상태</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {dummyAssignments.map((a) => (
                    <tr key={a.id}>
                        <td>{a.lectureName}</td>
                        <td>{a.title}</td>
                        <td>{a.instructor}</td>
                        <td>{a.year}</td>
                        <td>{a.month}</td>
                        <td>{a.assignDate}</td>
                        <td>{a.dueDate}</td>
                        <td>{a.status}</td>
                        <td>
                            <button className="assign-btn" onClick={() => setSelectedAssignment(a)}>
                                과제하기
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedAssignment && (
                <AssignmentModal
                    assignment={selectedAssignment}
                    onClose={() => setSelectedAssignment(null)}
                />
            )}
        </div>
    );
};

// 페이지 컴포넌트
const AssignmentPage = () => {
    return (
        <main>
            <AssignmentListPanel />
        </main>
    );
};

export default AssignmentPage;