"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AdminHome from "@/components/admin/AdminHome";
import Loader from "@/components/common/loader";
import { ToastError } from "@/components/common/Toast";
import Chatbot from "@/components/chatbotadmin";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [accountType, setAccountType] = useState<string | null>(null);
  useEffect(() => {
    const fetchAccountType = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const type = decodedToken.accountType;
          setAccountType(type);
        } catch (error) {
          ToastError("Error decoding token");
        }
      }
    };

    fetchAccountType();
  }, []);

  if (accountType !== "Admin") {
    return <Loader />;
  }

  return (
    <>
      {children}
      {accountType === "Admin" && <AdminHome />}
      <Chatbot />
    </>
  );
}
