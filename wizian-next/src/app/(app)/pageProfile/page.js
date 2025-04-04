"use client"

const PageProfile = () => {
    return (
        <div className="main-content">
            <div className="container-fluid">
                <div className="panel panel-profile">
                    <div className="clearfix">

                        {/* LEFT COLUMN */}
                        <div className="profile-left">

                            {/* PROFILE HEADER */}
                            <div className="profile-header">
                                <div className="overlay"></div>
                                <div className="profile-main">
                                    <img src="/assets/img/user-medium.png" className="img-circle" alt="Avatar"/>
                                    <h3 className="name">Samuel Gold</h3>
                                    <span className="online-status status-available">Available</span>
                                </div>
                                <div className="profile-stat">
                                    <div className="row">
                                        <div className="col-md-4 stat-item">
                                            45 <span>Projects</span>
                                        </div>
                                        <div className="col-md-4 stat-item">
                                            15 <span>Awards</span>
                                        </div>
                                        <div className="col-md-4 stat-item">
                                            2174 <span>Points</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* END PROFILE HEADER */}

                            {/* PROFILE DETAIL */}
                            <div className="profile-detail">
                                <div className="profile-info">
                                    <h4 className="heading">Basic Info</h4>
                                    <ul className="list-unstyled list-justify">
                                        <li>Birthdate <span>24 Aug, 2016</span></li>
                                        <li>Mobile <span>(124) 823409234</span></li>
                                        <li>Email <span>samuel@mydomain.com</span></li>
                                        <li>Website <span><a
                                            href="https://www.themeineed.com">www.themeineed.com</a></span></li>
                                    </ul>
                                </div>
                                <div className="profile-info">
                                    <h4 className="heading">Social</h4>
                                    <ul className="list-inline social-icons">
                                        <li><a href="#" className="facebook-bg"><i className="fa fa-facebook"></i></a>
                                        </li>
                                        <li><a href="#" className="twitter-bg"><i className="fa fa-twitter"></i></a>
                                        </li>
                                        <li><a href="#" className="google-plus-bg"><i className="fa fa-google-plus"></i></a>
                                        </li>
                                        <li><a href="#" className="github-bg"><i className="fa fa-github"></i></a></li>
                                    </ul>
                                </div>
                                <div className="profile-info">
                                    <h4 className="heading">About</h4>
                                    <p>Interactively fashion excellent information after distinctive outsourcing.</p>
                                </div>
                                <div className="text-center"><a href="#" className="btn btn-primary">Edit Profile</a>
                                </div>
                            </div>
                            {/* END PROFILE DETAIL */}

                        </div>
                        {/* END LEFT COLUMN */}

                        {/* RIGHT COLUMN */}
                        <div className="profile-right">
                            <h4 className="heading">Samuel's Awards</h4>

                            {/* AWARDS */}
                            <div className="awards">
                                <div className="row">
                                    <div className="col-md-3 col-sm-6">
                                        <div className="award-item">
                                            <div className="hexagon">
                                                <span className="lnr lnr-sun award-icon"></span>
                                            </div>
                                            <span>Most Bright Idea</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6">
                                        <div className="award-item">
                                            <div className="hexagon">
                                                <span className="lnr lnr-clock award-icon"></span>
                                            </div>
                                            <span>Most On-Time</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6">
                                        <div className="award-item">
                                            <div className="hexagon">
                                                <span className="lnr lnr-magic-wand award-icon"></span>
                                            </div>
                                            <span>Problem Solver</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6">
                                        <div className="award-item">
                                            <div className="hexagon">
                                                <span className="lnr lnr-heart award-icon"></span>
                                            </div>
                                            <span>Most Loved</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center"><a href="#" className="btn btn-default">See all awards</a>
                                </div>
                            </div>
                            {/* END AWARDS */}

                            {/* TABBED CONTENT */}
                            <div className="custom-tabs-line tabs-line-bottom left-aligned">
                                <ul className="nav" role="tablist">
                                    <li className="active"><a href="#tab-bottom-left1" role="tab" data-toggle="tab">Recent
                                        Activity</a></li>
                                    <li><a href="#tab-bottom-left2" role="tab" data-toggle="tab">Projects <span
                                        className="badge">7</span></a></li>
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade in active" id="tab-bottom-left1">
                                    <ul className="list-unstyled activity-timeline">
                                        <li>
                                            <i className="fa fa-comment activity-icon"></i>
                                            <p>Commented on post <a href="#">Prototyping</a> <span
                                                className="timestamp">2 minutes ago</span></p>
                                        </li>
                                        <li>
                                            <i className="fa fa-cloud-upload activity-icon"></i>
                                            <p>Uploaded new file <a href="#">Proposal.docx</a> to project <a href="#">New
                                                Year Campaign</a> <span className="timestamp">7 hours ago</span></p>
                                        </li>
                                        <li>
                                            <i className="fa fa-plus activity-icon"></i>
                                            <p>Added <a href="#">Martin</a> and <a href="#">3 others colleagues</a> to
                                                project repository <span className="timestamp">Yesterday</span></p>
                                        </li>
                                        <li>
                                            <i className="fa fa-check activity-icon"></i>
                                            <p>Finished 80% of all <a href="#">assigned tasks</a> <span
                                                className="timestamp">1 day ago</span></p>
                                        </li>
                                    </ul>
                                    <div className="margin-top-30 text-center"><a href="#" className="btn btn-default">See
                                        all activity</a></div>
                                </div>
                                <div className="tab-pane fade" id="tab-bottom-left2">
                                    <div className="table-responsive">
                                        <table className="table project-table">
                                            <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Progress</th>
                                                <th>Leader</th>
                                                <th>Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td><a href="#">Spot Media</a></td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                             aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                                             style={{width: '60%'}}>
                                                            <span>60% Complete</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src="/assets/img/user2.png" alt="Avatar" className="avatar img-circle"/>
                                                    <a href="#">Michael</a>
                                                </td>
                                                <td>
                                                    <span className="label label-success">ACTIVE</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><a href="#">E-Commerce Site</a></td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                             aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"
                                                             style={{width: '33 %'}}>
                                                            <span>33% Complete</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src="/assets/img/user1.png" alt="Avatar" className="avatar img-circle"/>
                                                    <a href="#">Antonius</a>
                                                </td>
                                                <td>
                                                    <span className="label label-warning">PENDING</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><a href="#">Project 123GO</a></td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                             aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"
                                                             style={{width: '68 %'}}>
                                                            <span>68% Complete</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src="/assets/img/user1.png" alt="Avatar" className="avatar img-circle"/>
                                                    <a href="#">Antonius</a>
                                                </td>
                                                <td>
                                                    <span className="label label-success">ACTIVE</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><a href="#">Wordpress Theme</a></td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                             aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                             style={{width: '75 %'}}>
                                                            <span>75%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src="/assets/img/user2.png" alt="Avatar" className="avatar img-circle"/>
                                                    <a href="#">Michael</a>
                                                </td>
                                                <td>
                                                    <span className="label label-success">ACTIVE</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><a href="#">Project 123GO</a></td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-success"
                                                             role="progressbar" aria-valuenow="100" aria-valuemin="0"
                                                             aria-valuemax="100" style={{width: '100 %'}}>
                                                            <span>100%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src="/assets/img/user1.png" alt="Avatar" className="avatar img-circle"/>
                                                    <a href="#">Antonius</a>
                                                </td>
                                                <td>
                                                    <span className="label label-default">CLOSED</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><a href="#">Redesign Landing Page</a></td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-success"
                                                             role="progressbar" aria-valuenow="100" aria-valuemin="0"
                                                             aria-valuemax="100" style={{width: '100 %'}}>
                                                            <span>100%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src="/assets/img/user5.png" alt="Avatar" className="avatar img-circle"/>
                                                    <a href="#">Jason</a>
                                                </td>
                                                <td>
                                                    <span className="label label-default">CLOSED</span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* END TABBED CONTENT */}

                        </div>
                        {/* END RIGHT COLUMN */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageProfile;
