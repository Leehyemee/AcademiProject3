"use client"

const Panels = () => {
    return (
        <div className="main-content">
            <div className="container-fluid">
                <h3 className="page-title">Panels</h3>
                <div className="row">
                    <div className="col-md-8">

                        {/* PANEL HEADLINE */}
                        <div className="panel panel-headline">
                            <div className="panel-heading">
                                <h3 className="panel-title">Panel Headline</h3>
                                <p className="panel-subtitle">Panel to display most important information</p>
                            </div>
                            <div className="panel-body">
                                <h4>Panel Content</h4>
                                <p>Objectively network visionary methodologies via best-of-breed users.
                                    Phosfluorescently initiate go forward leadership skills before an expanded array of
                                    infomediaries. Monotonectally incubate web-enabled communities rather than
                                    process-centric.</p>
                            </div>
                        </div>
                        {/* END PANEL HEADLINE */}

                    </div>
                    <div className="col-md-4">

                        {/* PANEL NO PADDING */}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Panel No Padding</h3>
                                <div className="right">
                                    <button type="button" className="btn-toggle-collapse"><i
                                        className="lnr lnr-chevron-up"></i></button>
                                    <button type="button" className="btn-remove"><i className="lnr lnr-cross"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="panel-body no-padding bg-primary text-center">
                                <div className="padding-top-30 padding-bottom-30">
                                    <i className="fa fa-thumbs-o-up fa-5x"></i>
                                    <h3>No Content Padding</h3>
                                </div>
                            </div>
                        </div>
                        {/* END PANEL NO PADDING */}

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">

                        {/* PANEL DEFAULT */}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Panel Default</h3>
                                <div className="right">
                                    <button type="button" className="btn-toggle-collapse"><i
                                        className="lnr lnr-chevron-up"></i></button>
                                    <button type="button" className="btn-remove"><i className="lnr lnr-cross"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="panel-body">
                                <p>Objectively network visionary methodologies via best-of-breed users.
                                    Phosfluorescently initiate go forward leadership skills before an expanded array of
                                    infomediaries. Monotonectally incubate web-enabled communities rather than
                                    process-centric.</p>
                            </div>
                        </div>
                        {/* END PANEL DEFAULT */}
                    </div>
                    <div className="col-md-4">

                        {/* PANEL NO CONTROLS */}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Panel No Right Controls</h3>
                            </div>
                            <div className="panel-body">
                                <p>Objectively network visionary methodologies via best-of-breed users.
                                    Phosfluorescently initiate go forward leadership skills before an expanded array of
                                    infomediaries. Monotonectally incubate web-enabled communities rather than
                                    process-centric.</p>
                            </div>
                        </div>
                        {/* END PANEL NO CONTROLS */}

                    </div>
                    <div className="col-md-4">

                        {/* PANEL WITH FOOTER */}
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Panel With Footer</h3>
                                <div className="right">
                                    <button type="button" className="btn-toggle-collapse"><i
                                        className="lnr lnr-chevron-up"></i></button>
                                    <button type="button" className="btn-remove"><i className="lnr lnr-cross"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="panel-body">
                                <p>Objectively network visionary methodologies via best-of-breed users.
                                    Phosfluorescently initiate go forward leadership skills before an expanded
                                    array.</p>
                            </div>
                            <div className="panel-footer">
                                <h5>Panel Footer</h5>
                            </div>
                        </div>
                        {/* END PANEL WITH FOOTER */}

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">

                        {/* PANEL SCROLLING */}
                        <div id="panel-scrolling-demo" className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Panel Scrolling</h3>
                            </div>
                            <div className="panel-body">
                                <p>Objectively network visionary methodologies via best-of-breed users.
                                    Phosfluorescently initiate go forward leadership skills before an expanded array of
                                    infomediaries. Monotonectally incubate web-enabled communities rather than
                                    process-centric.</p>
                                <p>Objectively network visionary methodologies via best-of-breed users.
                                    Phosfluorescently initiate go forward leadership skills before an expanded array of
                                    infomediaries. Monotonectally incubate web-enabled communities rather than
                                    process-centric.</p>
                                <p>Objectively network visionary methodologies via best-of-breed users.
                                    Phosfluorescently initiate go forward leadership skills before an expanded array of
                                    infomediaries. Monotonectally incubate web-enabled communities rather than
                                    process-centric.</p>
                            </div>
                        </div>
                        {/* END PANEL SCROLLING */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Panels;
