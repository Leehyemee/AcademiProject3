// src/app/layout.js
import "./globals.css";
import Script from "next/script";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <title>Dashboard | Klorofil - Free Bootstrap Dashboard Template</title>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

            {/* VENDOR CSS */}
            <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
            <link rel="stylesheet" href="/assets/vendor/font-awesome/css/font-awesome.min.css" />
            <link rel="stylesheet" href="/assets/vendor/linearicons/style.css" />
            <link rel="stylesheet" href="/assets/vendor/chartist/css/chartist-custom.css" />

            {/* MAIN CSS */}
            <link rel="stylesheet" href="/assets/css/main.css" />
            <link rel="stylesheet" href="/assets/css/demo.css" />

            {/* GOOGLE FONTS */}
            <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet" />

            {/* ICONS */}
            <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/assets/img/favicon.png" />
        </head>
        <body>
        {children}

        {/* JavaScript */}
        <Script src="/assets/vendor/jquery/jquery.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendor/bootstrap/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendor/chartist/js/chartist.min.js" strategy="afterInteractive" />
        <Script src="/assets/scripts/klorofil-common.js" strategy="afterInteractive" />
        <Script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js" strategy="afterInteractive" />
        </body>
        </html>
    );
}
