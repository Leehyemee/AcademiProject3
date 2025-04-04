"use client"

const PageLockscreen = () => {
    return (
        <div className="vertical-align-wrap">
            <div className="vertical-align-middle">
                <div className="auth-box lockscreen clearfix">
                    <div className="content">
                        <h1 className="sr-only">Klorofil - Free Bootstrap dashboard</h1>
                        <div className="logo text-center"><img src="/assets/img/logo-dark.png" alt="Klorofil Logo"/>
                        </div>
                        <div className="user text-center">
                            <img src="/assets/img/user-medium.png" className="img-circle" alt="Avatar"/>
                            <h2 className="name">Samuel Gold</h2>
                        </div>
                        <form action="/public">
                            <div className="input-group">
                                <input type="password" className="form-control" placeholder="Enter your password ..."/>
                                <span className="input-group-btn"><button type="submit" className="btn btn-primary"><i
                                    className="fa fa-arrow-right"></i></button></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageLockscreen;
