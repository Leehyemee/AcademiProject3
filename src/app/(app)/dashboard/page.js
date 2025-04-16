'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';  // SweetAlert2 import
import Calendar from 'react-calendar';  // react-calendar import
import 'react-calendar/dist/Calendar.css';  // react-calendar 스타일 import

export default function Home() {
  const router = useRouter();

  const [stdntInfo, setStdntInfo] = useState(null);
  const [isTokenReady, setIsTokenReady] = useState(false);
  const [isClient, setIsClient] = useState(false); // 클라이언트인지 확인하는 상태 추가

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 실행되도록 설정
  }, []);

  // 로컬 스토리지에서 할 일 목록 불러오기 (초기값 설정)
  const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];  // 로컬 스토리지에 없으면 빈 배열 반환
  };

  // state 초기값은 빈 배열로
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());  // 선택된 날짜 상태 추가

  const [panels, setPanels] = useState({
    todo: { visible: true, collapsed: false },
    memo: { visible: true, collapsed: false }, // 메모 패널 상태
    drawing: { visible: true, collapsed: false } // 그림판 패널 상태
  });

  // 메모장 텍스트 상태
  const [memoText, setMemoText] = useState("");
  // 그림판에 그린 이미지 상태
  const [drawnImage, setDrawnImage] = useState(null);

  // 토큰 저장 및 준비 상태 설정
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsTokenReady(true);
    } else {
      router.replace("/pageLogin");
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/stdnt/myinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setStdntInfo(data);
        } else {
          router.replace("/pageLogin");
        }
      } catch (error) {
        console.error("사용자 정보 불러오기 실패:", error);
        router.replace("/pageLogin");
      }
    };

    fetchUser();
  }, [isTokenReady]);

  // 할 일 목록 로딩 (useEffect에서)
  useEffect(() => {
    const savedTasks = loadTasksFromLocalStorage();
    setTasks(savedTasks);
  }, []);

  // 할 일 완료 처리
  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));  // 변경된 할 일 목록을 로컬 스토리지에 저장
  };

  // 할 일 삭제
  const deleteTask = (id) => {
    const confirmed = window.confirm("정말 이 할 일을 삭제하시겠습니까?");
    if (confirmed) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));  // 삭제 후 로컬 스토리지에 저장
    }
  };

  // 패널 숨기기/보이기
  const handleRemovePanel = (key) => {
    setPanels(prev => ({ ...prev, [key]: { ...prev[key], visible: false } }));
  };

  const handleToggleCollapse = (key) => {
    setPanels(prev => ({ ...prev, [key]: { ...prev[key], collapsed: !prev[key].collapsed } }));
  };

  // 새로운 할 일 추가
  const handleAddTaskWithSwal = () => {
    Swal.fire({
      title: "새로운 할 일 추가",
      html: ` 
        <input id="task-title" class="swal2-input" placeholder="할 일 제목을 입력해주세요" />
        <input id="task-description" class="swal2-input" placeholder="할 일 설명 (선택)" />
      `,
      focusConfirm: false,
      showCancelButton: true,  // 취소 버튼 활성화
      cancelButtonText: '취소',  // 취소 버튼 텍스트 설정
      confirmButtonText: '추가',  // 확인 버튼 텍스트 설정
      preConfirm: () => {
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;

        if (!title) {
          Swal.showValidationMessage('할 일 제목을 입력해주세요!');
          return false;
        }

        // 할 일 추가
        const newTask = {
          id: tasks.length + 1,  // 새로운 아이디는 기존 tasks의 길이 + 1
          title,
          description: description || " ",  // 설명이 없으면 기본값
          date: selectedDate.toLocaleDateString(),  // 선택된 날짜 추가
          completed: false,
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));  // 추가 후 로컬 스토리지에 저장
      },
      allowOutsideClick: false,
    });
  };

  // 날짜 선택 시 해당 날짜에 할 일만 필터링
  const filterTasksByDate = (date) => {
    const filteredTasks = tasks.filter(task => task.date === date.toLocaleDateString());
    return filteredTasks;
  };

  // 메모장 내용 변경
  const handleMemoChange = (e) => {
    setMemoText(e.target.value);
  };

  // 그림판 그리기 (마우스로 그리기)
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const canvas = e.target;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = e.target;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  if (!isClient) {
    return null; // 클라이언트에서만 렌더링
  }

  return (
      <div className="main-content">
        <div className="container-fluid">
          <h2>안녕하세요, {stdntInfo?.stdntNm || "회원"}님!</h2>

          {/* 첫 번째 줄: 캘린더 + 할 일 목록 */}
          <div className="row">
            <div className="col-md-6">
              <div className="panel">
                <div className="panel-heading">
                  <h3 className="panel-title">Calendar</h3>
                </div>
                <div className="panel-body">
                  <Calendar
                      onChange={setSelectedDate}
                      value={selectedDate}
                  />
                  <p>선택한 날짜: {selectedDate.toLocaleDateString('ko-KR')}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              {/* 할 일 목록 패널 */}
              {panels.todo.visible && (
                  <div className="panel">
                    <div className="panel-heading">
                      <h3 className="panel-title">To-Do List</h3>
                      <button className="btn btn-link btn-sm ml-2" onClick={handleAddTaskWithSwal}>
                        <i className="lnr lnr-plus-circle"></i>
                      </button>
                      <div className="right">
                        <button type="button" onClick={() => handleToggleCollapse('todo')}>
                          <i className={`lnr ${panels.todo.collapsed ? 'lnr-chevron-down' : 'lnr-chevron-up'}`}></i>
                        </button>
                        <button type="button" onClick={() => handleRemovePanel('todo')}>
                          <i className="lnr lnr-cross"></i>
                        </button>
                      </div>
                    </div>
                    <div className="panel-body" style={{ display: panels.todo.collapsed ? 'none' : 'block' }}>
                      <ul className="list-unstyled todo-list">
                        {filterTasksByDate(selectedDate).map((task) => (
                            <li key={task.id} className={task.completed ? "completed" : ""}>
                              <label className="control-inline fancy-checkbox">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />
                                <span></span>
                              </label>
                              <p>
                                <span className="title">{task.title}</span>
                                <span className="short-description">{task.description}</span>
                                <span className="date">{task.date}</span>
                              </p>
                              <div className="controls">
                                <button onClick={() => deleteTask(task.id)}>
                                  <i className="icon-arrows icon-arrows-circle-remove"></i> 삭제
                                </button>
                              </div>
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              )}
            </div>
          </div>

          {/* 두 번째 줄: 그림판 + 메모장 */}
          <div className="row">
            <div className="col-md-6">
              {/* 그림판 패널 */}
              {panels.drawing.visible && (
                  <div className="panel">
                    <div className="panel-heading">
                      <h3 className="panel-title">그림판</h3>
                      <div className="right">
                        <button type="button" onClick={() => handleToggleCollapse('drawing')}>
                          <i className={`lnr ${panels.drawing.collapsed ? 'lnr-chevron-down' : 'lnr-chevron-up'}`}></i>
                        </button>
                        <button type="button" onClick={() => handleRemovePanel('drawing')}>
                          <i className="lnr lnr-cross"></i>
                        </button>
                      </div>
                    </div>
                    <div className="panel-body" style={{ display: panels.drawing.collapsed ? 'none' : 'block' }}>
                      <canvas
                          id="drawingCanvas"
                          width="300"
                          height="300"
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          style={{ border: '1px solid #000' }}
                      ></canvas>
                    </div>
                  </div>
              )}
            </div>

            <div className="col-md-6">
              {/* 메모장 패널 */}
              {panels.memo.visible && (
                  <div className="panel">
                    <div className="panel-heading">
                      <h3 className="panel-title">메모장</h3>
                      <div className="right">
                        <button type="button" onClick={() => handleToggleCollapse('memo')}>
                          <i className={`lnr ${panels.memo.collapsed ? 'lnr-chevron-down' : 'lnr-chevron-up'}`}></i>
                        </button>
                        <button type="button" onClick={() => handleRemovePanel('memo')}>
                          <i className="lnr lnr-cross"></i>
                        </button>
                      </div>
                    </div>
                    <div className="panel-body" style={{ display: panels.memo.collapsed ? 'none' : 'block' }}>
                  <textarea
                      className="form-control"
                      rows="6"
                      value={memoText}
                      onChange={handleMemoChange}
                      placeholder="메모를 작성해주세요."
                  ></textarea>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
