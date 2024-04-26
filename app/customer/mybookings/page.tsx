"use client"
import { SetStateAction, useEffect, useState } from "react";
import { Card, Grid, CardContent } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import { Typography } from "@material-ui/core";

interface User {
  userId: string;
  email: string;
  name: string;
  id: string;
}

interface Order {
  _id: string;
  status: string;
  carName: string;
  carNumber: string;
  custAddress: string;
  serviceName: string;
  servicePrice: string;
}

const MyBookings = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userD, setUserD] = useState<User | null>(null);

  // console.log(userD)

  useEffect(() => {
    const fetchUser = async () => {
      const token: string | undefined = Cookies.get('token');
      if (token) {
        try {
          const user: any = jwtDecode(token);
          setUserD(user);

          console.log(user)

          const response = await axios.get(`http://localhost:4000/api/v1/customer/findOrders/${user.id}`);
          console.log(response.data.orders)
          setOrders(response.data.orders);
          // console.log("orders", response.data.response);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error("Token is undefined");
      }
    };

    fetchUser();
  }, []);

  const getOrderCards = (order: Order) => {
    return (
      // <Grid item xs={12} sm={12} md={12} lg={12} key={order._id}>
      //   <Card variant="outlined" className="service_card">
      //     <CardContent>
      //       <h1>Your Order Request is {order.status}</h1>
      //       <hr />
      //       <h4>Car : {order.carName}</h4>
      //       <h4>Vehicle Number: {order.carNumber}</h4>
      //       <h4>Address: {order.custAddress}</h4>
      //       <h4>Service Name: {order.serviceName}</h4>
      //       <h4>Service Price: {order.servicePrice}</h4>
      //     </CardContent>
      //   </Card>
      // </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} key={order._id}>
      <Card variant="outlined" className="service_card">
        <CardContent>
          <Typography variant="h5" component="h2" className="status">
            {order.status === 'pending' ? 'Awaiting Confirmation' : 'Confirmed'}
          </Typography>
          <hr className="divider" />
          <Typography variant="subtitle1" className="info">
            <strong>Car:</strong> {order.carName}
          </Typography>
          <Typography variant="subtitle1" className="info">
            <strong>Vehicle Number:</strong> {order.carNumber}
          </Typography>
          <Typography variant="subtitle1" className="info">
            <strong>Address:</strong> {order.custAddress}
          </Typography>
          <Typography variant="subtitle1" className="info">
            <strong>Service Name:</strong> {order.serviceName}
          </Typography>
          <Typography variant="subtitle1" className="info">
            <strong>Service Price:</strong> ${order.servicePrice.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    );
  };

  return (
    // <div className="container">
    //   <h1 className="summary_title">MY BOOKINGS</h1>
    //   {orders.length ? (
    //     <Grid container spacing={4} className="">
    //       {orders.map((order) => getOrderCards(order))}
    //     </Grid>
    //   ) : (
    //     <div>
    //       <br />
    //       <h1>NO BOOKINGS</h1>
    //     </div>
    //   )}
    // </div>
    <div className="container">
    <h1 className="summary_title">MY BOOKINGS</h1>
    {orders.length ? (
      <Grid container spacing={3} className="cards_container">
        {orders.map((order) => getOrderCards(order))}
      </Grid>
    ) : (
      <div className="no_bookings">
        <h1>NO BOOKINGS</h1>
      </div>
    )}
  </div>
  );
};

export default MyBookings;