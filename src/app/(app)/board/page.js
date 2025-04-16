"use client"; // 클라이언트 사이드에서만 실행되도록 지정

import React, { useState } from 'react';
import '../board.css';
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";

const breadcrumbItems = [
    { label: '대시보드', href: '/dashboard' },
    { label: '게시판 관리' },
    { label: '전체 게시판', href: '/board' },
];

const BoardPage = () => {
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comment, setComment] = useState('');

    // 게시판 목록
    const boards = ['공지사항', '강의 게시판', '자유 게시판'];

    // 게시판별 게시글 목록
    const postsData = {
        '공지사항': [
            { title: '[공지] 시스템 점검 안내', content: '안녕하세요, 사용자 여러분.\n' +
                    '\n' +
                    '오는 4월 20일(월) 오전 2시부터 4시까지 시스템 점검이 예정되어 있습니다. \n' +
                    '이 시간 동안 서비스 이용에 불편이 없도록 미리 안내드립니다. \n' +
                    '\n' +
                    '점검 중에는 모든 서비스가 일시적으로 중단될 수 있으니, 해당 시간에 이용을 계획하신 분들은 참고하시기 바랍니다. \n' +
                    '불편을 드려 죄송하며, 양해 부탁드립니다.\n' +
                    '\n' +
                    '감사합니다.',
                comments: [
                    { id: 1, writer: 'student1234', content: '알겠습니다.' },
                    { id: 2, writer: 'student3333', content: '참고하겠습니다. 감사합니다.' },
                ]
            },
            { title: '[공지] 서비스 점검 완료', content: '서비스 점검이 완료되었습니다. 서비스 이용에 불편이 없으시길 바랍니다.',
                comments: [
                    { id: 1, writer: 'student1354', content: '알겠습니다.' },
                    { id: 2, writer: 'stud515', content: '참고하겠습니다. 감사합니다.' },
                ]
            }

        ],
        '강의 게시판': [
            { title: 'Spring Boot 기초 강의', content: '안녕하세요, Spring Boot 기초 강의에 대한 안내입니다.\n' +
                    '\n' +
                    '강의명: Spring Boot 입문\n' +
                    '강의 일정: 매주 월요일 오전 10시 ~ 12시\n' +
                    '강의 장소: 온라인(Zoom 링크 제공)\n' +
                    '\n' +
                    '강의 신청은 해당 게시글의 댓글을 통해 가능합니다. \n' +
                    '많은 참여 부탁드립니다.\n' +
                    '\n' +
                    '강의 내용:\n' +
                    '- Spring Boot 환경설정\n' +
                    '- REST API 구현\n' +
                    '- 데이터베이스 연동\n' +
                    '- 프로젝트 실습\n' +
                    '\n' +
                    '기타 문의 사항은 댓글로 남겨주세요.' },
            { title: 'React 강의 안내',
                content: '안녕하세요! 여러분!\n\nReact 기본 강의를 시작합니다. ' +
                    '웹 애플리케이션의 프론트엔드를 개발하는 데 중요한 기술인 React를 배우고 싶다면 이번 강의를 꼭 신청해주세요!\n\n' +
                    '### 강의 일정:\n- **강의명**: React 기초 & 실전 프로젝트\n' +
                    '- **일정**: 매주 화요일 오후 7시 ~ 9시\n' +
                    '- **장소**: 온라인(Zoom 링크 제공)\n' +
                    '- **강의 기간**: 6주 (2025년 5월 1일부터 시작)\n\n### ' +
                    '강의 내용:\n- **1주차**: React 소개 및 환경 설정\n' +
                    '- **2주차**: 컴포넌트와 props, state\n' +
                    '- **3주차**: 이벤트 처리 및 상태 관리\n' +
                    '- **4주차**: Hooks (useState, useEffect 등)\n' +
                    '- **5주차**: Context API와 상태 관리 패턴\n' +
                    '- **6주차**: 프로젝트 실습 및 마무리\n\n' +
                    '### 신청 방법:\n강의에 참여하고 싶으신 분은 이 게시글의 댓글로 신청 의사를 남겨주세요. ' +
                    '선착순으로 인원 모집이 진행되며, 일정 변경이 있을 경우 추가 안내드리겠습니다.\n\n많은 참여 부탁드립니다! 🙏'
            ,
                comments: [
                    { id: 1, writer: 'student1354', content: '꼭 참석하겠습니다~!' },
                    { id: 2, writer: 'stud515', content: '강의 마친 후 질문나는 시간이 있을까요?' },
                ]

            }
        ],
        '자유 게시판': [
            { title: '개발 관련 도서 추천 부탁드립니다!', content: '안녕하세요!\n' +
                    '\n' +
                    '요즘 개발 관련 도서를 많이 읽고 있는데, 좋은 책을 찾고 있습니다.\n' +
                    '여러분이 추천하는 책이 있다면 댓글로 남겨주시면 감사하겠습니다.\n' +
                    '\n' +
                    '저는 주로 백엔드 개발에 관한 책을 찾고 있으며, 특히 Spring Boot나 데이터베이스 관련 책을 추천받고 싶습니다.\n' +
                    '\n' +
                    '자유롭게 추천해주세요~!' },
            { title: '프로그래밍 팁 공유', content: '프로그래밍은 매우 다양한 영역을 다루고 있기 때문에, 새로운 기술이나 팁을 배우는 것이 중요합니다. ' +
                    '하지만 혼자서 모든 정보를 습득하기에는 시간이 너무 많이 걸릴 수 있습니다. 그' +
                    '럼에도 불구하고 우리가 일상적으로 겪는 문제들은 대부분 다른 사람들도 겪고 있기 때문에, ' +
                    '경험을 공유하고 서로의 지식을 나누는 것은 매우 유용한 방법입니다.' ,
                comments: [
                    { id: 1, writer: 'dfgfrg153', content: '코딩 자율학습 스프링 부트3 자바 백엔드 개발 입분 추천드려요!!' },
                    { id: 2, writer: 'gggeea56', content: '저는 클라우드 네이티브 스프링 액션 추천할게요~~' },
                ]

            }
        ]
    };

    // 댓글 작성
    const handleCommentSubmit = () => {
        if (comment && selectedPost) {
            const updatedPost = {
                ...selectedPost,
                comments: [...selectedPost.comments, { writer: 'student6548', content: comment }],
            };
            setSelectedPost(updatedPost);  // 게시글의 댓글 업데이트
            setComment('');  // 입력 초기화
        }
    };

    return (
        <div className="total">
            <div>
                <Breadcrumb items={breadcrumbItems} />
                <h2 className="etc">게시판 목록</h2>
                <div>
                    {boards.map((board, index) => (
                        <button
                            key={index}
                            className="board-button"
                            onClick={() => setSelectedBoard(board)}
                        >
                            {board}
                        </button>
                    ))}
                </div>
            </div>

            {selectedBoard && (
                <div>
                    <h3 className="etc">{selectedBoard} 게시글 목록</h3>
                    <ul className="board-list">
                        {postsData[selectedBoard] && postsData[selectedBoard].length > 0 ? (
                            postsData[selectedBoard].map((post, index) => (
                                <li
                                    key={index}
                                    className="board-list-item"
                                    onClick={() => setSelectedPost(post)}
                                >
                                    {post.title}
                                </li>
                            ))
                        ) : (
                            <li>게시글이 없습니다.</li>
                        )}
                    </ul>
                </div>
            )}

            {selectedPost && (
                <div>
                    <h4 className="etc">내용</h4>
                    <div>{selectedPost.content}</div>

                    <div>
                        <h4 className="etc">댓글</h4>
                        <ul className="comment-list">
                            {selectedPost.comments?.map((comment, index) => (
                                <li key={index} className="comment-list-item">
                                    {comment.writer}: {comment.content}
                                </li>
                            ))}
                        </ul>
                        <textarea
                            className="board-content-textarea"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="댓글을 입력하세요..."
                        ></textarea>
                        <button
                            className="board-content-button"
                            onClick={handleCommentSubmit}
                        >
                            댓글 작성
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoardPage;
