"use client"

const Charts = () => {
    return (
        <div className="main-content">
            <div className="container-fluid">
                <h3 className="page-title">Charts</h3>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Line Chart</h3>
                            </div>
                            <div className="panel-body">
                                <div id="demo-line-chart" className="ct-chart"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Bar Chart</h3>
                            </div>
                            <div className="panel-body">
                                <div id="demo-bar-chart" className="ct-chart"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Area Chart</h3>
                            </div>
                            <div className="panel-body">
                                <div id="demo-area-chart" className="ct-chart"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Multiple Chart</h3>
                            </div>
                            <div className="panel-body">
                                <div id="multiple-chart" className="ct-chart"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Charts;
