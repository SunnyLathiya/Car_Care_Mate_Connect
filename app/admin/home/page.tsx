"use client"
import { allorders, findCompletedOrders, findCompletedOrdersProfit } from '@/redux/slices/adminSlices/orderSlice';
import { AppDispatch, RootState } from '@/redux/store';
// import  Card  from '@mui/material';
import { FaCartArrowDown, FaClipboardCheck, FaClock, FaHourglassHalf, FaSpinner, FaStar, FaTools, FaUsers } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { findInProcessOrders } from '@/redux/slices/mechanicSlices/orderManageSlice';
import { allUsers } from '@/redux/slices/userSlice';

interface CardProps {
  title: string;
  count: number; // Assuming count is a number, adjust the type as needed
  icon:any;
}

const Card: React.FC<CardProps> = ({ title, count, icon }:any) => {
  return (
    <div style={{ width: '250px', height:'150px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
    {icon}
    <hr />
    <h2 style={{ fontSize: '18px', marginBottom: '10px', color:"#A7BEAE" }}>{title}</h2>
    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#B85042' }}>{count}</p>
  </div>
  );
};

const page: React.FC = () => {
    // const [orders, setOrders] = useState<any[]>([]);
    const order : any = useSelector((state: RootState) => state.order);
    const peoples : any = useSelector((state: RootState) => state.user)

    console.log("7777", order);


    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
      dispatch(findCompletedOrders());
      dispatch(findCompletedOrdersProfit());
      dispatch(allorders());
      dispatch(allUsers())
    }, [dispatch]);

    const totalcomplatedorder = order?.completedOrders.completedOrder?.length;
    const totalorders = order?.orders.response?.length;
    const InProcessOrders = Array.isArray(peoples?.user)? order?.orders.response?.filter((item: { status: string; }) => item.status === "IN-PROCESS").length : 0;
    const placedOrders = Array.isArray(peoples?.user)? order?.orders.response?.filter((item: { status: string; }) => item.status === "PLACED").length : 0;
 // const totalCustomer = peoples?.user?.filter((item: {accountType: string}) => item.accountType === "Customer")?.length || 0;
    const totalCustomer = Array.isArray(peoples?.user)? peoples.user.filter((item: {accountType: string}) => item.accountType === "Customer").length: 0;
    const totalMechanics = Array.isArray(peoples?.user)? peoples.user.filter((item: {accountType: string}) => item.accountType === "Mechanic")?.length : 0;
    const totalAvailableMechanics = Array.isArray(peoples?.user)? peoples.user.filter((item: {status: string; accountType: string}) => item.accountType == "Mechanic" && item.status === "AVAILABLE").length : 0;
    const totalCustomersWithOrders = Array.isArray(peoples?.user)? peoples.user.filter((item: { accountType: string; orders: any[]; }) => (item.accountType === "Customer" && item.orders && item.orders.length > 0 && (item.orders).length > 2)).length: 0;


  
    // console.log(totalorders);
    console.log("totalCustomersWithOrders", totalCustomersWithOrders);
    console.log("placedOrders", placedOrders)



  return (
    <div style={{ minHeight:"200vh", backgroundColor:"#E7E8D1", overflowX:"hidden"}}>
    <hr />
    <div style={{marginTop:"150px", textAlign: "center"}}>
    <hr />
    <hr />
    <h1>WELCOME ADMIN</h1>
    <h1>
      Your Total Earnings: .
      {/* {orders
        .map((order: { servicePrice: any; }) => order.servicePrice)
        .reduce((prev: any, next: any) => prev + next, 0)}Rs. */}
        {order.totalProfit.totalServicePrice}Rs.
    </h1>
    <hr />
    <hr />
    <div style={{ marginLeft:'180px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <Card title="Total Orders" count={totalorders} icon={<FaCartArrowDown style={{ fontSize: '24px', marginRight: '8px', color: '#B85042' }} />} />
          <Card title="Completed Orders" count={totalcomplatedorder} icon={<FaClock style={{ fontSize: '24px', color: 'orange' }} />} />
          <Card title="In-Progress Orders" count={InProcessOrders} icon={<FaClipboardCheck style={{ fontSize: '24px', color: 'green' }} />} />
          <Card title="Placed Orders" count={placedOrders} icon={<FaHourglassHalf style={{ fontSize: '24px', color: 'orange' }} />} />
          <Card title="Total Mechanics" count={totalMechanics} icon={<FaUsers style={{ fontSize: '24px', marginRight: '8px' }} />} />
          <Card title="Available Mechanics" count={totalAvailableMechanics} icon={<FaTools style={{ fontSize: '24px', marginRight: '8px' }} />} />
          <Card title="Total Customers" count={totalCustomer} icon={<FaUsers style={{ fontSize: '24px', marginRight: '8px' }} />} />
          <Card title="Total * Customers" count={totalCustomersWithOrders} icon={ <FaStar style={{ fontSize: '24px', color: 'gold' }} />} />
        </div>
        
    </div>
    
  </div>
  )
}

export default page
