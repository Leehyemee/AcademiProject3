"use client"

import React from "react";
import Swal from "sweetalert2";

const MyBoard = () => {

    const SearchSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: '변경사항을 적용하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '변경 완료되었습니다!',
                    icon: 'success',
                    confirmButtonText: '확인'
                });
            }
        });
    };

    // sweetAlert
    const BoardModify = (e) => {
        e.preventDefault();

        Swal.fire({
            title: '변경사항을 적용하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '변경 완료되었습니다!',
                    icon: 'success',
                    confirmButtonText: '확인'
                });
            }
        });
    };

    // sweetAlert
    const BoardDelete = (e) => {
        e.preventDefault();

        Swal.fire({
            title: '변경사항을 적용하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '변경 완료되었습니다!',
                    icon: 'success',
                    confirmButtonText: '확인'
                });
            }
        });
    };

    // sweetAlert
    const DownloadSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: '변경사항을 적용하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '변경 완료되었습니다!',
                    icon: 'success',
                    confirmButtonText: '확인'
                });
            }
        });
    };


    return (
        <div className="main-content">
            <div className="container-fluid">
                <a href="/dashboard">메인 페이지 /</a>&ensp;<a href="#">나의 자료실 /</a>&ensp;<a href="#">나의 게시글</a>

                <form name="" id="" method="post" onSubmit={SearchSubmit}>
                    <div className="row">
                        <button type="submit" className="btn btn-success col-lg-offset-10 margin-bottom-30">
                            <i className="fa fa-refresh fa-spin"></i> 조회하기
                        </button>
                    </div>

                    <div id="toastr-demo" className="panel col">
                        <div className="panel-body row">
                            <div className="col-md-4">
                                <strong>강의 종류</strong>&emsp;&emsp;&emsp;
                                <select className="navbar">
                                    <option value="cheese">Cheese(진행중)</option>
                                    <option value="tomatoes">Tomatoes</option>
                                    <option value="mozarella">Mozzarella</option>
                                    <option value="mushrooms">Mushrooms</option>
                                    <option value="pepperoni">Pepperoni</option>
                                    <option value="onions">Onions</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <strong>게시일자</strong>&emsp;&emsp;&emsp;
                                <select className="navbar">
                                    <option value="cheese">내림차순</option>
                                    <option value="tomatoes">오름차순</option>
                                    <option value="mozarella">Mozzarella</option>
                                    <option value="mushrooms">Mushrooms</option>
                                    <option value="pepperoni">Pepperoni</option>
                                    <option value="onions">Onions</option>
                                </select>
                            </div>

                            <div className="col-md-3">
                                <strong><i className="lnr lnr-magnifier"></i> 검색</strong>
                                <input type="text" className="form-control" placeholder="게시글 제목 입력"/>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="row">
                    <div className="col-md-12">
                        <div className="col-lg-offset-10">
                            <button className="btn btn-primary" type="button" onClick={BoardModify}>
                                수정
                            </button>
                            &emsp;
                            <button className="btn btn-danger" type="button" onClick={BoardDelete}>
                                삭제
                            </button>
                        </div>
                        <div className="panel panel-scrolling">
                            <div className="panel-heading">
                                <h3 className="panel-title">게시판 리스트</h3>
                            </div>
                            <div className="panel-body">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th><input type="checkbox"/></th>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Username</th>
                                        <th>Username</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><input type="checkbox"/></td>
                                        <td>1</td>
                                        <td>Steve</td>
                                        <td>Jobs</td>
                                        <td>@steve</td>
                                        <td>@steve</td>
                                        <td>@steve</td>
                                        <td>@steve</td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox"/></td>
                                        <td>2</td>
                                        <td>Simon</td>
                                        <td>Philips</td>
                                        <td>@simon</td>
                                        <td>@steve</td>
                                        <td>@steve</td>
                                        <td>@steve</td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox"/></td>
                                        <td>3</td>
                                        <td>Jane</td>
                                        <td>Doe</td>
                                        <td>@jane</td>
                                        <td>@steve</td>
                                        <td>@steve</td>
                                        <td>@steve</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-10">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">게시판 정보</h3>
                            </div>
                            <div className="panel-body">
                                <div className="col-md-4">
                                    <p>게시판 번호</p>
                                    <input type="text" className="form-control" placeholder="text field"/>
                                    <br/>
                                </div>
                                <div className="col-md-4">
                                    <p>게시판 이름</p>
                                    <input type="password" className="form-control" value="asecret"/>
                                    <br/>
                                </div>
                                <div className="col-md-4">
                                    <p>게시글 번호</p>
                                    <input type="password" className="form-control" value="asecret"/>
                                    <br/>
                                </div>

                                <div className="col-md-3">
                                    <p>작성자</p>
                                    <input type="password" className="form-control" value="asecret"/>
                                    <br/>
                                </div>
                                <div className="col-md-3">
                                    <p>조회수</p>
                                    <input type="password" className="form-control" value="asecret"/>
                                    <br/>
                                </div>
                                <div className="col-md-3">
                                    <p>작성일자</p>
                                    <input type="password" className="form-control" value="asecret"/>
                                    <br/>
                                </div>
                                <div className="col-md-3">
                                    <p>비밀글 여부</p>
                                    <input type="password" className="form-control" value="asecret"/>
                                    <br/>
                                </div>

                                <p>제목</p>
                                <textarea className="form-control" placeholder="ㅂㅂㅂ" rows="1" defaultValue=""></textarea>
                                <br/>
                                <p>본문 글</p>
                                <textarea className="form-control" placeholder="ㅂㅂㅂ" rows="5" defaultValue=""></textarea>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <form name="" id="" method="post" onSubmit={DownloadSubmit}>
                        <div className="col-md-2">
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3 className="panel-title">첨부파일</h3>
                                </div>
                                <div className="panel-body">
                                    <p>첨부파일 1</p>
                                    <input type="text" className="form-control" placeholder="text field"/>
                                    <br/>
                                    <p>첨부파일 2</p>
                                    <input type="text" className="form-control" placeholder="text field"/>
                                    <br/>
                                    <p>첨부파일 3</p>
                                    <input type="text" className="form-control" placeholder="text field"/>
                                    <br/>
                                    <button className="btn btn-success form-control" type="submit">
                                        일괄 다운로드
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default MyBoard;
