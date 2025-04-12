'use client';

import React from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import MyinfoInfoGrid from '@/app/components/Myinfo/MyinfoInfoGrid';
import useFetchMyinfo from '@/app/hooks/useFetchMyinfo';
import '@/app/(app)/myinfo.css';

const PageMyInfo = () => {
    const breadcrumbItems = [
        { label: '대시보드', href: '/dashboard' },
        { label: '마이페이지' },
        { label: '회원정보', href: '/myinfo' },
    ];

    const userData = useFetchMyinfo();

    const handleEditClick = () => {
        window.location.href = '/myinfoedit';
    };

    if (!userData) {
        return <div>오류가 발생하였습니다... 다시 시도해주세요</div>;
    }

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="container mx-auto p-6 bg-white shadow rounded">
                <h2 className="myinfo">{userData.stdntNm}님의 회원정보</h2>
                <MyinfoInfoGrid userData={userData} onEditClick={handleEditClick} />
            </div>
        </div>
    );
};

export default PageMyInfo;