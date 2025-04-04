import "../globals.css";

// export const metadata = {
//   title: "Kaiadmin - Bootstrap 5 Admin Dashboard",
//   description: "Admin dashboard built with Bootstrap 5",
// };
//
// export const viewport = {
//     width: "device-width",
//     initialScale: 1.0,
//     shrinkToFit: "no",
// };

export default function RootLayout({ children }) {

  return (
      <html lang="en">

      <head>
        <title>Dashboard | Klorofil - Free Bootstrap Dashboard Template</title>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        {/* VENDOR CSS */}
        <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="/assets/vendor/font-awesome/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="/assets/vendor/linearicons/style.css"/>
        <link rel="stylesheet" href="/assets/vendor/chartist/css/chartist-custom.css"/>
        {/* MAIN CSS */}
        <link rel="stylesheet" href="/assets/css/main.css"/>
        {/* FOR DEMO PURPOSES ONLY. You should remove this in your project */}
        <link rel="stylesheet" href="/assets/css/demo.css"/>
        {/* GOOGLE FONTS */}
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet"/>
        {/* ICONS */}
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/img/favicon.png"/>
      </head>

      <body>

        <div id="wrapper">
            {children}
        </div>

        {/* Javascript */}
        <script src="/assets/vendor/jquery/jquery.min.js" defer></script>
        <script src="/assets/vendor/bootstrap/js/bootstrap.min.js" defer></script>
        <script src="/assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js" defer></script>
        <script src="/assets/vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js" defer></script>
        <script src="/assets/vendor/chartist/js/chartist.min.js" defer></script>
        <script src="/assets/scripts/klorofil-common.js" defer></script>

      </body>

      </html>
  );
}
