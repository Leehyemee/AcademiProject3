'use client';

import Image from "next/image";
import styles from "../../page.module.css";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "투두 리스트", description: "있으면 좋긴 할듯", date: "Oct 9, 2016", completed: false },
    { id: 2, title: "사용여부", description: "Compellingly implement clicks-and-mortar relationships without highly efficient metrics.", date: "Oct 23, 2016", completed: false },
    { id: 3, title: "재고좀여", description: "Monotonectally formulate client-focused core competencies after parallel web-readiness.", date: "Oct 11, 2016", completed: false }
  ]);

  // 패널 상태 관리
  const [panels, setPanels] = useState({
    overview: { visible: true, collapsed: false },
    purchases: { visible: true, collapsed: false },
    multiCharts: { visible: true, collapsed: false },
    todo: { visible: true, collapsed: false },
    timeline: { visible: true, collapsed: false },
    tasks: { visible: true, collapsed: false },
    visits: { visible: true, collapsed: false },
    system: { visible: true, collapsed: false }
  });

  // 체크박스 토글
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // 패널 제거 핸들러
  const handleRemovePanel = (panelKey) => {
    setPanels(prev => ({
      ...prev,
      [panelKey]: { ...prev[panelKey], visible: false }
    }));
  };

  // 패널 접기/펼치기 핸들러
  const handleToggleCollapse = (panelKey) => {
    setPanels(prev => ({
      ...prev,
      [panelKey]: { ...prev[panelKey], collapsed: !prev[panelKey].collapsed }
    }));
  };

  return (
      <div className="main-content">
        <div className="container-fluid">
          {/* OVERVIEW */}


          <div className="row">
            <div className="col-md-6">
              {/* RECENT PURCHASES */}

            </div>
            <div className="col-md-6">
              {/* MULTI CHARTS */}

            </div>
          </div>

          <div className="row">
            <div className="col-md-7">
              {/* TODO LIST */}
              {panels.todo.visible && (
                  <div className="panel">
                    <div className="panel-heading">
                      <h3 className="panel-title">To-Do List</h3>
                      <div className="right">
                        <button type="button" className="btn-toggle-collapse" onClick={() => handleToggleCollapse('todo')}>
                          <i className={`lnr ${panels.todo.collapsed ? 'lnr-chevron-down' : 'lnr-chevron-up'}`}></i>
                        </button>
                        <button type="button" className="btn-remove" onClick={() => handleRemovePanel('todo')}>
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
