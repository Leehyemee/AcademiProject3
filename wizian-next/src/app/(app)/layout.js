"use client";

import "../globals.css";
import SideBar from '@/app/(app)/layout/SideBar';
import Header from '@/app/(app)/layout/Header';
import Footer from '@/app/(app)/layout/Footer';
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <head>
        <title>Dashboard | Klorofil - Free Bootstrap Dashboard Template</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/vendor/font-awesome/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/assets/vendor/linearicons/style.css" />
        <link rel="stylesheet" href="/assets/vendor/chartist/css/chartist-custom.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/demo.css" />
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/img/favicon.png" />
      </head>
      <body>
      <div id="wrapper">
        <Header />
        <SideBar />
        <div className="main">{children}</div>
        <div className="clearfix"></div>
        <Footer />
      </div>

      {/* Scripts */}
      <Script src="/assets/vendor/jquery/jquery.min.js" strategy="lazyOnload" />
      <Script src="/assets/vendor/bootstrap/js/bootstrap.min.js" strategy="lazyOnload" />
      <Script src="/assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js" strategy="lazyOnload" />
      <Script src="/assets/vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js" strategy="lazyOnload" />
      <Script src="/assets/vendor/chartist/js/chartist.min.js" strategy="lazyOnload" />
      <Script src="/assets/scripts/klorofil-common.js" strategy="lazyOnload" />
      <Script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js" strategy="lazyOnload" />
      </body>
      </html>
  );
}
