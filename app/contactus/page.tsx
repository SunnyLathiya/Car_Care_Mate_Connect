// "use client"
// import React from "react";
// import styles from "../../css/Contactus.module.css"
// import { Card, CardContent } from "@material-ui/core";

// const Contact: React.FC = () => {
//   return (
//     <div className={`${styles.container}`}>
//       <h1 className={`${styles.textCenter}`}>We're all ears!</h1>
//       <div className={`${styles.contact_details}`}>
//         <div className={`${styles.row_container}`}>
//           <div className={`${styles.row}`}>
//             <div className={`${styles.column}`}>
//               <Card>
//                 <CardContent>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="200"
//                     height="80"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
//                   </svg>
//                   <h2>Call Us</h2>
//                   <h5>+91 9484 497949</h5>
//                 </CardContent>
//               </Card>
//             </div>
//             <div className={`${styles.column}`}>
//               <Card>
//                 <CardContent>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="200"
//                     height="80"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
//                   </svg>
//                   <h2>Our Office</h2>
//                   <h5>Lanet, Surat</h5>
//                 </CardContent>
//               </Card>
//             </div>
//             <div className={`${styles.column}`}>
//               <Card>
//                 <CardContent>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="200"
//                     height="80"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
//                   </svg>
//                   <h2>Send Us Mail</h2>
//                   <h5>sunnylathiya7@gmail.com</h5>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

"use client"
// components/ContactForm.tsx
import React from 'react';
import styles from "@/css/Contactus.module.css"
import '@fortawesome/fontawesome-free/css/all.css';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Typography, TextField, Box, Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { Copyright } from '@mui/icons-material';



const ContactPage: React.FC = () => {
  return (
    <>

    <div className={`${styles.container_body}`}>
      <div className={`${styles.body_container}`}>
      <div className={`${styles.container}`}>
      <div className={styles.titleContainer}> {/* Add this container */}
              <h1 className={styles.pageTitle} style={{color:"#B85042"}}>Contact Us</h1> {/* Title inside the container */}
            </div>
      <div className={`${styles.content}`}>
        <div className={`${styles.left_side}`}>
          <Link href="https://maps.app.goo.gl/P6Ym9oEsPm1hYaRP7" style={{textDecoration:"none"}}>
          <div className={`${styles.address} ${styles.details}`}>
            <i className="fas fa-map-marker-alt"></i>
            <div className={`${styles.topic}`}>Address</div>
            <div className={`${styles.text_one}`}>406, Luxuria Business Hub</div>
            <div className={`${styles.text_two}`}>Lanet, Surat</div>
           
          </div>
          </Link>
          <div className={`${styles.phone} ${styles.details}`}>
            <i className="fas fa-phone-alt"></i>
            <div className={`${styles.topic}`}>Phone</div>
           <a href={`tel:${+919484497949}`}> <div className={`${styles.text_one}`}>+91 9484 497949</div> </a>
            <a href={`tel:${+917777777777}`}> <div className={`${styles.text_two}`}>+01 7777 777777</div></a>
            <a className={`${styles.text_one}`} href={`tel:${+919484497949}`}>{+919484497949}</a>
      <a className={`${styles.text_two}`} href={`tel:${+919484497949}`}>{+919484497949}</a>
          </div>
          <div className={`${styles.email} ${styles.details}`}>
            <i className="fas fa-envelope"></i>
            <div className={`${styles.topic}`}>Email</div>
            <div className={`${styles.text_one}`}>carcaremateconnect7@gmail.com</div>
            <div className={`${styles.text_two}`}>sunnylathiya701@gmail.com</div>
          </div>
        </div>
        <div className={`${styles.right_side}`}>
      <div className={`${styles.responsivemap}`} >

         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.177183860502!2d72.75675999999996!3d21.145345900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d806232a989%3A0xf791a1e083b2bca3!2sLa%20Net%20Team%20Software%20Solutions%20Pvt.%20LTD.!5e0!3m2!1sen!2sin!4v1714670052721!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

      </div>
    </div>
    </div>
    </div>


      <div className={`${styles.container2}`}>

      {/* <h3 className={`${styles.heading}`}>Mailsend</h3>

     
      <form action="https://send.pageclip.co/4TXjjOzblwFCG70FHLQlp3G5FENKMWfS" method="post" >
        <input type="text" name="name" placeholder="Your Name" className={`${styles.inputfield}`} />
        <input type="email" name="email" placeholder="Your Email" className={`${styles.inputfield}`} />
        <input type="text" name="message" placeholder="Your Message" className={`${styles.inputfield}`} />

        <button type="submit" className={`${styles.buttonsubmit}`}>
          <span>Send</span>
        </button>
      </form>  */}

<Typography component="h1" variant="h5" style={{color:"#B85042"}}>
              Send Mail
            </Typography>
            <Box component="form"
           
             sx={{ mt: 1 }}>


<form action="https://send.pageclip.co/4TXjjOzblwFCG70FHLQlp3G5FENKMWfS" method="post" >

<TextField  
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus

                className={`${styles.inputfield}`}
                
              />
             
             <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="message"
                label="Message"
                name="message"
                autoFocus             
              />
              
              <button type='submit' className={`${styles.buttonsubmit}`}>Send</button>

</form>
     </Box>

      </div>

 



      </div>
    </div>

    </>
  );
};

export default ContactPage;


//  <form action="https://send.pageclip.co/4TXjjOzblwFCG70FHLQlp3G5FENKMWfS" method="post" >
// <input type="text" name="name" placeholder="Your Name" />
// <input type="email" name="email" placeholder="Your Email" />
// <input type="text" name="message" placeholder="Your Message" />

// <button type="submit">
//   <span>Send</span>
// </button>
// </form> 
