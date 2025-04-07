"use client";
import {useRef, useState} from "react";

//회원가입 처리
const processJoinok = async (formValues) => {
    fetch('http://localhost:8080/api/auth/join', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(formValues)
    }).then(async response => {
        if (response.ok) {
            alert('회원가입 완료!!');
            location.href="/login";
        }else if(response.status === 400){
            alert(await response.text());
        }else{
            alert('회원가입 실패!')
        }
    }) .catch(error => {
        console.error('join error', error);
        alert('서버 오류! 관리자 문의')
    });
};

const formatPhoneNumber = (value) => {
    const onlyNums = value.replace(/[^\d]/g, ''); // 숫자만 남기기

    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
};

const handleChange = (e) => {
    const { name, value } = e.target;

    // 전화번호만 포맷 적용
    if (name === 'phone') {
        const formatted = formatPhoneNumber(value);
        setForm(prev => ({ ...prev, [name]: formatted }));
    } else {
        setForm(prev => ({ ...prev, [name]: value }));
    }
};

const initialFormState = {
    stdnt_id: "",
    pwd: "",
    repwd: "",
    stdnt_email: "",
    stdnt_nm: "",
    gen_cd: "",
    phone: "",
    zip_cd: "",
    addr: "",
    addr_dtl: ""
};

const Join = () => {
    const formJoinRef = useRef(null);
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const[sitekey, setSitekey] = useState(null);

    // 폼 재설정
    const handleReset = () => {
        setForm(initialFormState);
        setErrors({});
    };

    const handleJoinSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(formJoinRef.current);
        const formValues = Object.fromEntries(formData.entries());
        console.log(">> join ", formValues["g-recaptcha-response"]);

        const formErrors = validateJoinForm(formValues);

        if(Object.keys(formErrors).length === 0){
            console.log('회원 정보: ', formValues);
            processJoinok(formValues);
        }else {
            setErrors(formErrors);
            console.log("'오류 정보 : '", formErrors);
        }
    };

    const validateJoinForm = (values) => {
        let formErrors = {};

        if (!values.stdnt_id) {
            formErrors.stdnt_id = "아이디를 입력하세요!!";
        }else if (values.stdnt_id.length < 6) {
            formErrors.stdnt_id = "아이디는 6자 이상이어야 합니다!!";
        }

        if (!values.pwd) {
            formErrors.pwd = "비밀번호를 입력하세요!!";
        }else if (values.pwd.length < 6) {
            formErrors.pwd = "비밀번호는 6자 이상이어야 합니다!!";
        }

        if (!values.repwd) {
            formErrors.repwd = "비밀번호를 확인하세요!!";
        }else if (values.repwd.length < 6) {
            formErrors.repwd = "비밀번호는 6자 이상이어야 합니다!!";
        }

        if (!values.stdnt_email) {
            formErrors.stdnt_email = "이메일을 입력하세요!!";
        }else if (!/\S+@\S+\.\S+/.test(values.stdnt_email)) {
            formErrors.stdnt_email = "유효한 이메일 주소를 입력하세요!!";
        }

        if (!values.stdnt_nm) {
            formErrors.stdnt_nm = "이름을 입력하세요!!";
        }

        if (!values.gen_cd) {
            formErrors.gen_cd = "성별을 선택하세요!!";
        }

        if (!values.phone) {
            formErrors.phone = "전화번호를 입력하세요!!";
        }else if (!/^010-\d{4}-\d{4}$/.test(values.phone)) {
            formErrors.phone = "유효한 전화번호 형식이 아닙니다!!";
        }

        if (!values.zip_cd && !values.addr) {
            formErrors.zip_cd = "주소 검색 후 우편번호를 입력하세요!!";
            formErrors.addr = "주소 검색 후 주소를 입력하세요!!";
        }

        if (!values["g-recaptcha-response"]) {
            formErrors.recaptcha = "자동가입방지를 확인하세요!!";
        }

        return formErrors;
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const formatted = formatPhoneNumber(value);
            setForm(prev => ({ ...prev, [name]: formatted }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.pwd !== form.confirmPwd) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 여기서 form 데이터 제출 처리 (예: API 호출 등)
        console.log("회원가입 데이터:", form);
    };

    return (
        <div className="vertical-align-wrap">
            <div className="vertical-align-middle">
                <div className="join-box">
                    <div className="content">
                        <div className="header text-center">
                            <div className="logo mb-4">
                                <img src="/assets/img/academiLogo_login.jpg" alt="Klorofil Logo" />
                            </div>
                            <h2><i className="lnr lnr-pointer-right"></i> 학생 회원가입</h2>
                        </div>

                        <form name="joinfrm" id="joinfrm" method="post" ref={formJoinRef}
                              onSubmit={handleJoinSubmit} noValidate className="form-join">
                            <div className="form-group">
                                <label>아이디</label>
                                <input name="stdnt_id" onChange={handleChange} value={form.stdnt_id} type="text" required />
                                {errors.stdnt_id && <p className="error-msg">{errors.stdnt_id}</p>}
                            </div>

                            <div className="form-group">
                                <label>비밀번호</label>
                                <input name="pwd" onChange={handleChange} value={form.pwd} type="password" required />
                                {errors.pwd && <p className="error-msg">{errors.pwd}</p>}
                            </div>

                            <div className="form-group">
                                <label>비밀번호 확인</label>
                                <input name="repwd" onChange={handleChange} value={form.repwd} type="password" required />
                                {errors.repwd && <p className="error-msg">{errors.repwd}</p>}
                            </div>

                            <div className="form-group">
                                <label>이메일</label>
                                <input name="stdnt_email" onChange={handleChange} value={form.stdnt_email} type="email" />
                                {errors.stdnt_email && <p className="error-msg">{errors.stdnt_email}</p>}
                            </div>

                            <div className="form-group">
                                <label>이름</label>
                                <input name="stdnt_nm" onChange={handleChange} value={form.stdnt_nm} type="text" />
                                {errors.stdnt_nm && <p className="error-msg">{errors.stdnt_nm}</p>}
                            </div>

                            <div className="form-group gender-wrap">
                                <label>성별</label>
                                <div className="gender-options">
                                    <button
                                        type="button"
                                        className={`gender-btn ${form.gen_cd === "M" ? "active" : ""}`}
                                        onClick={() => setForm(prev => ({ ...prev, gen_cd: "M" }))}
                                    >
                                        남
                                    </button>
                                    <button
                                        type="button"
                                        className={`gender-btn ${form.gen_cd === "F" ? "active" : ""}`}
                                        onClick={() => setForm(prev => ({ ...prev, gen_cd: "F" }))}
                                    >
                                        여
                                    </button>
                                    {errors.gen_cd && <p className="error-msg">{errors.gen_cd}</p>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>전화번호</label>
                                <input name="phone" onChange={handleChange} value={form.phone} type="text" placeholder='"-" 없이 숫자만 입력(예: 01012345678)'/>
                                {errors.phone && <p className="error-msg">{errors.phone}</p>}
                            </div>

                            <div className="form-group address-group">
                                <label>우편번호</label>
                                <div className="zip-row">
                                    <input
                                        name="zip_cd"
                                        onChange={handleChange}
                                        value={form.zip_cd}
                                        type="text"
                                        placeholder="주소 검색 시 자동 입력됩니다."
                                    />
                                    <button
                                        type="button"
                                        className="btn-zipcode"
                                        onClick={() => {
                                            new window.daum.Postcode({
                                                oncomplete: function (data) {
                                                    const fullAddress = data.address;
                                                    const zonecode = data.zonecode;

                                                    setForm(prev => ({
                                                        ...prev,
                                                        zip_cd: zonecode,
                                                        addr: fullAddress
                                                    }));
                                                }
                                            }).open();
                                        }}
                                    >
                                        주소 검색
                                    </button>
                                </div>
                                {errors.zip_cd && <p className="error-msg">{errors.zip_cd}</p>}
                            </div>


                            <div className="form-group">
                                <label>주소</label>
                                <input name="addr" onChange={handleChange} value={form.addr} type="text" />
                                {errors.addr && <p className="error-msg">{errors.addr}</p>}
                            </div>

                            <div className="form-group">
                                <label>상세주소</label>
                                <input name="addr_dtl" onChange={handleChange} value={form.addr_dtl} type="text"
                                       placeholder="필요 시 상세주소 입력"/>
                            </div>

                            <div className="form-button-row">
                                <button type="button" className="btn btn-reset" onClick={handleReset}>다시 작성</button>
                                <button type="submit" className="btn btn-login">회원가입</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join;
