import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/common/Navbar";
import { StoreProvider } from "@/redux/provider";
import { ToastContainer } from "../components/common/Toast";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/common/Footer";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarCareMateConnect",
  description: "use for best car services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/js/bootstrap.bundle.min.js"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://s.pageclip.co/v1/pageclip.css"
          media="screen"
        ></link>
      </head>
      <body>
        <StoreProvider>
          <ToastContainer />
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
        <script
          src="https://s.pageclip.co/v1/pageclip.js"
          charSet="utf-8"
        ></script>
      </body>
    </html>
  );
}
