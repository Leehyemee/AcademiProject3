import "./globals.css";
import SideBar from '@/app/(app)/layout/SideBar';
import Header from '@/app/(app)/layout/Header';
import Footer from '@/app/(app)/layout/Footer';

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
          <body>
            {children}
          </body>
      </html>
  );
}
