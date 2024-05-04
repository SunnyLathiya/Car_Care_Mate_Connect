
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/components/Home/Navbar";
import { StoreProvider } from "@/redux/provider";
import {ToastContainer} from "../components/common/Toast";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />

         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/js/bootstrap.bundle.min.js" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"/>

        <link rel="stylesheet" href="https://s.pageclip.co/v1/pageclip.css" media="screen"></link>


      </head>
      <body className={inter.className} style={{ height: "100vh"}}>
        <StoreProvider>
         <ToastContainer/>
         <Navbar/>
        {children}
        </StoreProvider>
      <script src="https://s.pageclip.co/v1/pageclip.js" charSet="utf-8"></script>
        </body>
      
    </html>
  );
}




// :root {
//   --max-width: 1100px;
//   --border-radius: 12px;
//   --font-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
//     "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
//     "Fira Mono", "Droid Sans Mono", "Courier New", monospace;

//   --foreground-rgb: 0, 0, 0;
//   --background-start-rgb: 214, 219, 220;
//   --background-end-rgb: 255, 255, 255;

//   --primary-glow: conic-gradient(
//     from 180deg at 50% 50%,
//     #16abff33 0deg,
//     #0885ff33 55deg,
//     #54d6ff33 120deg,
//     #0071ff33 160deg,
//     transparent 360deg
//   );
//   --secondary-glow: radial-gradient(
//     rgba(255, 255, 255, 1),
//     rgba(255, 255, 255, 0)
//   );

//   --tile-start-rgb: 239, 245, 249;
//   --tile-end-rgb: 228, 232, 233;
//   --tile-border: conic-gradient(
//     #00000080,
//     #00000040,
//     #00000030,
//     #00000020,
//     #00000010,
//     #00000010,
//     #00000080
//   );

//   --callout-rgb: 238, 240, 241;
//   --callout-border-rgb: 172, 175, 176;
//   --card-rgb: 180, 185, 188;
//   --card-border-rgb: 131, 134, 135;
// }

// @media (prefers-color-scheme: dark) {
//   :root {
//     --foreground-rgb: 255, 255, 255;
//     --background-start-rgb: 0, 0, 0;
//     --background-end-rgb: 0, 0, 0;

//     --primary-glow: radial-gradient(rgba(1, 65, 255, 0.4), rgba(1, 65, 255, 0));
//     --secondary-glow: linear-gradient(
//       to bottom right,
//       rgba(255, 1, 43, 0),
//       rgba(255, 103, 1, 0),
//       rgba(1, 65, 255, 0.3)
//     );

//     --tile-start-rgb: 2, 13, 46;
//     --tile-end-rgb: 2, 5, 19;
//     --tile-border: conic-gradient(
//       #ffffff80,
//       #ffffff40,
//       #ffffff30,
//       #ffffff20,
//       #ffffff10,
//       #ffffff10,
//       #ffffff80
//     );

//     --callout-rgb: 20, 20, 20;
//     --callout-border-rgb: 108, 108, 108;
//     --card-rgb: 100, 100, 100;
//     --card-border-rgb: 200, 200, 200;
//   }
// }

// * {
//   box-sizing: border-box;
//   padding: 0;
//   margin: 0;
// }

// html,
// body {
//   max-width: 100vw;
//   overflow-x: hidden;
// }


// a {
//   color: inherit;
//   text-decoration: none;
// }

// @media (prefers-color-scheme: dark) {
//   html {
//     color-scheme: dark;
//   }
// }


// body {
//   color: rgb(var(--foreground-rgb));
//   background: linear-gradient(
//       to bottom,
//       transparent,
//       rgb(var(--background-end-rgb))
//     )
//     rgb(var(--background-start-rgb));
// } 
