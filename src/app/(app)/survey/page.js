'use client';
import React, { useState } from 'react';
import '../survey.css';
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb"; // CSS 파일 임포트

// 설문 목록 컴포넌트
const breadcrumbItems = [
    { label: '대시보드', href: '/dashboard' },
    { label: '수강 관리' },
    { label: '설문 관리', href: '/survey' },
];

const SurveyListPanel = () => {
    const [selectedSurvey, setSelectedSurvey] = useState(null);

    const dummySurveys = [
        {
            id: 1,
            surveyTitle: '프로그래밍 학원 만족도 조사',
            surveyYear: '2025',
            surveyType: '만족도',
            surveyDate: '2025-04-10',
            questions: [
                '강의의 난이도는 적당했나요?',
                '강사의 설명은 이해하기 쉬웠나요?',
                '학원 시설은 만족스러웠나요?'
            ]
        },
        {
            id: 2,
            surveyTitle: 'Java 과정 설문',
            surveyYear: '2025',
            surveyType: '과정별',
            surveyDate: '2025-04-12',
            questions: [
                'Java의 기본 문법은 잘 배웠나요?',
                '프로젝트 진행이 도움이 되었나요?',
                '기타 개선점이 있다면 무엇인가요?'
            ]
        },
    ];

    const handleSurveyClick = (survey) => {
        setSelectedSurvey(survey);
    };

    const handleSubmitSurvey = () => {
        alert('설문이 제출되었습니다!');
        setSelectedSurvey(null);
    };

    return (
        <div className="survey-container">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="survey-title">설문 목록</h2>
            <table className="survey-table">
                <thead>
                <tr>
                    <th>설문명</th>
                    <th>설문유형</th>
                    <th>연도</th>
                    <th>등록일</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {dummySurveys.map((s) => (
                    <tr key={s.id}>
                        <td>{s.surveyTitle}</td>
                        <td>{s.surveyType}</td>
                        <td>{s.surveyYear}</td>
                        <td>{s.surveyDate}</td>
                        <td>
                            <button className="survey-btn" onClick={() => handleSurveyClick(s)}>
                                설문 응답
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedSurvey && (
                <div className="survey-response-section">
                    <h3>📋 {selectedSurvey.surveyTitle}</h3>
                    <p><strong>설문 유형:</strong> {selectedSurvey.surveyType}</p>
                    <p><strong>설문 연도:</strong> {selectedSurvey.surveyYear}</p>
                    <p><strong>등록일:</strong> {selectedSurvey.surveyDate}</p>

                    <div className="questions-section">
                        {selectedSurvey.questions.map((q, idx) => (
                            <div key={idx} className="question-box">
                                <p><strong>질문 {idx + 1}:</strong> {q}</p>
                                <input type="text" placeholder="응답을 입력하세요..." className="answer-box" />
                            </div>
                        ))}
                    </div>

                    <button className="submit-btn" onClick={handleSubmitSurvey}>
                        응답하기
                    </button>
                </div>
            )}
        </div>
    );
};

// 페이지 컴포넌트
const SurveyPage = () => {
    return (
        <main>
            <SurveyListPanel />
        </main>
    );
};

export default SurveyPage;
