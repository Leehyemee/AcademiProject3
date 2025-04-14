'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [stdntInfo, setStdntInfo] = useState(null);
  const [isTokenReady, setIsTokenReady] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 1, title: "투두 리스트", description: "있으면 좋긴 할듯", date: "Oct 9, 2016", completed: false },
    { id: 2, title: "사용여부", description: "Compellingly implement metrics.", date: "Oct 23, 2016", completed: false },
    { id: 3, title: "재고좀여", description: "Formulate core competencies.", date: "Oct 11, 2016", completed: false }
  ]);

  const [panels, setPanels] = useState({
    todo: { visible: true, collapsed: false },
  });

  // 토큰 저장 및 준비 상태 설정
  // 사용자 정보 가져오기
  useEffect(() => {

    const token = localStorage.getItem("accessToken")

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

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleRemovePanel = (key) => {
    setPanels(prev => ({ ...prev, [key]: { ...prev[key], visible: false } }));
  };

  const handleToggleCollapse = (key) => {
    setPanels(prev => ({ ...prev, [key]: { ...prev[key], collapsed: !prev[key].collapsed } }));
  };

  return (
      <div className="main-content">
        <div className="container-fluid">
          <h2>안녕하세요, {stdntInfo?.stdntNm || "회원"}님!</h2>

          <div className="row">
            <div className="col-md-7">
              {panels.todo.visible && (
                  <div className="panel">
                    <div className="panel-heading">
                      <h3 className="panel-title">To-Do List</h3>
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
                        {tasks.map((task) => (
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
                                <a href="#"><i className="icon-software icon-software-pencil"></i></a>
                                <a href="#"><i className="icon-arrows icon-arrows-circle-remove"></i></a>
                              </div>
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
