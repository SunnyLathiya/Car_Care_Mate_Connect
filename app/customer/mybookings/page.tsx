"use client"
import { SetStateAction, useEffect, useState } from "react";
import { Card, Grid, CardContent } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import { Typography } from "@material-ui/core";
import styles from "../../../css/customers/Myorder.module.css";


interface MyOrderComponentProps {
  status: 'PLACED' | 'PENDING' | 'IN-PROCESS' | 'COMPLETED';
}
const MyOrderComponent: React.FC<MyOrderComponentProps> = ({ status }) => {
  // Determine which steps should be active based on the status
  const getActiveSteps = (status: MyOrderComponentProps['status']) => {
    switch (status) {
      case 'PLACED':
        return [styles.step1]; // Only the first step is active
      case 'PENDING':
        return [styles.step1, styles.step2]; // First two steps are active
      case 'IN-PROCESS':
        return [styles.step1, styles.step2, styles.step3]; // First three steps are active
      case 'COMPLETED':
        return [styles.step1, styles.step2, styles.step3, styles.step4]; // All steps are active
      default:
        return []; // No steps are active by default
    }
  };

  const activeSteps = getActiveSteps(status);

  return (
    <div>
      <ul>
        <li className={`${styles.step0} ${activeSteps.includes(styles.step1) ? styles.active : ''}`} id={styles.step1}>
          Placed
        </li>
        <li className={`${styles.step0} ${activeSteps.includes(styles.step2) ? styles.active : ''} text-center`} id={styles.step2}>
          Pending
        </li>
        <li className={`${styles.step0} ${activeSteps.includes(styles.step3) ? styles.active : ''} text-right`} id={styles.step3}>
          In-Process
        </li>
        <li className={`${styles.step0} ${activeSteps.includes(styles.step4) ? styles.active : ''} text-right`} id={styles.step4}>
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
}

// Pending, In-Progress, Complated
const isValidStatus = (status: string): status is MyOrderComponentProps['status'] => {
  return ['PLACED', 'PENDING', 'IN-PROCESS', 'COMPLETED'].includes(status);
};


// const formatDate = (dateString: any): any => {
//   const day = {order.requestedOn}.getUTCDate().toString().padStart(2, '0');
//   const month = (ddd.getUTCMonth() + 1).toString().padStart(2, '0');
//   const year = ddd.getUTCFullYear().toString().slice(-2);

//   console.log("1", day);
//   console.log("2", month);
//   console.log("3", year)

//   return `${day}-${month}-${year}`;
// };

const OrderFullDetails =  ({ order, onClose }: { order: Order; onClose: () => void })  => {

  const status = isValidStatus(order.status) ? order.status : 'PLACED';



  return(
      <div className={styles.card} style={{marginTop:"50px", width:"70%"}}>

<div className="row">
<div className={`col ${styles.title}`} style={{ marginLeft: '50px' }}> Purchase Reciept </div>
<div className={`col ${styles.title} text-right `} style={{ marginRight: '50px' }}> <h3> {order.status} </h3> </div>
</div>
      <div className={styles.info}>
          <div className="row">
              <div className="col-7">
                  <span id={styles.heading}> <b>Date</b></span><br/>
                  <span id={styles.details}>{order.requestedOn}</span>
             </div>
              <div className="col-5 pull-right">
                  <span id={styles.heading}> <b>Order No.</b></span><br/>
                  <span id={styles.details}>{order._id}</span>
              </div>
          </div>      
      </div>      
      <div className={styles.pricing}>
          <div className="row">
              <div className="col-4">
                  <span id={styles.price}><b>CAR NAME:</b></span>
              </div>
              <div className="col-6">
                  <span id={styles.price}>{order.carName}</span>  
              </div>
          </div>
          <div className="row">
              <div className="col-4">
                  <span id={styles.price}> <b>CAR NUMBER:</b> </span>
              </div>
              <div className="col-6">
                  <span id={styles.price}>{order.carNumber}</span>  
              </div>
          </div>
         <div className="row">
              <div className="col-4">
                  <span id={styles.name}> <b>SERVICE NAME:</b> </span>
              </div>
              <div className="col-6">
                  <span id={styles.name}>{order.serviceName} </span>
              </div>
          </div>
          <div className="row">
              <div className="col-4">
                  <span id={styles.name}> <b>ADDRESS:</b> </span>
              </div>
              <div className="col-6">
                  <span id={styles.name}>{order.custAddress} </span>
              </div>
          </div>
      </div>

      <hr style={{marginLeft:"30px", marginRight:"30px"}} />
      <div className={styles.total}>
          <div className="row">
              <div className="col-9"></div>
              <div className="col-3"><big>{order.servicePrice}Rs.</big></div>
          </div>
      </div>
      <div className={styles.tracking}>
          <div className={styles.title}>Tracking Order</div>
      </div>
      <div className={styles.progressTrack}>
          <ul id={styles.progressbar}>
              {/* <li className={`${styles.step0}  ${styles.active}`} id={styles.step1}>Placed</li>
              <li className={`${styles.step0}  ${styles.active}`} id={styles.step2}>Pending</li>
              <li className={`${styles.step0}  ${styles.active}`} id={styles.step3}>In-Process</li>
              <li className={`${styles.step0}  ${styles.active}`} id={styles.step4}>Complated</li> */}

              {/* <li className={`${styles.step0} ${order.status === 'PLACED' ? `${styles.active}` : ''}`} id={styles.step1}>Placed</li>
              <li className={`${styles.step0} ${order.status === 'PENDING' ? `${styles.active} text-center` : (order.status !== 'Complated' ? '' : `${styles.active}`)}`} id={styles.step2}>Pending</li>
              <li className={`${styles.step0} ${order.status === 'IN-PROCESS' ? `${styles.active} text-right` : (order.status === 'Complated' ? `${styles.active}` : '')}`} id={styles.step3}>In-Progress</li>
              <li className={`${styles.step0} ${order.status === 'COMPLETED' ? `${styles.active} text-right` : ''}`} id={styles.step4}>Completed</li> */}


                  <MyOrderComponent status={status} />


          </ul>
      </div>
      <div className={styles.footer}>
          <div className="row">

              <button className="btn btn-primary mt-3" onClick={onClose}>Close</button>
          </div> 
      </div>
   </div>
          )
}

const MyBookings = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userD, setUserD] = useState<User | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // const status = "on the way";

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };
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

  const statusStyle = {
    // color: orders..status === 'pending' ? 'orange' : 'green', // Set color based on status
    fontWeight: 'bold',
    marginBottom: '10px',
    
};

  const dividerStyle = {
    width: '100%',
    height: '1px',
    backgroundColor: '#ccc',
    margin: '10px 0'
};

const infoStyle = {
    marginBottom: '5px'
};

const renderOrderFullDetails = () => {
  if (selectedOrder) {
    return <OrderFullDetails order={selectedOrder} onClose={function (): void {
      throw new Error("Function not implemented.");
    } } />;
  }
  return null;
};

  const getOrderCards = (order: Order) => {
    return (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3} key={order._id}>
         <div onClick={()=>handleOrderClick(order)}>
            <Card variant="outlined" style={{ padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', backgroundColor: 'yellow' }}>
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

  return (
  <div  style={{ backgroundColor: ' #E7E8D1', minHeight: '100vh', padding: '100px' }}>
      <h1 className="summary_title" style={{color:"#B85042"}}>MY BOOKINGS</h1>
      {selectedOrder ? (
        // Display only the selected order details
        <OrderFullDetails order={selectedOrder} onClose={handleCloseOrderDetails} />
      ) : (
        // Display the list of orders as cards
        <Grid container spacing={3} className="cards_container">
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={order._id}>
              <Card
                variant="outlined"
                style={{
                  padding: '10px',
                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                }}
                onClick={() => handleOrderClick(order)}
              >
                <CardContent>
                  <Typography variant="h5" component="h2" style={{color:"#B85042"}}>
                    {order.status}
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
          ))}
        </Grid>
      )}
    </div>
  );
};

export default MyBookings;