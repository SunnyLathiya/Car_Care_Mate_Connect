"use client"
import React from "react";
import Image from "next/image";
import styles from "@/css/Why.module.css"
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import banner_2 from "../../public/images/banner_2.jpg";
import banner_3 from "../../public/images/banner_3.png";
import banner_4 from "../../public/images/banner_4.png";
import banner_5 from "../../public/images/banner_5.png";

interface Props {}

const WhyUs: React.FC<Props> = () => {
  return (
    <div className={`${styles.component}`}>
      <div className={`${styles.banner}`}>
        <div>
          <Image src={banner_2} alt="LOGO" />
        </div>
        <div className={`${styles.banner__contentRight}`}>
          <br /> <br /> <br />
          <h1 className={`${styles.banner__heading}`}>THE BEST CAR SERVICE AWAITS YOU</h1>
          <br />
          <p className={`${styles.banner__para}`}>
            Your Car deserves nothing but the best car repair and services in
            town. Book a seamless car service experience with us.
          </p>
        </div>
      </div>

      <hr />
      <h1 className={`${styles.banner__heading}`}>The CarCareMateConnect Way</h1>
      <h4 className={`${styles.banner__feature}`}>
        CONVENIENT • TRANSPARENT • QUALITY • RELIABLE
      </h4>
      <hr />

      <div className={`${styles.banner}`}>
        <div className={`${styles.banner__contentLeft}`}>
          <h1 className={`${styles.feature__heading}`}>CONVENIENT</h1>
          <br />
          <h4 className={`${styles.feature__subHeading}`}>Let's stay home & stay safe</h4>
          <p className={`${styles.banner__para}`}>
            That's the best thing you can do right now to keep your loved ones
            safe because staying at home every day keeps Corona away.
          </p>
          <p className={`${styles.points}`}>
            <CheckCircleIcon color="secondary" />
            Service right at your doorstep.
          </p>
          <p className={`${styles.points}`}>
            <CheckCircleIcon color="secondary" /> Online payments. Hassle free
            and safe.
          </p>
          <p className={`${styles.points}`}>
            <CheckCircleIcon color="secondary" />
            Fast delivery. We value your time.
          </p>
        </div>
        <div>
          <Image src={banner_3} alt="WYPE LOGO" />
        </div>
      </div>

      <div className={`${styles.banner}`}>
        <div>
          <Image src={banner_4} alt="WYPE LOGO" />
        </div>
        <div className={`${styles.banner__contentRight}`}>
          <h1 className={`${styles.feature__heading}`}>TRANSPARENT</h1>
          <br />
          <h4 className={`${styles.feature__subHeading}`}>
            To let you enjoy your peace of mind
          </h4>
          <p className={`${styles.banner__para}`}>
            We fix even your trust in car service and repair because we have
            built our business on trust.
          </p>
          <p className={`${styles.points}`}>
            <CheckCircleIcon color="secondary" />
            Up front pricing.
          </p>
          <p className={`${styles.points}`}>
            <CheckCircleIcon color="secondary" /> Service beyond the standards.
          </p>
          <p className={`${styles.points}`}>
            <CheckCircleIcon color="secondary" />
            Real time updates.
          </p>
        </div>
      </div>

      <div className={`${styles.banner}`}>
        <div className={`${styles.banner__contentLeft}`}>
          <h1 className={`${styles.feature__heading}`}>QUALITY</h1>
          <br />
          <h4 className={`${styles.feature__subHeading}`}>It's Our responsibility</h4>
          <p className={`${styles.banner__para}`}>
            We are committed to quality and take car care seriously. Top-notch
            service is our main auto motive.
          </p>
          <p className={`${styles.points}`}>
            <CheckCircleIcon color="secondary" />
            Skilled technicians.
          </p>
          <p className={`${styles.points}`}>
            <CheckCircleIcon color="secondary" /> Genuine spares.
          </p>
          <p className={`${styles.points}`}>
            <CheckCircleIcon color="secondary" />
            Service warranty.
          </p>
        </div>
        <div>
          <Image src={banner_5} alt="WYPE LOGO" />
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
