"use client";
import { SetStateAction, useEffect, useState } from "react";
import { Card, Grid, CardContent } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
} from "@material-ui/core";
import styles from "../../../css/customers/Myorder.module.css";
import moment from "moment";
import { DateRangePicker } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface MyOrderComponentProps {
  status: "PLACED" | "PENDING" | "ACCEPTED" | "COMPLETED";
}
const MyOrderComponent: React.FC<MyOrderComponentProps> = ({ status }) => {
  const getActiveSteps = (status: MyOrderComponentProps["status"]) => {
    switch (status) {
      case "PLACED":
        return [styles.step1];
      case "PENDING":
        return [styles.step1, styles.step2];
      case "ACCEPTED":
        return [styles.step1, styles.step2, styles.step3];
      case "COMPLETED":
        return [styles.step1, styles.step2, styles.step3, styles.step4];
      default:
        return [];
    }
  };

  const activeSteps = getActiveSteps(status);

  return (
    <div>
      <ul>
        <li
          className={`${styles.step0} ${
            activeSteps.includes(styles.step1) ? styles.active : ""
          }`}
          id={styles.step1}
        >
          Initiated
        </li>
        <li
          className={`${styles.step0} ${
            activeSteps.includes(styles.step2) ? styles.active : ""
          } text-center`}
          id={styles.step2}
        >
          Pending
        </li>
        <li
          className={`${styles.step0} ${
            activeSteps.includes(styles.step3) ? styles.active : ""
          } text-right`}
          id={styles.step3}
        >
          Accepted
        </li>
        <li
          className={`${styles.step0} ${
            activeSteps.includes(styles.step4) ? styles.active : ""
          } text-right`}
          id={styles.step4}
        >
          Completed
        </li>
      </ul>
    </div>
  );
};

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
  requestedOn: string;
  mechanicName: string;
  lastUpdated: string;
  orderId: string;
}

const formatDate = (date: any) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
  return `${day}-${month}-${year}`;
};

const isValidStatus = (
  status: string
): status is MyOrderComponentProps["status"] => {
  return ["PLACED", "PENDING", "ACCEPTED", "COMPLETED"].includes(status);
};

const OrderFullDetails = ({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) => {
  const status = isValidStatus(order.status) ? order.status : "PLACED";

  const date: any = moment(order.requestedOn);
  const formattedDate = date.format("DD-MM-YYYY");
  const formattedTime = date.format("HH:mm:ss");

  const dateEnd: any = order.lastUpdated
    ? moment(order.lastUpdated)
    : moment(order.requestedOn);
  const formattedDateLast = dateEnd.format("DD-MM-YYYY");
  const formattedTimeLast = dateEnd.format("HH:mm:ss");

  const orderno = order.orderId;
  const finalOrderId = orderno;

  const handleDownload = () => {
    const htmlContent = document.documentElement.outerHTML;

    const cssStyles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          const cssRules = styleSheet.cssRules || [];
          return Array.from(cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (error) {
          console.warn("Failed to extract CSS rules:", error);
          return "";
        }
      })
      .join("\n");

    const combinedContent = `
      <html>
        <head>
          <title>Downloaded Page</title>
          <style>
            ${cssStyles}
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    const blob = new Blob([combinedContent], { type: "text/html" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.html";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.card} style={{ marginTop: "50px", width: "70%" }}>
      <div className="row">
        <div className={`col ${styles.title}`} style={{ marginLeft: "50px" }}>
          Purchase Reciept
        </div>
        <div
          className={`col ${styles.title} text-right `}
          style={{ marginRight: "50px" }}
        >
          <h3> {order.status} </h3>
        </div>
      </div>
      <div className={styles.info}>
        <div className="row">
          <div className="col-5">
            <span id={styles.heading}>
              <b>Order Date:- </b>
              {formattedDate}
            </span>
            <br />
            <span id={styles.heading}>
              <b>Order Time:- </b>
              {formattedTime}
            </span>
            <br />
          </div>
          <div className="col-7">
            <span id={styles.heading}>
              <b>Update Order Date:- </b>
              {formattedDateLast}
            </span>
            <br />
            <span id={styles.heading}>
              <b>Update Order Time:- </b>
              {formattedTimeLast}
            </span>
            <br />
          </div>
        </div>

        <div className="row">
          <div className="col-7">
            <span id={styles.heading}>
              <b>Order No.:- </b>
              {finalOrderId}
            </span>
            <br />
            <span id={styles.heading}>
              <b>Mechanic Name:- </b>
              {order?.mechanicName}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.pricing}>
        <div className="row">
          <div className="col-4">
            <span id={styles.price}>
              <b>CAR NAME:</b>
            </span>
          </div>
          <div className="col-6">
            <span id={styles.price}>{order.carName}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <span id={styles.price}>
              <b>CAR NUMBER:</b>
            </span>
          </div>
          <div className="col-6">
            <span id={styles.price}>{order.carNumber}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <span id={styles.name}>
              <b>SERVICE NAME:</b>
            </span>
          </div>
          <div className="col-6">
            <span id={styles.name}>{order.serviceName} </span>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <span id={styles.name}>
              <b>ADDRESS:</b>
            </span>
          </div>
          <div className="col-6">
            <span id={styles.name}>{order.custAddress} </span>
          </div>
        </div>
      </div>

      <hr style={{ marginLeft: "30px", marginRight: "30px" }} />
      <div className={styles.total}>
        <div className="row">
          <div className="col-9"></div>
          <div className="col-3">
            <big>{order.servicePrice}Rs.</big>
          </div>
        </div>
      </div>
      <div className={styles.tracking}>
        <div className={styles.title}>Tracking Order</div>
      </div>
      <div className={styles.progressTrack}>
        <ul id={styles.progressbar}>
          <MyOrderComponent status={status} />
        </ul>
      </div>
      <div className={styles.footer}>
        <div className="row">
          <button
            className="btn mt-3"
            style={{ backgroundColor: "#B85042" }}
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="btn mt-3"
            style={{ backgroundColor: "#4CAF50" }}
            onClick={handleDownload}
          >
            Download Invoice{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

const MyBookings = (order: Order) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userD, setUserD] = useState<User | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [dateRange, setDateRange] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedStatus(event.target.value as string);
  };

  const handleDateRangeChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange({
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    });

    console.log("Formatted date range", {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };
  

  useEffect(() => {
    const fetchUser = async () => {
      const token: string | undefined = Cookies.get("token");
      if (token) {
        try {
          const user: any = jwtDecode(token);
          setUserD(user);

          console.log("user", user);

          const response = await axios.get(
            `http://localhost:4000/api/v1/customer/findOrders/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("0", response)
          console.log("response", response);
          setOrders(response.data.orders);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error("Token is undefined");
      }
    };

    fetchUser();
  }, []);


  const statusStyle = {
    // color: orders..status === 'pending' ? 'orange' : 'green', // Set color based on status
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const dividerStyle = {
    width: "100%",
    height: "1px",
    backgroundColor: "#ccc",
    margin: "10px 0",
  };

  const infoStyle = {
    marginBottom: "5px",
  };

  const renderOrderFullDetails = () => {
    if (selectedOrder) {
      return (
        <OrderFullDetails
          order={selectedOrder}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      );
    }
    return null;
  };

  const getOrderCards = (order: Order) => {
    return (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3} key={order._id}>
          <div onClick={() => handleOrderClick(order)}>
            <Card
              variant="outlined"
              style={{
                padding: "10px",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "yellow",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" style={statusStyle}>
                  {order.status}
                </Typography>
                <hr style={dividerStyle} />
                <Typography variant="subtitle1" style={infoStyle}>
                  <strong>Car:</strong> {order.carName}
                </Typography>
                <Typography variant="subtitle1" style={infoStyle}>
                  <strong>Vehicle Number:</strong> {order.carNumber}
                </Typography>
                <Typography variant="subtitle1" style={infoStyle}>
                  <strong>Address:</strong> {order.custAddress}
                </Typography>
                <Typography variant="subtitle1" style={infoStyle}>
                  <strong>Service Name:</strong> {order.serviceName}
                </Typography>
                <Typography variant="subtitle1" style={infoStyle}>
                  <strong>Service Price:</strong> ${order.servicePrice}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </>
    );
  };



  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.requestedOn);
    const isStatusMatch = selectedStatus === 'ALL' || order.status === selectedStatus;
    const isDateInRange = orderDate >= dateRange.startDate && orderDate <= dateRange.endDate;

    if (selectedStatus === 'ALL' && dateRange.startDate && dateRange.endDate) {
      return isDateInRange;
    } else if (selectedStatus !== 'ALL' && (!dateRange.startDate || !dateRange.endDate)) {
      return isStatusMatch;
    } else if (selectedStatus !== 'ALL' && dateRange.startDate && dateRange.endDate) {
      return isStatusMatch && isDateInRange;
    } else {
      return true;
    }

  });
  

  const lastOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  console.log("3", orders)

  return (
    <div
      style={{
        backgroundColor: " #E7E8D1",
        minHeight: "100vh",
        padding: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#B85042" }}>MY BOOKINGS</h1>

        <div style={{ display: "flex", alignItems: "center" }}>

      <div>
      <Button variant="outlined" onClick={toggleDatePicker} style={{right:"20px"}}>
        Select Date Range
      </Button>
      {showDatePicker && (
        <div style={{ position: 'absolute', zIndex: 1000, marginRight:'-100px', right:"150px" }}>
          <DateRangePicker
            ranges={[dateRange]}
            onChange={handleDateRangeChange}
            months={1}
            direction="horizontal"
          />
        </div>
         )}
      </div>


      <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="PLACED">Placed</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="ACCEPTED">Accepted</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </Select>
          </FormControl>

        </div>
      </div>

      {lastOrder && (
        <Card
          variant="outlined"
          style={{
            padding: "20px",
            marginTop: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
          onClick={() => handleOrderClick(lastOrder)}
        >
          <Typography
            variant="h5"
            style={{ color: "#B85042", marginBottom: "10px" }}
          >
            Last Order
          </Typography>
          <Typography variant="body1" style={infoStyle}>
            <b>Status:</b> {lastOrder.status}
          </Typography>
          <Typography variant="body1" style={infoStyle}>
            <b>Date:</b> {moment(lastOrder.requestedOn).format("DD-MM-YYYY")}
          </Typography>
          <Typography variant="body1" style={infoStyle}>
            <b>Time:</b> {moment(lastOrder.requestedOn).format("HH:mm:ss")}
          </Typography>
          <Typography variant="body1" style={infoStyle}>
            <b>Car:</b> {lastOrder.carName}
          </Typography>
          <Typography variant="body1" style={infoStyle}>
            <b>Vehicle Number:</b> {lastOrder.carNumber}
          </Typography>
          <Typography variant="body1" style={infoStyle}>
            <b>Address:</b> {lastOrder.custAddress}
          </Typography>
          <Typography variant="body1" style={infoStyle}>
            <b>Service Name:</b> {lastOrder.serviceName}
          </Typography>
          <Typography variant="body1" style={infoStyle}>
            <b>Service Price:</b> ${lastOrder.servicePrice}
          </Typography>
        </Card>
      )}

      <br />
      <hr />

      {selectedOrder ? (
        <OrderFullDetails
          order={selectedOrder}
          onClose={handleCloseOrderDetails}
        />
      ) : (
        <Grid container spacing={3} className="cards_container">
          {filteredOrders.map((order: any) => {
            const formattedDate = moment(order.requestedOn).format(
              "DD-MM-YYYY"
            );
            const formattedTime = moment(order.requestedOn).format("HH:mm:ss");

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={order._id}>
                <Card
                  variant="outlined"
                  style={{
                    padding: "10px",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOrderClick(order)}
                >
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="h2"
                        style={{ color: "#B85042", fontSize: "1.225rem" }}
                      >
                        {order.status}
                      </Typography>
                    </div>
                    <Typography
                      variant="body1"
                      style={{
                        color: "#000000",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div>
                        <b>Date:-</b> {formattedDate}
                      </div>
                      <div>
                        <b>Time:-</b> {formattedTime}
                      </div>
                    </Typography>
                    <hr />
                    <Typography variant="subtitle1">
                      <strong>Car:</strong> {order.carName}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Vehicle Number:</strong> {order.carNumber}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Address:</strong> {order.custAddress}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Service Name:</strong> {order.serviceName}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Service Price:</strong> ${order.servicePrice}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        
      )}
    </div>
  );
};

export default MyBookings;
