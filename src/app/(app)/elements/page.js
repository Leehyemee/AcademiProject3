"use client"

const Elements = () => {
    return (
        <div className="main-content">
            <div className="container-fluid">
                <h3 className="page-title">Elements</h3>
                <div className="row">
                    <div className="col-md-6">

                        {/* BUTTONS */}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Buttons</h3>
                            </div>
                            <div className="panel-body">
                                <p className="demo-button">
                                    <button type="button" className="btn btn-default">Default</button>
                                    <button type="button" className="btn btn-primary">Primary</button>
                                    <button type="button" className="btn btn-info">Info</button>
                                    <button type="button" className="btn btn-success">Success</button>
                                    <button type="button" className="btn btn-warning">Warning</button>
                                    <button type="button" className="btn btn-danger">Danger</button>
                                </p>
                                <br/>
                                <p className="demo-button">
                                    <button type="button" className="btn btn-primary btn-lg">Large Size</button>
                                    <button type="button" className="btn btn-primary">Default Size</button>
                                    <button type="button" className="btn btn-primary btn-sm">Small Size</button>
                                    <button type="button" className="btn btn-primary btn-xs">Extra Small Size</button>
                                </p>
                                <br/>
                                <p className="demo-button">
                                    <button type="button" className="btn btn-default"><i
                                        className="fa fa-plus-square"></i> Default
                                    </button>
                                    <button type="button" className="btn btn-primary"><i
                                        className="fa fa-refresh"></i> Primary
                                    </button>
                                    <button type="button" className="btn btn-info"><i
                                        className="fa fa-info-circle"></i> Info
                                    </button>
                                    <button type="button" className="btn btn-primary" disabled="disabled"><i
                                        className="fa fa-refresh fa-spin"></i> Refreshing...
                                    </button>
                                </p>
                                <br/>
                                <p className="demo-button">
                                    <button type="button" className="btn btn-success"><i
                                        className="fa fa-check-circle"></i> Success
                                    </button>
                                    <button type="button" className="btn btn-warning"><i
                                        className="fa fa-warning"></i> Warning
                                    </button>
                                    <button type="button" className="btn btn-danger"><i
                                        className="fa fa-trash-o"></i> Danger
                                    </button>
                                    <button type="button" className="btn btn-primary" disabled="disabled"><i
                                        className="fa fa-spinner fa-spin"></i> Loading...
                                    </button>
                                </p>
                                <br/>
                                <div className="row">
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-primary btn-block">Button Block
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-warning btn-block">Button Block
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END BUTTONS */}

                        {/* INPUTS */}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Inputs</h3>
                            </div>
                            <div className="panel-body">
                                <input type="text" className="form-control" placeholder="text field"/>
                                <br/>
                                <input type="password" className="form-control" value="asecret"/>
                                <br/>
                                <textarea className="form-control" placeholder="textarea" rows="4"></textarea>
                                <br/>
                                <select className="form-control">
                                    <option value="cheese">Cheese</option>
                                    <option value="tomatoes">Tomatoes</option>
                                    <option value="mozarella">Mozzarella</option>
                                    <option value="mushrooms">Mushrooms</option>
                                    <option value="pepperoni">Pepperoni</option>
                                    <option value="onions">Onions</option>
                                </select>
                                <br/>
                                <label className="fancy-checkbox">
                                    <input type="checkbox"/>
                                    <span>Fancy Checkbox 1</span>
                                </label>
                                <label className="fancy-checkbox">
                                    <input type="checkbox"/>
                                    <span>Fancy Checkbox 2</span>
                                </label>
                                <label className="fancy-checkbox">
                                    <input type="checkbox"/>
                                    <span>Fancy Checkbox 3</span>
                                </label>
                                <br/>
                                <label className="fancy-radio">
                                    <input name="gender" value="male" type="radio"/>
                                    <span><i></i>Male</span>
                                </label>
                                <label className="fancy-radio">
                                    <input name="gender" value="female" type="radio"/>
                                    <span><i></i>Female</span>
                                </label>
                            </div>
                        </div>
                        {/* END INPUTS */}

                        {/* INPUT SIZING */}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Input Sizing</h3>
                            </div>
                            <div className="panel-body">
                                <input className="form-control input-lg" placeholder=".input-lg" type="text"/>
                                <br/>
                                <input className="form-control" placeholder="Default input" type="text"/>
                                <br/>
                                <input className="form-control input-sm" placeholder=".input-sm" type="text"/>
                                <br/>
                                <select className="form-control input-lg">
                                    <option value="cheese">Cheese</option>
                                    <option value="tomatoes">Tomatoes</option>
                                    <option value="mozarella">Mozzarella</option>
                                    <option value="mushrooms">Mushrooms</option>
                                    <option value="pepperoni">Pepperoni</option>
                                    <option value="onions">Onions</option>
                                </select>
                                <br/>
                                <select className="form-control">
                                    <option value="cheese">Cheese</option>
                                    <option value="tomatoes">Tomatoes</option>
                                    <option value="mozarella">Mozzarella</option>
                                    <option value="mushrooms">Mushrooms</option>
                                    <option value="pepperoni">Pepperoni</option>
                                    <option value="onions">Onions</option>
                                </select>
                                <br/>
                                <select className="form-control input-sm">
                                    <option value="cheese">Cheese</option>
                                    <option value="tomatoes">Tomatoes</option>
                                    <option value="mozarella">Mozzarella</option>
                                    <option value="mushrooms">Mushrooms</option>
                                    <option value="pepperoni">Pepperoni</option>
                                    <option value="onions">Onions</option>
                                </select>
                            </div>
                        </div>
                        {/* END INPUT SIZING */}

                    </div>
                    <div className="col-md-6">

                        {/* LABELS */}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Labels &amp; Badges</h3>
                            </div>
                            <div className="panel-body">
                                <span className="label label-default">DEFAULT</span>
                                <span className="label label-primary">PRIMARY</span>
                                <span className="label label-success">SUCCESS</span>
                                <span className="label label-info">INFO</span>
                                <span className="label label-warning">WARNING</span>
                                <span className="label label-danger">DANGER</span>
                                <br/>
                                <br/>
                                <a href="#">Inbox <span className="badge">42</span></a>
                                <br/>
                                <br/>
                                <button className="btn btn-primary" type="button">
                                    Messages <span className="badge">4</span>
                                </button>
                            </div>
                        </div>
                        {/* END LABELS */}

                        {/* PROGRESS BARS */}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Progress Bars</h3>
                            </div>
                            <div className="panel-body">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="60"
                                         aria-valuemin="0" aria-valuemax="100" style={{width: '60 %'}}>
                                        <span className="sr-only">60% Complete</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-warning" role="progressbar"
                                         aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '60 %'}}>
                                        <span className="sr-only">60% Complete (warning)</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-success" role="progressbar"
                                         aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '60 %'}}>
                                        <span className="sr-only">60% Complete (success)</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-danger" role="progressbar"
                                         aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '60 %'}}>
                                        <span className="sr-only">60% Complete (danger)</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="75"
                                         aria-valuemin="0" aria-valuemax="100" style={{width: '75 %'}}>
                                        75%
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-info progress-bar-striped"
                                         role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"
                                         style={{width: '20 %'}}>
                                        <span className="sr-only">20% Complete</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped active" role="progressbar"
                                         aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{width: '45 %'}}>
                                        <span className="sr-only">45% Complete</span>
                                    </div>
                                </div>
                                <div className="progress progress-xs">
                                    <div className="progress-bar progress-bar-success" role="progressbar"
                                         aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: '80 %'}}>
                                        <span className="sr-only">80% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END PROGRESS BARS */}

                        {/* INPUT GROUPS */}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Input Groups</h3>
                            </div>
                            <div className="panel-body">
                                <div className="input-group">
                                    <input className="form-control" type="text"/>
                                    <span className="input-group-btn"><button className="btn btn-primary"
                                                                              type="button">Go!</button></span>
                                </div>
                                <br/>
                                <div className="input-group">
										<span className="input-group-btn">
							<button className="btn btn-primary" type="button">Go!</button>
						</span>
                                    <input className="form-control" type="text"/>
                                </div>
                                <br/>
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                    <input className="form-control" placeholder="Username" type="text"/>
                                </div>
                                <br/>
                                <div className="input-group">
                                    <input className="form-control" placeholder="Username" type="text"/>
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                </div>
                                <br/>
                                <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input className="form-control" type="text"/>
                                    <span className="input-group-addon">.00</span>
                                </div>
                            </div>
                        </div>
                        {/* END INPUT GROUPS */}

                        {/* ALERT MESSAGES */}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Alert Messages</h3>
                            </div>
                            <div className="panel-body">
                                <div className="alert alert-info alert-dismissible" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span></button>
                                    <i className="fa fa-info-circle"></i> The system is running well
                                </div>
                                <div className="alert alert-success alert-dismissible" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span></button>
                                    <i className="fa fa-check-circle"></i> Your settings have been succesfully saved
                                </div>
                                <div className="alert alert-warning alert-dismissible" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span></button>
                                    <i className="fa fa-warning"></i> Warning, check your permission settings
                                </div>
                                <div className="alert alert-danger alert-dismissible" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span></button>
                                    <i className="fa fa-times-circle"></i> Your account has been suspended
                                </div>
                            </div>
                        </div>
                        {/* END ALERT MESSAGES */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Elements;
