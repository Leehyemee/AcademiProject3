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
          {panels.overview.visible && (
              <div className="panel panel-headline">
                <div className="panel-heading">
                  <h3 className="panel-title">Weekly Overview</h3>
                  <p className="panel-subtitle">Period: Oct 14, 2016 - Oct 21, 2016</p>
                  <div className="right">
                    <button type="button" className="btn-toggle-collapse" onClick={() => handleToggleCollapse('overview')}>
                      <i className={`lnr ${panels.overview.collapsed ? 'lnr-chevron-down' : 'lnr-chevron-up'}`}></i>
                    </button>
                    <button type="button" className="btn-remove" onClick={() => handleRemovePanel('overview')}>
                      <i className="lnr lnr-cross"></i>
                    </button>
                  </div>
                </div>
                <div className="panel-body" style={{ display: panels.overview.collapsed ? 'none' : 'block' }}>
                  {/* ... 기존 panel-body 내용 유지 ... */}
                  <div className="row">
                    <div className="col-md-3">
                      <div className="metric">
                        <span className="icon"><i className="fa fa-download"></i></span>
                        <p>
                          <span className="number">1,252</span>
                          <span className="title">Downloads</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="metric">
                        <span className="icon"><i className="fa fa-shopping-bag"></i></span>
                        <p>
                          <span className="number">203</span>
                          <span className="title">Sales</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="metric">
                        <span className="icon"><i className="fa fa-eye"></i></span>
                        <p>
                          <span className="number">274,678</span>
                          <span className="title">Visits</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="metric">
                        <span className="icon"><i className="fa fa-bar-chart"></i></span>
                        <p>
                          <span className="number">35%</span>
                          <span className="title">Conversions</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div id="headline-chart" className="ct-chart"></div>
                    </div>
                    <div className="col-md-3">
                      <div className="weekly-summary text-right">
                        <span className="number">2,315</span> <span className="percentage"><i className="fa fa-caret-up text-success"></i> 12%</span>
                        <span className="info-label">Total Sales</span>
                      </div>
                      <div className="weekly-summary text-right">
                        <span className="number">$5,758</span> <span className="percentage"><i className="fa fa-caret-up text-success"></i> 23%</span>
                        <span className="info-label">Monthly Income</span>
                      </div>
                      <div className="weekly-summary text-right">
                        <span className="number">$65,938</span> <span className="percentage"><i className="fa fa-caret-down text-danger"></i> 8%</span>
                        <span className="info-label">Total Income</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}

          <div className="row">
            <div className="col-md-6">
              {/* RECENT PURCHASES */}
              {panels.purchases.visible && (
                  <div className="panel">
                    <div className="panel-heading">
                      <h3 className="panel-title">Recent Purchases</h3>
                      <div className="right">
                        <button type="button" className="btn-toggle-collapse" onClick={() => handleToggleCollapse('purchases')}>
                          <i className={`lnr ${panels.purchases.collapsed ? 'lnr-chevron-down' : 'lnr-chevron-up'}`}></i>
                        </button>
                        <button type="button" className="btn-remove" onClick={() => handleRemovePanel('purchases')}>
                          <i className="lnr lnr-cross"></i>
                        </button>
                      </div>
                    </div>
                    <div className="panel-body no-padding" style={{ display: panels.purchases.collapsed ? 'none' : 'block' }}>
                      <table className="table table-striped">
                        <thead>
                        <tr>
                          <th>Order No.</th>
                          <th>Name</th>
                          <th>Amount</th>
                          <th>Date & Time</th>
                          <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td><a href="#">763648</a></td>
                          <td>Steve</td>
                          <td>$122</td>
                          <td>Oct 21, 2016</td>
                          <td><span className="label label-success">COMPLETED</span></td>
                        </tr>
                        <tr>
                          <td><a href="#">763649</a></td>
                          <td>Amber</td>
                          <td>$62</td>
                          <td>Oct 21, 2016</td>
                          <td><span className="label label-warning">PENDING</span></td>
                        </tr>
                        <tr>
                          <td><a href="#">763650</a></td>
                          <td>Michael</td>
                          <td>$34</td>
                          <td>Oct 18, 2016</td>
                          <td><span className="label label-danger">FAILED</span></td>
                        </tr>
                        <tr>
                          <td><a href="#">763651</a></td>
                          <td>Roger</td>
                          <td>$186</td>
                          <td>Oct 17, 2016</td>
                          <td><span className="label label-success">SUCCESS</span></td>
                        </tr>
                        <tr>
                          <td><a href="#">763652</a></td>
                          <td>Smith</td>
                          <td>$362</td>
                          <td>Oct 16, 2016</td>
                          <td><span className="label label-success">SUCCESS</span></td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="panel-footer" style={{ display: panels.purchases.collapsed ? 'none' : 'block' }}>
                      <div className="row">
                        <div className="col-md-6"><span className="panel-note"><i className="fa fa-clock-o"></i> Last 24 hours</span></div>
                        <div className="col-md-6 text-right"><a href="#" className="btn btn-primary">View All Purchases</a></div>
                      </div>
                    </div>
                  </div>
              )}
            </div>
            <div className="col-md-6">
              {/* MULTI CHARTS */}
              {panels.multiCharts.visible && (
                  <div className="panel">
                    <div className="panel-heading">
                      <h3 className="panel-title">Projection vs. Realization</h3>
                      <div className="right">
                        <button type="button" className="btn-toggle-collapse" onClick={() => handleToggleCollapse('multiCharts')}>
                          <i className={`lnr ${panels.multiCharts.collapsed ? 'lnr-chevron-down' : 'lnr-chevron-up'}`}></i>
                        </button>
                        <button type="button" className="btn-remove" onClick={() => handleRemovePanel('multiCharts')}>
                          <i className="lnr lnr-cross"></i>
                        </button>
                      </div>
                    </div>
                    <div className="panel-body" style={{ display: panels.multiCharts.collapsed ? 'none' : 'block' }}>
                      <div id="visits-trends-chart" className="ct-chart"></div>
                    </div>
                  </div>
              )}
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
            <div className="col-md-5">
              {/* TIMELINE */}
              {panels.timeline.visible && (
                  <div className="panel panel-scrolling">
                    <div className="panel-heading">
                      <h3 className="panel-title">Recent User Activity</h3>
                      <div className="right">
                        <button type="button" className="btn-toggle-collapse" onClick={() => handleToggleCollapse('timeline')}>
                          <i className={`lnr ${panels.timeline.collapsed ? 'lnr-chevron-down' : 'lnr-chevron-up'}`}></i>
                        </button>
                        <button type="button" className="btn-remove" onClick={() => handleRemovePanel('timeline')}>
                          <i className="lnr lnr-cross"></i>
                        </button>
                      </div>
                    </div>
                    <div className="panel-body" style={{ display: panels.timeline.collapsed ? 'none' : 'block' }}>
                      <ul className="list-unstyled activity-list">
                        <li>
                          <img src="/assets/img/user1.png" alt="Avatar" className="img-circle pull-left avatar" />
                          <p><a href="#">Michael</a> has achieved 80% of his completed tasks <span className="timestamp">20 minutes ago</span></p>
                        </li>
                        <li>
                          <img src="/assets/img/user2.png" alt="Avatar" className="img-circle pull-left avatar" />
                          <p><a href="#">Daniel</a> has been added as a team member to project <a href="#">System Update</a> <span className="timestamp">Yesterday</span></p>
                        </li>
                        <li>
                          <img src="/assets/img/user3.png" alt="Avatar" className="img-circle pull-left avatar" />
                          <p><a href="#">Martha</a> created a new heatmap view <a href="#">Landing Page</a> <span className="timestamp">2 days ago</span></p>
                        </li>
                        <li>
                          <img src="/assets/img/user4.png" alt="Avatar" className="img-circle pull-left avatar" />
                          <p><a href="#">Jane</a> has completed all of the tasks <span className="timestamp">2 days ago</span></p>
                        </li>
                        <li>
                          <img src="/assets/img/user5.png" alt="Avatar" className="img-circle pull-left avatar" />
                          <p><a href="#">Jason</a> started a discussion about <a href="#">Weekly Meeting</a> <span className="timestamp">3 days ago</span></p>
                        </li>
                      </ul>
                      <button type="button" className="btn btn-primary btn-bottom center-block">Load More</button>
                    </div>
                  </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              {/* TASKS */}
              {panels.tasks.visible && (
                  <div className="panel">
                    <div className="panel-heading">
                      <h3 className="panel-title">My Tasks</h3>
                      <div className="right">
                        <button type="button" className="btn-toggle-collapse" onClick={() => handleToggleCollapse('tasks')}>
                          <i className={`lnr ${panels.tasks.collapsed ? 'lnr-chevron-down' : 'lnr-chevron-up'}`}></i>
                        </button>
                        <button type="button" className="btn-remove" onClick={() => handleRemovePanel('tasks')}>
                          <i className="lnr lnr-cross"></i>
                        </button>
                      </div>
                    </div>
                    <div className="panel-body" style={{ display: panels.tasks.collapsed ? 'none' : 'block' }}>
                      <ul className="list-unstyled task-list">
                        <li>
                          <p>Updating Users Settings <span className="label-percent">23%</span></p>
                          <div className="progress progress-xs">
                            <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="23" aria-valuemin="0" aria-valuemax="100" style={{ width: '23%' }}>
                              <span className="sr-only">23% Complete</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <p>Load & Stress Test <span className="label-percent">80%</span></p>
                          <div className="progress progress-xs">
                            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: '80%' }}>
                              <span className="sr-only">80% Complete</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <p>Data Duplication Check <span className="label-percent">100%</span></p>
                          <div className="progress progress-xs">
                            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}>
                              <span className="sr-only">Success</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <p>Server Check <span className="label-percent">45%</span></p>
                          <div className="progress progress-xs">
                            <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{ width: '45%' }}>
                              <span className="sr-only">45% Complete</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <p>Mobile App Development <span className="label-percent">10%</span></p>
                          <div className="progress progress-xs">
                            <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style={{ width: '10%' }}>
                              <span className="sr-only">10% Complete</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
              )}
            </div>
            <div className="col-md-4">
              {/* VISIT CHART */}
              {panels.visits.visible && (
                  <div className="panel">
                    <div className="panel-heading">
                      <h3 className="panel-title">Website Visits</h3>
                      <div className="right">
                        <button type="button" className="btn-toggle-collapse" onClick={() => handleToggleCollapse('visits')}>
                          <i className={`lnr ${panels.visits.collapsed ? 'lnr-chevron-down' : 'lnr-chevron-up'}`}></i>
                        </button>
                        <button type="button" className="btn-remove" onClick={() => handleRemovePanel('visits')}>
                          <i className="lnr lnr-cross"></i>
                        </button>
                      </div>
                    </div>
                    <div className="panel-body" style={{ display: panels.visits.collapsed ? 'none' : 'block' }}>
                      <div id="visits-chart" className="ct-chart"></div>
                    </div>
                  </div>
              )}
            </div>
            <div className="col-md-4">
              {/* REALTIME CHART */}
              {panels.system.visible && (
                  <div className="panel">
                    <div className="panel-heading">
                      <h3 className="panel-title">System Load</h3>
                      <div className="right">
                        <button type="button" className="btn-toggle-collapse" onClick={() => handleToggleCollapse('system')}>
                          <i className={`lnr ${panels.system.collapsed ? 'lnr-chevron-down' : 'lnr-chevron-up'}`}></i>
                        </button>
                        <button type="button" className="btn-remove" onClick={() => handleRemovePanel('system')}>
                          <i className="lnr lnr-cross"></i>
                        </button>
                      </div>
                    </div>
                    <div className="panel-body" style={{ display: panels.system.collapsed ? 'none' : 'block' }}>
                      <div id="system-load" className="easy-pie-chart" data-percent="70">
                        <span className="percent">70</span>
                      </div>
                      <h4>CPU Load</h4>
                      <ul className="list-unstyled list-justify">
                        <li>High: <span>95%</span></li>
                        <li>Average: <span>87%</span></li>
                        <li>Low: <span>20%</span></li>
                        <li>Threads: <span>996</span></li>
                        <li>Processes: <span>259</span></li>
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
