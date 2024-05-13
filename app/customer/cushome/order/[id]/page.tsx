"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Grid, TextField, Button } from "@material-ui/core";
import styles from "../../../../../css/customers/Order.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ToastSuccess } from "@/components/common/Toast";

interface User {
  userId: string;
  email: string;
  name: string;
  id: string;
}

interface Service {
  _id: string;
  name: string;
  price: number;
  timeRequired: string;
}

interface Car {
  _id: string;
  name: string;
  brand: string;
}

interface FormValues {
  carNumber: string;
  custAddress: string;
}

const Order: React.FC = () => {
  const router = useRouter();
  const carSelected = useSelector((state: RootState) => state.user.carSelected);
  // console.log("car", carSelected);
  const { id } = useParams();

  // console.log("service", id)
  const [user, setUser] = useState<User | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [car, setCar] = useState<Car | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      const token: string | undefined = Cookies.get("token");
      if (token) {
        const user: any = jwtDecode(token);
        setUser(user);
        console.log("user", user);
        console.log("user id", user.id);
      } else {
        console.error("Token is undefined");
      }
    };

    if (!carSelected || !id) return;
    fetchUser();
    getCar();
    getPackage();
  }, [carSelected, id]);

  const getPackage = () => {
    axios
      .get(`http://localhost:4000/api/v1/admin/findbyserviceid/${id}`)
      .then((response) => {
        setService(response.data.response);
        console.log("package", response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCar = () => {
    axios
      .get(`http://localhost:4000/api/v1/admin/findbycarid/${carSelected}`)
      .then((response) => {
        setCar(response.data.response);
        // console.log("car", response.data.response)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data: any) => {
    // event.preventDefault();

    if (!user || !service || !car) return;

    const formData = new FormData();

    const orderData = {
      customerId: user.userId,
      // customerName: user.name,
      carName: car.name,
      carNumber: data.carNumber,
      custAddress: data.custAddress,
      serviceName: service.name,
      servicePrice: service.price,
    };

    console.log("order data", orderData);

    axios
      .post(
        `http://localhost:4000/api/v1/customer/addorder/${user.id}`,
        orderData
      )
      .then((response) => {
        // Handle successful response here
        console.log("Order placed successfully:", response.data);

        ToastSuccess("New Order Created Successfully");

        router.push("/customer/mybookings");
      })
      .catch((err) => {
        // Handle error here
        console.error("Error placing order:", err);
      });
  };

  return (
    <>
      <div style={{ backgroundColor: "#E7E8D1", height: "100vh" }}>
        <h1
          className={styles.summaryTitle}
          style={{
            marginTop: "80px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          ORDER SUMMARY
        </h1>
        <div
          className={`${styles.container} animated fadeIn`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card style={{ marginTop: "30px" }}>
            <Grid container spacing={3} style={{ marginLeft: "10px" }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <p className={styles.titleSubHeading}>PERSONAL DETAILS</p>
                <h4>Email Id: {user?.email}</h4>
                {/* <h4>Name: user.name</h4> */}
                <h4>Id: {user?.id}</h4>

                <form id="orderForm" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <TextField
                        color="primary"
                        variant="outlined"
                        label="Vehicle Number"
                        margin="normal"
                        {...register("carNumber", {
                          required: "Vehicle Number is required",
                          pattern: {
                            value: /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/,
                            message:
                              "Please enter a valid Indian vehicle number",
                          },
                        })}
                        error={Boolean(errors.carNumber)}
                        helperText={
                          errors.carNumber
                            ? (errors.carNumber.message as React.ReactNode)
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <TextField
                        color="primary"
                        variant="outlined"
                        label="Address"
                        multiline
                        margin="normal"
                        {...register("custAddress", {
                          required: "Address is required",
                          minLength: {
                            value: 5,
                            message:
                              "Address must be at least 5 characters long",
                          },
                        })}
                        error={Boolean(errors.custAddress)}
                        helperText={
                          errors.custAddress
                            ? (errors.custAddress.message as React.ReactNode)
                            : ""
                        }
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "#B85042" }}
                    className={styles.placeOrderButton}
                  >
                    PLACE ORDER
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <p className={styles.titleSubHeading}>SERVICE DETAILS</p>
                <h3>Service Name: {service?.name}</h3>
                <h3>Total Price: {service?.price}</h3>
                <h3>Time Required: {service?.timeRequired}</h3>
                <h3>Selected Car: {car?.name}</h3>
                <h3>Selected Car Brand: {car?.brand}</h3>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Order;
