"use client";
import {
  allorders,
  findCompletedOrdersProfit,
} from "@/redux/slices/adminSlices/orderSlice";
import styles from "@/css/admin/AdminHome.module.css";
import { AppDispatch, RootState } from "@/redux/store";
import {
  FaCartArrowDown,
  FaClipboardCheck,
  FaClock,
  FaHourglassHalf,
  FaStar,
  FaTools,
  FaUsers,
} from "react-icons/fa";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { allUsers } from "@/redux/slices/userSlice";

interface CardProps {
  title: string;
  count: number;
  icon: any;
}

const Card: React.FC<CardProps> = ({ title, count, icon }: any) => {
  return (
    <div className={styles.cardContainer}>
      {icon}
      <hr />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.count}>{count}</p>
    </div>
  );
};

const page: React.FC = () => {
  const order: any = useSelector((state: RootState) => state.order);
  const peoples: any = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(findCompletedOrdersProfit());
    dispatch(allorders());
    dispatch(allUsers());
  }, [dispatch]);

  const totalcomplatedorder = Array.isArray(peoples?.user)
    ? order?.orders?.filter(
        (item: { status: string }) => item.status === "COMPLETED"
      ).length
    : 0;

  const PENDING = Array.isArray(peoples?.user)
    ? order?.orders?.filter(
        (item: { status: string }) => item.status === "PENDING"
      ).length
    : 0;

  const totalorders = order?.orders?.length;

  const InProcessOrders = Array.isArray(peoples?.user)
    ? order?.orders?.filter(
        (item: { status: string }) => item.status === "ACCEPTED"
      ).length
    : 0;
  const placedOrders = Array.isArray(peoples?.user)
    ? order?.orders?.filter(
        (item: { status: string }) => item.status === "PLACED"
      ).length
    : 0;
  const totalCustomer = Array.isArray(peoples?.user)
    ? peoples.user.filter(
        (item: { accountType: string }) => item.accountType === "Customer"
      ).length
    : 0;
  const totalMechanics = Array.isArray(peoples?.user)
    ? peoples.user.filter(
        (item: { accountType: string }) => item.accountType === "Mechanic"
      )?.length
    : 0;
  const totalAvailableMechanics = Array.isArray(peoples?.user)
    ? peoples.user.filter(
        (item: { status: string; accountType: string }) =>
          item.accountType == "Mechanic" && item.status === "AVAILABLE"
      ).length
    : 0;
  const totalCustomersWithOrders = Array.isArray(peoples?.user)
    ? peoples.user.filter(
        (item: { accountType: string; orders: any[] }) =>
          item.accountType === "Customer" &&
          item.orders &&
          item.orders.length > 0 &&
          item.orders.length > 2
      ).length
    : 0;

  return (
    <div className={styles.mainContainer}>
      <hr />
      <div className={styles.containerTitle}>
        <hr />
        <hr />
        <h1>WELCOME ADMIN</h1>
        <h1>
          Your Total Earnings:
          {(0.2 * order.totalProfit.totalServicePrice).toFixed(2)} Rs.
        </h1>
        <hr />
        <hr />
        <div className={styles.card}>
          <Card
            title="Total Orders"
            count={totalorders}
            icon={<FaCartArrowDown className={styles.totalorders} />}
          />
          <Card
            title="Completed Orders"
            count={totalcomplatedorder}
            icon={<FaClock className={styles.totalcomplatedorder} />}
          />
          <Card
            title="In-Progress Orders"
            count={InProcessOrders}
            icon={<FaClipboardCheck className={styles.InProcessOrders} />}
          />
          <Card
            title="Placed Orders"
            count={placedOrders}
            icon={<FaHourglassHalf className={styles.placedOrders} />}
          />
          <Card
            title="Total Mechanics"
            count={totalMechanics}
            icon={<FaUsers className={styles.totalMechanics} />}
          />
          <Card
            title="Available Mechanics"
            count={totalAvailableMechanics}
            icon={<FaTools className={styles.totalAvailableMechanics} />}
          />
          <Card
            title="Total Customers"
            count={totalCustomer}
            icon={<FaUsers className={styles.totalCustomer} />}
          />
          <Card
            title="Total * Customers"
            count={totalCustomersWithOrders}
            icon={<FaStar className={styles.totalCustomersWithOrders} />}
          />
        </div>
      </div>
    </div>
  );
};

export default page;