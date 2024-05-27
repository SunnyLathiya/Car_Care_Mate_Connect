"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import styles from "@/css/Navbar.module.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { ToastError } from "./Toast";

function getToken(): string | null {
  return Cookies.get("token") || null;
}

function getAccountTypeFromToken(): string | null {
  const token = getToken();

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const accountType = decodedToken.accountType;
      return accountType as string;
    } catch (error) {
      return null;
    }
  }
  return null;
}

const handleLogout = () => {
  Cookies.remove("token");
};

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [accountType, setAccountType] = useState<string | null>(null);

  const fetchAccountType = useCallback(async () => {
    try {
      const type = getAccountTypeFromToken();
      setAccountType(type);
    } catch (error) {
      ToastError("Error fetching account type");
    }
  }, []);

  useEffect(() => {
    fetchAccountType();
  }, [fetchAccountType]);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const customerhome = pathname.startsWith("/customer/cushome");
  return (
    <nav className={`${styles.nav} ${show ? styles.nav__scroll : ""}`}>
      <span
        style={{
          fontFamily: "Sevillana",
          color: "#B85042",
          fontSize: "25px",
          marginLeft: `${
            accountType === "Admin" || accountType === "Mechanic"
              ? "200px"
              : "20px"
          }`,
        }}
      >
        CarCareMateConnect
      </span>
      <div
        className={`${styles.nav__container} ${styles.nav__borderXwidth} ${
          show
            ? `${styles.nav__containerscroll} ${styles.nav__borderXwidthscroll}`
            : styles.nav__borderXwidth
        }`}
      >
        {!accountType && (
          <>
            <Link
              href="/whyus"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/whyus" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              aria-label="Why Us?"
            >
              WHY US?
            </Link>
            <Link
              href="/working"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/working" ? styles.active : ""
              }  ${show ? styles.nav__linkscroll : ""}`}
              aria-label="How It Works"
            >
              HOW IT WORKS
            </Link>
            <Link
              href="/contactus"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/contactus" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              aria-label="Contact Us"
            >
              CONTACT US
            </Link>
            <Link
              href="/signin"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/signin" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              aria-label="Login"
            >
              LOGIN
            </Link>
          </>
        )}

        {accountType === "Customer" && (
          <>
            <Link
              href="/customer/cushome"
              passHref
              className={`${styles.nav__link} ${
                customerhome ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              aria-label="Home"
            >
              HOME
            </Link>
            <Link
              href="/customer/mybookings"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/customer/mybookings" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              aria-label="My Bookings"
            >
              MY BOOKINGS
            </Link>
            <Link
              href="/profile"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/profile" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              aria-label="Profile"
            >
              PROFILE
            </Link>
            <Link
              href="/contactus"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/contactus" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              aria-label="Contact Us"
            >
              CONTACT US
            </Link>
            <Link
              href="/signin"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/signin" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              onClick={handleLogout}
              aria-label="Logout"
            >
              LOGOUT
            </Link>
          </>
        )}

        {accountType === "Admin" && (
          <>
            <Link
              href="/admin/profile"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/admin/profile" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              aria-label="Admin Profile"
            >
              PROFILE
            </Link>
            <Link
              href="/signin"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/signin" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              onClick={handleLogout}
              aria-label="Logout"
            >
              LOGOUT
            </Link>
          </>
        )}

        {accountType === "Mechanic" && (
          <>
            <Link
              href="/profile"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/profile" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              aria-label="Mechanic Profile"
            >
              PROFILE
            </Link>
            <Link
              href="/signin"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/signin" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
              onClick={handleLogout}
              aria-label="Logout"
            >
              LOGOUT
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
