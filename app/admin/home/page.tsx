"use client"
import { findCompletedOrdersProfit } from '@/redux/slices/adminSlices/orderSlice';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const page: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const rrr = useSelector((state: RootState) => state.order.totalProfit.totalServicePrice);
    console.log("hello", rrr)
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
      dispatch(findCompletedOrdersProfit());
    }, [dispatch]);


  return (
    <div style={{marginTop:"80px", marginBottom:"20px"}}>
    <hr />
    <div style={{marginTop:"80px", textAlign: "center"}}>

    <h1>WELCOME ADMIN</h1>
    <h1>
      Your Total Earnings: {rrr}.
      {orders
        .map((order) => order.servicePrice)
        .reduce((prev, next) => prev + next, 0)}Rs.
    </h1>
    <hr />
    </div>
  </div>
  )
}

export default page
