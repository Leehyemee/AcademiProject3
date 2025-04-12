'use client';

import { useRef } from "react";
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import { checkIdAvailability } from "../utils/checkIdAvailability";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";
import { processJoinok } from "../utils/processJoinok";
import useJoinForm from "../hooks/useJoinForm";

const JoinForm = () => {
    const recaptchaRef = useRef(); // ← 컴포넌트 내부로 이동!
    const {
        form, errors, idAvailable, recaptchaToken, isLoading,
        handleChange, handleReset, handleIdCheck, handleJoinSubmitBase
    } = useJoinForm();

    // wrapper로 handleJoinSubmit을 재정의
    const handleJoinSubmit = async (e) => {
        e.preventDefault();
        const result = await handleJoinSubmitBase(e);

        if (result === 'success') {
            recaptchaRef.current?.reset(); // 제출 후 리캡챠 리셋
        }
    };

    const handleFormReset = () => {
        handleReset();
        recaptchaRef.current?.reset();  // 리캡챠 리셋
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
                <img src="/assets/img/academiLogo.png" alt="Logo" className="logo-img" />
            </div>

            <div className="join-box">
                <div className="content">
                    <div className="header text-center">
                        <h2 className="h2"><i className="lnr lnr-pointer-right"></i> 학생 회원가입</h2>
                    </div>

                    <form onSubmit={handleJoinSubmit} className="form-join" noValidate>
                        {/* 아이디 */}
                        <div className="form-group address-group">
                            <label>아이디</label>
                            <div className="zip-row">
                                <input name="stdntId" onChange={handleChange} value={form.stdntId} type="text" />
                                <button type="button" className="idbtn" onClick={handleIdCheck}>중복 확인</button>
                            </div>
                            {errors.stdntId && <p className="error-msg">{errors.stdntId}</p>}
                        </div>

                        {/* 비밀번호 */}
                        <div className="form-group address-group">
                            <label>비밀번호</label>
                            <input name="pwd" onChange={handleChange} value={form.pwd} type="password" />
                            {errors.pwd && <p className="error-msg">{errors.pwd}</p>}
                        </div>

                        <div className="form-group address-group">
                            <label>비밀번호 확인</label>
                            <input name="repwd" onChange={handleChange} value={form.repwd} type="password" />
                            {errors.repwd && <p className="error-msg">{errors.repwd}</p>}
                        </div>

                        {/* 이메일 */}
                        <div className="form-group address-group">
                            <label>이메일</label>
                            <input name="stdntEmail" onChange={handleChange} value={form.stdntEmail} type="email" />
                            {errors.stdntEmail && <p className="error-msg">{errors.stdntEmail}</p>}
                        </div>

                        {/* 이름 */}
                        <div className="form-group address-group">
                            <label>이름</label>
                            <input name="stdntNm" onChange={handleChange} value={form.stdntNm} type="text" />
                            {errors.stdntNm && <p className="error-msg">{errors.stdntNm}</p>}
                        </div>

                        {/* 성별 */}
                        <div className="form-group address-group">
                            <label>성별</label>
                            <select name="genCd" onChange={handleChange} value={form.genCd}>
                                <option value="">성별 선택</option>
                                <option value="M">남성</option>
                                <option value="F">여성</option>
                            </select>
                            {errors.genCd && <p className="error-msg">{errors.genCd}</p>}
                        </div>

                        {/* 전화번호 */}
                        <div className="form-group address-group">
                            <label>전화번호</label>
                            <input name="phone" onChange={handleChange} value={form.phone} type="text" />
                            {errors.phone && <p className="error-msg">{errors.phone}</p>}
                        </div>

                        {/* 주소 */}
                        <div className="form-group address-group">
                            <label>주소</label>
                            <input name="addr" onChange={handleChange} value={form.addr} type="text" />
                            {errors.addr && <p className="error-msg">{errors.addr}</p>}
                        </div>

                        <div className="form-group address-group">
                            <label>상세주소</label>
                            <input name="addrDtl" onChange={handleChange} value={form.addrDtl} type="text" />
                            {errors.addrDtl && <p className="error-msg">{errors.addrDtl}</p>}
                        </div>

                        {/* 리캡챠 */}
                        <div className="ReCAPTCHA">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
                                onChange={(token) => handleChange({ target: { name: 'gRecaptchaResponse', value: token } })}
                            />
                            {errors.recaptcha && <p className="error-msg">{errors.recaptcha}</p>}
                        </div>

                        {/* 버튼 */}
                        <div className="form-button-row">
                            <button type="button" className="btn btn-reset" onClick={handleFormReset}>다시 작성</button>
                            <button type="submit" className="btn btn-login">회원가입</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JoinForm;
