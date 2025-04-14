"use client";
import React from "react";

const MyInfoEditForm = ({ userData, setUserData, errors, handleSubmit, handleCancel, handleChange, handleAddressSearch }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>비밀번호</label>
                <input
                    type="password"
                    name="newPwd"
                    value={userData.newPwd || ''}
                    onChange={(e) => setUserData({ ...userData, newPwd: e.target.value })}
                    placeholder="비밀번호 입력 (변경하지 않으려면 비워두세요)"
                />
                <span className="hint-text">(변경하시려면 새 비밀번호 입력, 공백이면 기존 비밀번호 유지)</span>
                {errors.newPwd && <p className="text-red-500">{errors.newPwd}</p>}
            </div>
            <div className="form-group">
                <label>이메일</label>
                <input type="email" name="stdntEmail" value={userData.stdntEmail} onChange={handleChange} />
                {errors.stdntEmail && <p className="text-red-500">{errors.stdntEmail}</p>}
            </div>
            <div className="form-group">
                <label>전화번호</label>
                <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>
            <div className="form-group address-group">
                <label>우편번호</label>
                <div className="zip-row">
                    <input name="zipCd" value={userData.zipCd} onChange={handleChange} />
                    <button type="button" onClick={handleAddressSearch}>주소 검색</button>
                </div>
                {errors.zipCd && <p className="text-red-500">{errors.zipCd}</p>}
            </div>
            <div className="form-group">
                <label>주소</label>
                <input name="addr" value={userData.addr} onChange={handleChange} />
                {errors.addr && <p className="text-red-500">{errors.addr}</p>}
            </div>
            <div className="form-group">
                <label>상세주소</label>
                <input name="addrDtl" value={userData.addrDtl || ''} onChange={handleChange} />
            </div>

            <div className="form-button-row">
                <button type="button" className="btn-cansle" onClick={handleCancel}>취소</button>
                <button type="submit" className="btn-complate">수정 완료</button>
            </div>
        </form>
    );
};

export default MyInfoEditForm;