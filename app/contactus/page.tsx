"use client";
import React from "react";
import styles from "@/css/Contactus.module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Link from "next/link";
import { Typography, TextField, Box } from "@material-ui/core";

const ContactPage: React.FC = () => {
  return (
    <>
      <div className={`${styles.container_body}`}>
        <div className={`${styles.body_container}`}>
          <div className={`${styles.container}`}>
            <div className={styles.titleContainer}>
              <h1 className={styles.pageTitle} style={{ color: "#B85042" }}>
                Contact Us
              </h1>
            </div>
            <div className={`${styles.content}`}>
              <div className={`${styles.left_side}`}>
                <Link
                  href="https://maps.app.goo.gl/P6Ym9oEsPm1hYaRP7"
                  style={{ textDecoration: "none" }}
                >
                  <div className={`${styles.address} ${styles.details}`}>
                    <i className="fas fa-map-marker-alt"></i>
                    <div className={`${styles.topic}`}>Address</div>
                    <div className={`${styles.text_one}`}>
                      406, Luxuria Business Hub
                    </div>
                    <div className={`${styles.text_two}`}>Lanet, Surat</div>
                  </div>
                </Link>
                <div className={`${styles.phone} ${styles.details}`}>
                  <i className="fas fa-phone-alt"></i>
                  <div className={`${styles.topic}`}>Phone</div>
                  <a href={`tel:${+919484497949}`}>
                    <div className={`${styles.text_one}`}>+91 9484 497949</div>
                  </a>
                  <a href={`tel:${+918469665556}`}>
                    <div className={`${styles.text_two}`}>+91 8469 665556</div>
                  </a>
                </div>
                <div className={`${styles.email} ${styles.details}`}>
                  <i className="fas fa-envelope"></i>
                  <div className={`${styles.topic}`}>Email</div>
                  <div className={`${styles.text_one}`}>
                    <a href="mailto:carcaremateconnect7@gmail.com"> carcaremateconnect7@gmail.com </a>
                  </div>
                  <div className={`${styles.text_two}`}>
                    <a href="mailto:sunnylathiya701@gmail.com"> sunnylathiya701@gmail.com </a>
                  </div>
                </div>
              </div>
              <div className={`${styles.right_side}`}>
                <div className={`${styles.responsivemap}`}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.177183860502!2d72.75675999999996!3d21.145345900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d806232a989%3A0xf791a1e083b2bca3!2sLa%20Net%20Team%20Software%20Solutions%20Pvt.%20LTD.!5e0!3m2!1sen!2sin!4v1714670052721!5m2!1sen!2sin"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.container2}`}>
            <Typography
              component="h1"
              variant="h5"
              style={{ color: "#B85042" }}
            >
              Send Mail
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <form
                action="https://send.pageclip.co/4TXjjOzblwFCG70FHLQlp3G5FENKMWfS"
                method="post"
              >
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

                <button type="submit" className={`${styles.buttonsubmit}`}>
                  Send
                </button>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
