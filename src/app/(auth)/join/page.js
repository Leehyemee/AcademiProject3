"use client";

import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import Image from 'next/image';
import "../join.css";

const checkIdAvailability = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/auth/stdnt/check-id?stdntId=${id}`);
        if (response.ok) {
            const data = await response.json();
            return data.isAvailable;
        } else {
            throw new Error('아이디 중복 확인 실패');
        }
    } catch (error) {
        console.error('서버 오류:', error);
        Swal.fire({ title: '서버 오류', text: '아이디 중복 여부를 확인할 수 없습니다.', icon: 'error' });
        return null;
    }
};

const processJoinok = async (formValues, setIsLoading) => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/stdnt/signup', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(formValues)
        });

        setIsLoading(false);

        if (response.ok) {
            Swal.fire({
                title: '회원가입 완료! 로그인 페이지로 이동합니다.',
                html: '※ 메일 인증 후 로그인해주세요. ※',
                icon: 'success',
                confirmButtonText: '확인'
            }).then(() => location.href = "/pageLogin");
        } else if (response.status === 400) {
            const errorText = await response.text();
            Swal.fire({ title: '입력 오류', text: errorText, icon: 'error' });
        } else {
            Swal.fire({ title: '회원가입 실패!', text: '다시 시도해주세요.', icon: 'error' });
        }
    } catch (error) {
        setIsLoading(false);
        Swal.fire({ title: '서버 오류!', text: '관리자에게 문의해주세요.', icon: 'error' });
    }
};

const formatPhoneNumber = (value) => {
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
};

const initialFormState = {
    stdntId: "", pwd: "", repwd: "", stdntEmail: "", stdntNm: "",
    genCd: "", phone: "", zipCd: "", addr: "", addrDtl: ""
};

const Join = () => {
    const formJoinRef = useRef(null);
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [idAvailable, setIdAvailable] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
    const recaptchaRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    const handleReset = () => {
        Swal.fire({
            title: '정말 다시 작성하시겠어요?',
            text: '입력한 모든 정보가 초기화됩니다.',
            icon: 'warning', showCancelButton: true,
            confirmButtonText: '네', cancelButtonText: '아니오'
        }).then((result) => {
            if (result.isConfirmed) {
                setForm(initialFormState);
                setErrors({});
                setRecaptchaToken("");
                Swal.fire('초기화 완료!', '다시 작성해주세요!', 'success');
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const formatted = name === 'phone' ? formatPhoneNumber(value) : value;
        setForm(prev => ({ ...prev, [name]: formatted }));
        if (errors[name]) {
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    const handleIdCheck = async () => {
        if (!form.stdntId) return Swal.fire({ title: '아이디를 입력해주세요.', icon: 'warning' });
        const isAvailable = await checkIdAvailability(form.stdntId);
        if (isAvailable === null) return;
        setIdAvailable(isAvailable);
        Swal.fire({
            title: isAvailable ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.',
            icon: isAvailable ? 'success' : 'error'
        });
    };

    const validateJoinForm = (values) => {
        const errors = {};
        if (!values.stdntId) errors.stdntId = "아이디를 입력하세요!!";
        else if (!/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/.test(values.stdntId))
            errors.stdntId = "아이디는 소문자+숫자 조합 6자 이상!!";

        if (!values.pwd) {
            errors.pwd = "비밀번호를 입력하세요!!";
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(values.pwd)) {
            errors.pwd = "비밀번호는 영문자와 숫자를 포함한 6자 이상이어야 합니다!!";
        }

        if (!values.repwd || values.repwd !== values.pwd) errors.repwd = "비밀번호가 일치하지 않습니다!!";
        if (!values.stdntEmail || !/\S+@\S+\.\S+/.test(values.stdntEmail)) errors.stdntEmail = "유효한 이메일을 입력하세요!!";
        if (!values.stdntNm) errors.stdntNm = "이름을 입력하세요!!";
        if (!values.genCd) errors.genCd = "성별을 선택하세요!!";
        if (!values.phone || !/^010-\d{4}-\d{4}$/.test(values.phone)) errors.phone = "전화번호 형식이 올바르지 않습니다!!";
        if (!values.zipCd || !values.addr) {
            errors.zipCd = "주소를 입력하세요!!";
            errors.addr = "주소를 입력하세요!!";
        }
        if (!values.gRecaptchaResponse) errors.recaptcha = "자동가입방지를 확인하세요!!";
        return errors;
    };

    const handleJoinSubmit = (e) => {
        e.preventDefault();
        if (!idAvailable) return Swal.fire({ title: '아이디 중복확인은 필수입니다!', icon: 'warning' });
        const values = { ...form, gRecaptchaResponse: recaptchaToken };
        const validationErrors = validateJoinForm(values);
        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            processJoinok(values, setIsLoading);
            recaptchaRef.current?.reset();  // 리캡챠 리셋
            setRecaptchaToken("");  // recaptchaToken 초기화
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="login-page-wrap">
            {isLoading && (
                <div className="overlay">
                    <div className="spinner">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
            )}

            <div className="logo-wrap">
                <Image src="/assets/img/academiLogo.png" alt="Logo" className="logo-img" width={200} height={100}/>
            </div>

            <div className="join-box">
                <div className="content">
                    <div className="header text-center">
                        <h2 className="h2"><i className="lnr lnr-pointer-right"></i> 학생 회원가입</h2>
                    </div>

                    <form ref={formJoinRef} onSubmit={handleJoinSubmit} className="form-join" noValidate>
                        <div className="form-group address-group">
                            <label>아이디</label>
                            <div className="zip-row">
                                <input name="stdntId" onChange={handleChange} value={form.stdntId} type="text" />
                                <button type="button" className="idbtn" onClick={handleIdCheck}>중복 확인</button>
                            </div>
                            {errors.stdntId && <p className="error-msg">{errors.stdntId}</p>}
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
                            <input name="stdntEmail" onChange={handleChange} value={form.stdntEmail} type="email" placeholder='예) abc123@domain.com' />
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
                                <button type="button" className={`gender-btn ${form.genCd === "M" ? "active" : ""}`} onClick={() => handleChange({ target: { name: 'genCd', value: 'M' } })}>남</button>
                                <button type="button" className={`gender-btn ${form.genCd === "F" ? "active" : ""}`} onClick={() => handleChange({ target: { name: 'genCd', value: 'F' } })}>여</button>
                            </div>
                            {errors.genCd && <p className="error-msg">{errors.genCd}</p>}
                        </div>

                        <div className="form-group">
                            <label>전화번호</label>
                            <input name="phone" value={form.phone} onChange={handleChange} placeholder="'-' 없이 숫자만 입력" />
                            {errors.phone && <p className="error-msg">{errors.phone}</p>}
                        </div>

                        <div className="form-group address-group">
                            <label>우편번호</label>
                            <div className="zip-row">
                                <input name="zipCd" onChange={handleChange} value={form.zipCd} type="text" placeholder="주소 검색 시 자동 입력됩니다." />
                                <button type="button" className="addrbtn" onClick={() => {
                                    if (!window.daum || !window.daum.Postcode) {
                                        Swal.fire("주소 검색 스크립트가 아직 로드되지 않았어요!", "", "warning");
                                        return;
                                    }
                                    new window.daum.Postcode({
                                        oncomplete: function (data) {
                                            const fullAddress = data.address;
                                            const zonecode = data.zonecode;
                                            handleChange({ target: { name: 'zipCd', value: zonecode } });
                                            handleChange({ target: { name: 'addr', value: fullAddress } });
                                        }
                                    }).open();
                                }}>주소 검색</button>
                            </div>
                            {errors.zipCd && <p className="error-msg">{errors.zipCd}</p>}
                        </div>

                        <div className="form-group">
                            <label>주소</label>
                            <input name="addr" onChange={handleChange} value={form.addr} type="text" placeholder='기본 주소' />
                            {errors.addr && <p className="error-msg">{errors.addr}</p>}
                        </div>

                        <div className="form-group">
                            <label>상세주소</label>
                            <input name="addrDtl" onChange={handleChange} value={form.addrDtl} type="text" placeholder='나머지 주소(선택입력 가능)' />
                        </div>

                        <div className="ReCAPTCHA">
                            <ReCAPTCHA
                                sitekey={sitekey}
                                onChange={(token) => {
                                    setRecaptchaToken(token);
                                    if (errors.recaptcha) {
                                        setErrors(prev => {
                                            const updated = { ...prev };
                                            delete updated.recaptcha;
                                            return updated;
                                        });
                                    }
                                }}
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
    );
};

export default Join;
