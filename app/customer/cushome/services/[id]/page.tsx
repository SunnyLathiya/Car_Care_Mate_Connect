"use client";
import React, { useEffect, useState, MouseEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button, Grid, Menu, MenuItem } from "@material-ui/core";
import styles from "@/css/customers/Services.module.css";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setCarSelected } from "@/redux/slices/userSlice";
import { getAllServices } from "@/redux/slices/adminSlices/serviceSlice";

interface Service {
  _id: string;
  name: string;
  price: number;
  description: string;
  serviceType: string;
  where: string;
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
  const classes = useStyles();
  const { services } = useSelector((state: RootState) => state.service);
  const router = useRouter();

  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  const [filter, setFilter] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuLabel, setMenuLabel] = useState<string>("Service Process");

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(setCarSelected(id));
    }
  }, [id, dispatch]);

  const handleBuyClick = (serviceId: string) => {
    router.push(`/customer/cushome/order/${serviceId}`);
  };

  const getServiceCards = (service: Service): JSX.Element => {
    return (
      <Grid item xs={12} sm={12} md={6} lg={6} key={service._id}>
        <Card className={styles.service_card} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {service.serviceType}
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
              {service.where}
            </Typography>
            <hr />
            <div className={styles.action_buttons}>
              <span className="timeline">
                {`service done in ${service.timeRequired}`}
              </span>
              <button
                className={styles.buy_button}
                onClick={() => handleBuyClick(service._id)}
              >
                Buy
              </button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const filteredService = filter
    ? services.filter((item: any) => item.where === filter)
    : services;
  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (filterOption: string | null) => {
    setFilter(filterOption);
    setMenuLabel(filterOption ? filterOption : "Service Process");
    setAnchorEl(null);
  };

  return (
    <div className={styles.servicecontainer}>
      <div className={styles.servicediv}>
        <button
          className={styles.changeCarButton}
          onClick={() => router.push(`/customer/cushome`)}
        >
          Change Car
        </button>
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            className={styles.menuButton}
          >
            {menuLabel}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose(null)}
          >
            <MenuItem onClick={() => handleMenuClose(null)}>ALL</MenuItem>
            <MenuItem onClick={() => handleMenuClose("HOME")}>HOME</MenuItem>
            <MenuItem onClick={() => handleMenuClose("Service DoorStep")}>
              Service DoorStep
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose("Free Pickup & Drop")}>
              Free Pickup & Drop
            </MenuItem>
          </Menu>
        </div>
      </div>
      <hr />
      <Grid container spacing={5} className="grid_container">
        {filteredService.map((item: any) => getServiceCards(item))}
      </Grid>
    </div>
  );
};

export default Services;
