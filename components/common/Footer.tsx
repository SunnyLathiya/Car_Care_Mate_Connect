import React from 'react'
import styles from "@/css/Footer.module.css";

const Footer = () => {
  return (
    <>
    <div className={`${styles.footer}`}>
       <h6>&copy; {new Date().getFullYear()} Copyright: Made By Sunny Lathiya</h6>
    </div>
</>
  )
}

export default Footer
