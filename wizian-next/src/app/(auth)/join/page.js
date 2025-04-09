"use client";
import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";

// 아이디 중복 확인
const checkIdAvailability = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/auth/stdnt/check-id?stdntId=${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.isAvailable;
        } else {
            throw new Error('아이디 중복 확인 실패');
        }
    } catch (error) {
        console.error('서버 오류:', error);
        Swal.fire({
            title: '서버 오류',
            text: '아이디 중복 여부를 확인할 수 없습니다.',
            icon: 'error'
        });
        return null;
    }
};

// 회원가입 처리
const processJoinok = async (formValues) => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/stdnt/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formValues)
        });

        if (response.ok) {
            Swal.fire({
                title: '회원가입 완료!',
                text: '로그인 페이지로 이동합니다.',
                icon: 'success',
                confirmButtonText: '확인'
            }).then(() => {
                location.href = "/pageLogin";
            });
        } else if (response.status === 400) {
            const errorText = await response.text();
            Swal.fire({
                title: '입력 오류',
                text: errorText,
                icon: 'error'
            });
        } else {
            Swal.fire({
                title: '회원가입 실패!',
                text: '다시 시도해주세요.',
                icon: 'error'
            });
        }
    } catch (error) {
        Swal.fire({
            title: '서버 오류!',
            text: '관리자에게 문의해주세요.',
            icon: 'error'
        });
    }
};

const formatPhoneNumber = (value) => {
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
};

const initialFormState = {
    stdntId: "",
    pwd: "",
    repwd: "",
    stdntEmail: "",
    stdntNm: "",
    genCd: "",
    phone: "",
    zipCd: "",
    addr: "",
    addrDtl: ""
};

const Join = () => {
    const formJoinRef = useRef(null);
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [idAvailable, setIdAvailable] = useState(true);
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleReset = () => {
        Swal.fire({
            title: '정말 다시 작성하시겠어요?',
            text: '입력한 모든 정보가 초기화됩니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '네',
            cancelButtonText: '아니오'
        }).then((result) => {
            if (result.isConfirmed) {
                setForm(initialFormState);
                setErrors({});
                Swal.fire('초기화 완료!', '다시 작성해주세요!', 'success');
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const formatted = formatPhoneNumber(value);
            setForm(prev => ({ ...prev, [name]: formatted }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleIdCheck = async () => {
        if (!form.stdntId) {
            Swal.fire({
                title: '아이디를 입력해주세요.',
                icon: 'warning',
                confirmButtonText: '확인'
            });
            return;
        }

        const isAvailable = await checkIdAvailability(form.stdntId);

        if (isAvailable === null) {
            return;
        }
        setIdAvailable(isAvailable);

        if (isAvailable) {
            Swal.fire({
                title: '사용 가능한 아이디입니다.',
                icon: 'success',
                confirmButtonText: '확인'
            });
        } else {
            Swal.fire({
                title: '이미 사용 중인 아이디입니다.',
                icon: 'error',
                confirmButtonText: '확인'
            });
        }
    };

    const validateJoinForm = (values) => {
        let formErrors = {};

        if (!values.stdntId) {
            formErrors.stdntId = "아이디를 입력하세요!!";
        } else if (!/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/.test(values.stdntId)) {
            formErrors.stdntId = "아이디는 영어 소문자와 숫자를 모두 포함한 6자 이상이어야 합니다!!";
        }

        if (!values.pwd) {
            formErrors.pwd = "비밀번호를 입력하세요!!";
        } else if (values.pwd.length < 6) {
            formErrors.pwd = "비밀번호는 6자 이상이어야 합니다!!";
        }

        if (!values.repwd) {
            formErrors.repwd = "비밀번호를 확인하세요!!";
        } else if (values.repwd !== values.pwd) {
            formErrors.repwd = "비밀번호가 일치하지 않습니다!!";
        }

        if (!values.stdntEmail) {
            formErrors.stdntEmail = "이메일을 입력하세요!!";
        } else if (!/\S+@\S+\.\S+/.test(values.stdntEmail)) {
            formErrors.stdntEmail = "유효한 이메일 주소를 입력하세요!!";
        }

        if (!values.stdntNm) {
            formErrors.stdntNm = "이름을 입력하세요!!";
        }

        if (!values.genCd) {
            formErrors.genCd = "성별을 선택하세요!!";
        }

        if (!values.phone) {
            formErrors.phone = "전화번호를 입력하세요!!";
        } else if (!/^010-\d{4}-\d{4}$/.test(values.phone)) {
            formErrors.phone = "유효한 전화번호 형식이 아닙니다!!";
        }

        if (!values.zipCd || !values.addr) {
            formErrors.zipCd = "주소 검색 후 우편번호를 입력하세요!!";
            formErrors.addr = "주소 검색 후 주소를 입력하세요!!";
        }

        // 리캡챠 확인 검사
        if (!values["gRecaptchaResponse"]) {
            formErrors.recaptcha = "자동가입방지를 확인하세요!!";
        }

        return formErrors;
    };

    const handleJoinSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            ...form,
            "gRecaptchaResponse": recaptchaToken
        };
        const formErrors = validateJoinForm(formValues);

        if (Object.keys(formErrors).length === 0) {
            processJoinok(formValues);
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="vertical-align-wrap">
            <div className="vertical-align-middle">
                <div className="join-box">
                    <div className="content">
                        <div className="header text-center">
                            <div className="logo mb-4">
                                <img src="/assets/img/academiLogo_login.jpg" alt="Logo" />
                            </div>
                            <h2><i className="lnr lnr-pointer-right"></i> 학생 회원가입</h2>
                        </div>

                        <form ref={formJoinRef} onSubmit={handleJoinSubmit} noValidate>
                            <div className="form-group address-group">
                                <label>아이디</label>
                                <div className="zip-row">
                                    <input name="stdntId" onChange={handleChange} value={form.stdntId} type="text" />
                                    <button type="button" className="idbtn" onClick={handleIdCheck}>중복 확인</button>
                                </div>
                                {errors.stdntId && <p className="error-msg">{errors.stdntId}</p>}
                                {!idAvailable && <p className="error-msg">이미 사용 중인 아이디입니다.</p>}
                            </div>

                            <div className="form-group">
                                <label>비밀번호</label>
                                <input name="pwd" onChange={handleChange} value={form.pwd} type="password" />
                                {errors.pwd && <p className="error-msg">{errors.pwd}</p>}
                            </div>

                            <div className="form-group">
                                <label>비밀번호 확인</label>
                                <input name="repwd" onChange={handleChange} value={form.repwd} type="password" />
                                {errors.repwd && <p className="error-msg">{errors.repwd}</p>}
                            </div>

                            <div className="form-group">
                                <label>이메일</label>
                                <input name="stdntEmail" onChange={handleChange} value={form.stdntEmail} type="email"
                                       placeholder='예) abc123@domain.com'/>
                                {errors.stdntEmail && <p className="error-msg">{errors.stdntEmail}</p>}
                            </div>

                            <div className="form-group">
                                <label>이름</label>
                                <input name="stdntNm" onChange={handleChange} value={form.stdntNm} type="text" />
                                {errors.stdntNm && <p className="error-msg">{errors.stdntNm}</p>}
                            </div>

                            <div className="form-group gender-wrap">
                                <label>성별</label>
                                <div className="gender-options">
                                    <button type="button" className={`gender-btn ${form.genCd === "M" ? "active" : ""}`}
                                            onClick={() => setForm(prev => ({ ...prev, genCd: "M" }))}>남</button>
                                    <button type="button" className={`gender-btn ${form.genCd === "F" ? "active" : ""}`}
                                            onClick={() => setForm(prev => ({ ...prev, genCd: "F" }))}>여</button>
                                </div>
                                {errors.genCd && <p className="error-msg">{errors.genCd}</p>}
                            </div>

                            <div className="form-group">
                                <label>전화번호</label>
                                <input name="phone" onChange={handleChange} value={form.phone} type="text"
                                       placeholder='"-" 없이 숫자만 입력' />
                                {errors.phone && <p className="error-msg">{errors.phone}</p>}
                            </div>

                            <div className="form-group address-group">
                                <label>우편번호</label>
                                <div className="zip-row">
                                    <input name="zipCd" onChange={handleChange} value={form.zipCd} type="text"
                                           placeholder="주소 검색 시 자동 입력됩니다." />
                                    <button type="button" className="addrbtn" onClick={() => {
                                        if (!window.daum || !window.daum.Postcode) {
                                            Swal.fire("주소 검색 스크립트가 아직 로드되지 않았어요!", "", "warning");
                                            return;
                                        }

                                        new window.daum.Postcode({
                                            oncomplete: function (data) {
                                                const fullAddress = data.address;
                                                const zonecode = data.zonecode;

                                                setForm(prev => ({
                                                    ...prev,
                                                    zipCd: zonecode,
                                                    addr: fullAddress
                                                }));
                                            }
                                        }).open();
                                    }}>주소 검색</button>
                                </div>
                                {errors.zipCd && <p className="error-msg">{errors.zipCd}</p>}
                            </div>

                            <div className="form-group">
                                <label>주소</label>
                                <input name="addr" onChange={handleChange} value={form.addr} type="text"
                                       placeholder='기본 주소' />
                                {errors.addr && <p className="error-msg">{errors.addr}</p>}
                            </div>

                            <div className="form-group">
                                <label>상세주소</label>
                                <input name="addrDtl" onChange={handleChange} value={form.addrDtl} type="text"
                                       placeholder='나머지 주소(선택입력 가능)' />
                            </div>

                            <div className="ReCAPTCHA">
                                <ReCAPTCHA
                                    sitekey={sitekey}
                                    onChange={(token) => {
                                        console.log("토큰 잘 받음:", token);
                                        setRecaptchaToken(token)}}
                                />
                                {errors.recaptcha && <p className="error-msg">{errors.recaptcha}</p>}
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
