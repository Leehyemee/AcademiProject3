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


        <div id="wrapper">
            {children}
        </div>

  );
}
