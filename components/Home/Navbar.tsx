"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/css/Navbar.module.css";
import Image from "next/image";
import logo from "../../public/next.svg"

const Navbar: React.FC = () => {
  const [show, setShow] = useState(true);


  const [userRole,setUserRole] = useState<string | undefined>("isCustomer")

  // const [isCustomer, setIsCustomer] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [isMechanic, setIsMechanic] = useState(false);

  // const userrole = isCustomer;



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
  }, []);

  return (
    <nav className={`${styles.nav} ${show ? styles.nav__scroll : ""}`}>
      <Link href="/signup" passHref>
        <Image
          className={styles.nav__logo}
          src={logo}
          alt="CARCAREMATECONNECT"
               style={ "isAdmin" ? {marginLeft:"170px"} : {margin:"auto"}}
          
          />
      </Link>
      <div
        className={`${styles.nav__container} ${styles.nav__borderXwidth} ${
            show
              ? `${styles.nav__containerscroll} ${styles.nav__borderXwidthscroll}`
              : styles.nav__borderXwidth
          }`}      
      >



{/* bydefault */}
       {!userRole &&<> <Link href="/whyus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            WHY US?
        </Link>
        <Link href="/working" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            HOW IT WORKS
        </Link>
        <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            CONTACT US
        </Link>
        <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            LOGIN
        </Link>
        </>}



{/* isCustomer */}
{userRole === "isCustomer"  &&  ( <>
  <Link href="/customer/cushome" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            HOME
        </Link> 
         <Link href="/customer/mybookings" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            MY BOOKINGS
        </Link> 
        <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            CONTACT US
        </Link>
        <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            LOGOUT
        </Link>
        </>
      ) }
      


{/* isAdmin */}
{userRole === "isAdmin"  &&   ( <>
  <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            SUNNY LATHIYA
        </Link>
        <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            LOGOUT
        </Link>
</>)}


{ }



{/* isMechanic */}
{userRole === "isMechanic"  && (<>
  <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            MECHANIC
        </Link>
        <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
            LOGOUT
        </Link>
        </>)}


      </div>
    </nav>

    
  );
};

export default Navbar;

