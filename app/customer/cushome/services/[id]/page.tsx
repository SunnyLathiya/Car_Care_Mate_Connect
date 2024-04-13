"use client"
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
// import Package from "../../services/member/package/package_services";
import { useRouter } from "next/router";
import styles from "@/css/customers/Services.module.css"

interface Service {
  _id: string;
  name: string;
  price: number;
  description: string;
  serviceType: number;
  where: number;
  timeRequired: string;
}

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Services: React.FC = () => {
//   const router = useRouter();
//   const { car } = router.query;

  const classes = useStyles();
  const [services, setServices] = useState<Service[]>([]);

//   useEffect(() => {
//     Package.getAllServices()
//       .then((response: Service[]) => {
//         setServices(response);
//       })
//       .catch((err: Error) => {
//         console.log(err);
//       });
//   }, []);

  const getServiceCards = (service: Service): JSX.Element => {
    const type = service.serviceType === 1 ? "Car Care Services" : "Periodic Car Service";
    const where = service.where === 1 ? "Free Pickup & Drop" : "Service @ Doorstep";

    return (
      <Grid item xs={12} sm={12} md={6} lg={6} key={service._id}>
        <Card
          className={`${styles.service_card}`}
          variant="outlined"
        //   onClick={() =>
        //     router.push(`/cust_home/order/car/${car}/service/${service._id}`)
        //   }
        >
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {type}
            </Typography>
            <Typography variant="h5" component="h2">
              {service.name}
            </Typography>
            <Typography component="h6">{service.price}</Typography>
            <Typography variant="body2" component="p">
              {service.description}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {where}
            </Typography>
            <hr />
            <div className={`${styles.action_buttons}`}>
              <span className="timeline">
                {`service done in ${service.timeRequired}`}
              </span>
              <button className={`${styles.buy_button}`}>Buy</button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div className="container">
      <button
    //    onClick={() => router.push(`/cust_home`)}
       >Change Car</button>
      <hr />
      <Grid container spacing={5} className="grid_container">
        {services.map((service) => getServiceCards(service))}
      </Grid>
    </div>
  );
};

export default Services;
