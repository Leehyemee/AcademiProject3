import React from 'react';

const MyinfoInfoGrid = ({ userData, onEditClick }) => {
    const isSocialUser = userData.loginType === 'KAKAO' || userData.loginType === 'GOOGLE';
    const socialLabel = userData.loginType === 'KAKAO' ? '카카오 로그인 회원' : '구글 로그인 회원';

    const genderText =
        userData.genCd === 'M'
            ? '남자'
            : userData.genCd === 'F'
                ? '여자'
                : isSocialUser
                    ? `${socialLabel}. (확인 불가)`
                    : '미기재';

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
    };

    return (
        <>
            <div className="info-grid">
                <div><strong>아이디:</strong></div><div>{userData.stdntId}</div>
                <div><strong>이름:</strong></div><div>{userData.stdntNm}</div>
                <div><strong>이메일:</strong></div><div>{userData.stdntEmail}</div>
                <div><strong>성별:</strong></div><div>{genderText}</div>
                <div><strong>전화번호:</strong></div>
                <div>{isSocialUser ? `${socialLabel}. (확인 불가)` : userData.phone}</div>
                <div><strong>우편번호:</strong></div>
                <div>{isSocialUser ? `${socialLabel}. (확인 불가)` : userData.zipCd}</div>
                <div><strong>주소:</strong></div>
                <div>{isSocialUser ? `${socialLabel}. (확인 불가)` : userData.addr}</div>
                <div><strong>상세 주소:</strong></div>
                <div>{isSocialUser ? `${socialLabel}. (확인 불가)` : (userData.addrDtl || "미기재")}</div>
                <div><strong>가입일:</strong></div><div>{formatDate(userData.stdntRegdate)}</div>
            </div>

            <div className="flex justify-center mt-6">
                {isSocialUser ? (
                    <p className="text-red-500 font-medium">
                        {socialLabel}로 로그인하신 회원은 개인정보 수정이 불가능합니다.
                    </p>
                ) : (
                    <button onClick={onEditClick} className="btn-complate">
                        수정하기
                    </button>
                )}
            </div>
        </>
    );
};

export default MyinfoInfoGrid;