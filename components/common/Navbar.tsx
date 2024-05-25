"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/css/Navbar.module.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { ToastError } from "./Toast";

function getToken(): string | null {
  const token = Cookies.get("token");

  if (token) {
    return token;
  } else {
    return null;
  }
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
  } else {
    return null;
  }
}

const handleLogout = () => {
  Cookies.remove("token");
};

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [accountType, setAccountType] = useState<string | null>(null);

  const fetchAccountType = async () => {
    try {
      const type = await getAccountTypeFromToken();
      setAccountType(type);
    } catch (error) {
      ToastError("Error fetching account type");
    }
  };
  fetchAccountType();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [accountType]);

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
            >
              WHY US?
            </Link>
            <Link
              href="/working"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/working" ? styles.active : ""
              }  ${show ? styles.nav__linkscroll : ""}`}
            >
              HOW IT WORKS
            </Link>
            <Link
              href="/contactus"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/contactus" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
            >
              CONTACT US
            </Link>
            <Link
              href="/signin"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/signin" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
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
            >
              HOME
            </Link>
            <Link
              href="/customer/mybookings"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/customer/mybookings" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
            >
              MY BOOKINGS
            </Link>
            <Link
              href="/profile"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/profile" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
            >
              PROFILE
            </Link>
            <Link
              href="/contactus"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/contactus" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
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
                pathname === "/profile" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
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
            >
              LOGOUT
            </Link>
          </>
        )}

        {accountType === "Mechanic" && (
          <>
            <Link
              href="mechanic/profile"
              passHref
              className={`${styles.nav__link} ${
                pathname === "/profile" ? styles.active : ""
              } ${show ? styles.nav__linkscroll : ""}`}
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
