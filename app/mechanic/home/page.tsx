"use client"
import { AppDispatch, RootState } from '@/redux/store';
import { FaCartArrowDown, FaClipboardCheck, FaClock, FaHourglassHalf, FaSpinner, FaStar, FaTools, FaUsers } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { allorders } from '@/redux/slices/adminSlices/orderSlice';
// import Notification from '@/components/Notification';

interface CardProps {
  title: string;
  count: number;
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
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const {orders} = useSelector((state: any) => state.order)
  const dispatch: any = useDispatch();

  const token: any = Cookies.get("token");
  const mech: any = jwtDecode(token);
  const mechanicId = mech.id

  const totalProfit = (orders?.filter((order: any) => order.mechanicId === `${mechanicId}` && order.status === "COMPLETED") || []).reduce((sum: number, order: { servicePrice: any; }) => sum + (Number(order.servicePrice) || 0), 0);
  const formattedTotalProfit : any = Number(totalProfit * 0.80).toFixed(2);

  const myTotallOrders = orders?.filter((order: any) => order.mechanicId === `${mechanicId}`).length;
  const newOrders = orders?.filter((order: any) => order.mechanicId === `${mechanicId}` && order.status === "PENDING").length;
  const myComplatedOrders = orders?.filter((order: any) => order.mechanicId === `${mechanicId}` && order.status === "COMPLETED").length;
  const processOrder = orders?.filter((order: any) => order.mechanicId === `${mechanicId}` && order.status === "ACCEPTED").length;




  useEffect(() => {
    dispatch(allorders())
  }, [dispatch]);

    
  return (

    <div style={{ minHeight:"200vh", backgroundColor:"#E7E8D1", overflowX:"hidden"}}>
      {/* <Notification/> */}
    <hr />
    <div style={{marginTop:"150px", textAlign: "center"}}>
    <hr />
    <hr />
    <h1>WELCOME MECHANIC</h1>
    <h1>
      Your Total Earnings:
       {formattedTotalProfit}Rs.
    </h1>
    <hr />
    <hr />
    <div style={{ marginLeft:'180px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>

          <Card title="Total Orders" count={myTotallOrders} icon={<FaCartArrowDown style={{ fontSize: '24px', marginRight: '8px', color: '#B85042' }} />} />
          <Card title="Placed Orders" count={newOrders} icon={<FaClock style={{ fontSize: '24px', color: 'orange' }} />} />
          <Card title="In-Progress Orders" count={processOrder} icon={<FaHourglassHalf style={{ fontSize: '24px', color: 'orange' }} />} />
          <Card title="Completed Orders" count={myComplatedOrders} icon={<FaClipboardCheck style={{ fontSize: '24px', color: 'green' }} />} />
        
    </div>

        
    </div>
    
  </div>
  )
}

export default page
