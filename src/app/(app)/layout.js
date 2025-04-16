"use client";

import "../globals.css";
import SideBar from '@/app/(app)/layout/SideBar';
import Header from '@/app/(app)/layout/Header';
import Footer from '@/app/(app)/layout/Footer';
import Script from "next/script";
import useSidebarMenu from "@/app/(app)/layout/useSidebarMenu";

export default function RootLayout({ children }) {
    const { isSidebarCollapsed } = useSidebarMenu(); // 사이드바 상태 가져오기

    return (
        <div id="wrapper">
            <Header />
            <SideBar className={isSidebarCollapsed ? 'collapsed' : ''} /> {/* 사이드바 상태에 따라 클래스 변경 */}
            <div className="main">{children}</div>
            <div className="clearfix"></div>
            <Footer />

            {/* Scripts */}
            <Script src="/assets/vendor/jquery/jquery.min.js" strategy="lazyOnload" />
            <Script src="/assets/vendor/bootstrap/js/bootstrap.min.js" strategy="lazyOnload" />
            <Script src="/assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js" strategy="lazyOnload" />
            <Script src="/assets/vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js" strategy="lazyOnload" />
            <Script src="/assets/vendor/chartist/js/chartist.min.js" strategy="lazyOnload" />
            <Script src="/assets/scripts/klorofil-common.js" strategy="lazyOnload" />
            <Script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js" strategy="lazyOnload" />
        </div>
    );
}
