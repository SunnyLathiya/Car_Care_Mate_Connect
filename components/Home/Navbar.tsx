"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/css/Navbar.module.css";
import Image from "next/image";
import logo from "../../public/next.svg"
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import logo1 from "../../public/logo-black.png";
import logo2 from "../../public/logo-color.png";
import logo3 from "../../public/logo-no-background.png";
import logo4 from "../../public/logo-white.png";
import logo5 from "../../public/logo-color.svg";

function getToken(): string | null {
  const token = Cookies.get('token');

  if (token) {
    return token;
  } else {
    return null;
  }
}


function getAccountTypeFromToken(): string | null {
  const token = getToken();
  console.log("1", token);


  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      console.log("2", decodedToken);
      const accountType = decodedToken.accountType;
      // console.log("3", accountType)
      return accountType as string;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null; 
    }
  } else {
    return null;
  }
}

const handleLogout = () => {
  Cookies.remove('token');
}

const Navbar: React.FC = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(true);
    const [accountType, setAccountType] = useState<string | undefined>("Customer");
  // const accountType = getAccountTypeFromToken();

  const fetchAccountType = async () => {
    try {
      const type = await getAccountTypeFromToken();
      setAccountType(type);
      console.log("<<<",accountType)
    } catch (error) {
      console.error('Error fetching account type:', error);
      // Handle error if necessary
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


  const customerhome = pathname.startsWith('/customer/cushome');
    console.log("logo", logo1.src);
  return (
    <nav className={`${styles.nav} ${show ? styles.nav__scroll : ""}`}>

      {/* <Link href="/signup" passHref> */}
        {/* <Image
          className={styles.nav__logo}
          src={logo3.src}
          width={200}
          height={200}
          // style={{marginTop:"-80px", marginLeft:"40px"}}         
          alt="CARCAREMATECONNECT"
               style={ "isAdmin" ? {marginLeft:"170px", marginTop:"-80px"} : {margin:"auto", marginTop:"-80px",  marginLeft:"40px"}}
          
          /> */}

          <span style={{fontFamily:"Sevillana", color:"#B85042", fontSize:"25px", marginLeft: `${accountType === "Admin" || accountType === "Mechanic" ? "200px": "20px"}`}}> CarCareMateConnect</span>
      {/* </Link> */}
      <div
        className={`${styles.nav__container} ${styles.nav__borderXwidth} ${
            show
              ? `${styles.nav__containerscroll} ${styles.nav__borderXwidthscroll}`
              : styles.nav__borderXwidth
          }`}      
      >

       {!accountType &&<>
        <Link href="/whyus" passHref className={`${styles.nav__link} ${pathname === '/whyus' ? styles.active : ''} ${show ? styles.nav__linkscroll : ''}`}>
            WHY US?
        </Link>
        <Link href="/working" passHref className={`${styles.nav__link} ${pathname === '/working' ? styles.active : ''}  ${show ? styles.nav__linkscroll : ""}`}>
            HOW IT WORKS
        </Link>
        <Link href="/contactus" passHref className={`${styles.nav__link} ${pathname === '/contactus' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`}>
            CONTACT US
        </Link>
        <Link href="/signin" passHref className={`${styles.nav__link} ${pathname === '/signin' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`}>
            LOGIN
        </Link>
        </>}

{accountType === "Customer"  &&  ( <>
  <Link href="/customer/cushome" passHref className={`${styles.nav__link} ${customerhome ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`}>
            HOME
        </Link> 
         <Link href="/customer/mybookings" passHref className={`${styles.nav__link} ${pathname === '/customer/mybookings' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`}>
            MY BOOKINGS
        </Link>
        <Link href="/profile" passHref className={`${styles.nav__link} ${pathname === '/profile' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`}>
            PROFILE
        </Link>
        <Link href="/contactus" passHref className={`${styles.nav__link} ${pathname === '/contactus' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`}>
            CONTACT US
        </Link>
        <Link href="/signin" passHref className={`${styles.nav__link} ${pathname === '/signin' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`} onClick={handleLogout}>
            LOGOUT
        </Link>
        </>
      ) }
      
{accountType === "Admin"  &&   ( <>
  {/* <Link href="/contactus" passHref className={`${styles.nav__link} ${pathname === '/contactus' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`}>
            SUNNY LATHIYA
        </Link> */}
        <Link href="/admin/profile" passHref className={`${styles.nav__link} ${pathname === '/profile' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`}>
            PROFILE
        </Link>
        <Link href="/signin" passHref className={`${styles.nav__link} ${pathname === '/signin' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`} onClick={handleLogout}>
            LOGOUT
        </Link>
</>)}


{accountType === "Mechanic"  && (<>
  {/* <Link href="/contactus" passHref className={`${styles.nav__link} ${pathname === '/contactus' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`}>
            MECHANIC
        </Link> */}
        <Link href="/profile" passHref className={`${styles.nav__link} ${pathname === '/profile' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`}>
            PROFILE
        </Link>
        <Link href="/signin" passHref className={`${styles.nav__link} ${pathname === '/signin' ? styles.active : ''} ${show ? styles.nav__linkscroll : ""}`} onClick={handleLogout}>
            LOGOUT
        </Link>
        </>)}
      </div>
    </nav>

//  <nav className={`${styles.nav} ${show ? styles.nav__scroll : ""}`}>

// <Link href="/signup" passHref>
//   <Image
//     className={styles.nav__logo}
//     src={logo}
//     alt="CARCAREMATECONNECT"
//          style={ "isAdmin" ? {marginLeft:"170px"} : {margin:"auto"}}
    
//     />
// </Link>
// <div
//   className={`${styles.nav__container} ${styles.nav__borderXwidth} ${
//       show
//         ? `${styles.nav__containerscroll} ${styles.nav__borderXwidthscroll}`
//         : styles.nav__borderXwidth
//     }`}      
// >

//  {!accountType &&<> <Link href="/whyus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       WHY US?
//   </Link>
//   <Link href="/working" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       HOW IT WORKS
//   </Link>
//   <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       CONTACT US
//   </Link>
//   <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       LOGIN
//   </Link>
//   </>}

// {accountType === "Customer"  &&  ( <>
// <Link href="/customer/cushome" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       HOME
//   </Link> 
//    <Link href="/customer/mybookings" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       MY BOOKINGS
//   </Link> 
//   <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       CONTACT US
//   </Link>
//   <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       LOGOUT
//   </Link>
//   </>
// ) }

// {accountType === "Admin"  &&   ( <>
// <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       SUNNY LATHIYA
//   </Link>
//   <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       LOGOUT
//   </Link>
// </>)}


// {accountType === "Mechanic"  && (<>
// <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       MECHANIC
//   </Link>
//   <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//       LOGOUT
//   </Link>
//   </>)}
// </div>
// </nav> 


  );
};

export default Navbar;


// "use client"
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import styles from "@/css/Navbar.module.css";
// import Image from "next/image";
// import logo from "../../public/next.svg";

// const Navbar: React.FC = () => {
//   const [show, setShow] = useState(true);
//   const [accountType, setAccountType] = useState<string | undefined>("isCustomer");

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) {
//         setShow(true);
//       } else {
//         setShow(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const token = getCookie("token");

//     if (token) {
//       const decodedToken = decodeToken(token);
//       if (decodedToken) {
//         setAccountType(decodedToken.role);
//       }
//     }
//   }, []);

//   const getCookie = (name: string) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop()?.split(";").shift();
//   };

//   const decodeToken = (token: string) => {
//     try {
//       const decoded = atob(token.split(".")[1]);
//       return JSON.parse(decoded);
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       return null;
//     }
//   };

//   return (
//     <nav className={`${styles.nav} ${show ? styles.nav__scroll : ""}`}>
//       <Link href="/signup" passHref>
//         <Image className={styles.nav__logo} src={logo} alt="CARCAREMATECONNECT" style={accountType === "Admin" ? { marginLeft: "170px" } : { margin: "auto" }} />
//       </Link>
//       <div
//         className={`${styles.nav__container} ${styles.nav__borderXwidth} ${
//           show
//             ? `${styles.nav__containerscroll} ${styles.nav__borderXwidthscroll}`
//             : styles.nav__borderXwidth
//         }`}
//       >
//         {/* bydefault */}
//         {!accountType && (
//           <>
//             <Link href="/whyus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               WHY US?
//             </Link>
//             <Link href="/working" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               HOW IT WORKS
//             </Link>
//             <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               CONTACT US
//             </Link>
//             <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               LOGIN
//             </Link>
//           </>
//         )}

//         {/* isCustomer */}
//         {accountType === "Customer" && (
//           <>
//             <Link href="/customer/cushome" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               HOME
//             </Link>
//             <Link href="/customer/mybookings" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               MY BOOKINGS
//             </Link>
//             <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               CONTACT US
//             </Link>
//             <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               LOGOUT
//             </Link>
//           </>
//         )}

//         {/* isAdmin */}
//         {accountType === "Admin" && (
//           <>
//             <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               SUNNY LATHIYA
//             </Link>
//             <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               LOGOUT
//             </Link>
//           </>
//         )}

//         {/* isMechanic */}
//         {accountType === "Mechanic" && (
//           <>
//             <Link href="/contactus" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               MECHANIC
//             </Link>
//             <Link href="/signin" passHref className={`${styles.nav__link} ${show ? styles.nav__linkscroll : ""}`}>
//               LOGOUT
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
