"use client"
import { Inter } from "next/font/google";

import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHome from "@/components/admin/AdminHome";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)


{   
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <AdminHome/>
      
    </html>
  );
}


