"use client"
import React, { forwardRef, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import { Add, Check, Clear, Delete, ChevronRight, Edit, ArrowUpward, Search, FirstPage, LastPage, ChevronLeft, ArrowDownward } from "@mui/icons-material";
import { findMyOrders, updateOrder } from "@/redux/slices/mechanicSlices/orderManageSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import Loader from "@/components/common/loader";
import Axios from "@/redux/APIs/Axios";
import { ToastError, ToastInfo, ToastSuccess } from "@/components/common/Toast";

interface Order {
  tableData: any;
  _id: string;
  customerName: string;
  carName: string;
  carNumber: string;
  custAddress: string;
  serviceName: string;
  servicePrice: string;
  status: string;
  orderId: string;
  fcmToken: string;
}

interface NotificationData {
  fcmToken: string;
  customerName: string;
  title: string;
  body: string;
}

const FindOrders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allOrders, loading, error } = useSelector((state: any) => state.ordermanage);


  useEffect(() => {
    dispatch(findMyOrders());
  }, [dispatch]);

  const dynamicMechanicsLookUp = {
    ACCEPTED: "ACCEPTED",
    REJECT: "REJECTED",
    COMPLETED: "COMPLETED",
  };

  const columns: Column<Order>[] = [
    { title: "OrderId", field: "orderId", editable: "never" },
    { title: "Customer Name", field: "customerName", editable: "never" },
    { title: "Car Name", field: "carName", editable: "never" },
    { title: "Car Number", field: "carNumber", editable: "never" },
    { title: "Address", field: "custAddress", editable: "never" },
    { title: "Service Name", field: "serviceName", editable: "never" },
    { title: "Price", field: "servicePrice", editable: "never" },
    { title: "Status", field: "status", lookup: dynamicMechanicsLookUp },
  ];

  const sendNotification = async ({ fcmToken, customerName, title, body }: NotificationData): Promise<void> => {

    console.log("111")
    try {
      const response = await Axios.post('/mechanic/notification', {
        fcmToken,
        customerName,
        title,
        body
      });

      console.log("222", response)


      if (response.status === 200) {
        ToastInfo("Notification Send Successfully!")
      }
    } catch (error: any) {
      console.error("333", error)
      console.log("444", error)
      ToastError("Error sending notification:");
    }
  };
  

  const handleRowUpdate = async (newData: Order, oldData: Order | undefined): Promise<void> => {

    try {
       dispatch(updateOrder({ id: newData._id, status: newData.status }));

      const fcmToken = newData.fcmToken;
      const customerName = newData.customerName;
      const title = "Order Update";
      const body = `Order ${newData.orderId} status has been updated to ${newData.status}`;

      console.log("444", fcmToken, customerName, title, body)

      await sendNotification({ fcmToken, customerName, title, body });
    } catch (error) {
    }
  };

  const enhancedAllOrders = allOrders?.map((order: Order, index: number) => ({ ...order, tableData: { id: index } }))

  
  return (
    <div className="cars_container" style={{ marginTop: "70px", marginLeft: "200px" }}>
  {allOrders?.length > 0 ? (
    <MaterialTable
      title="IN PROCESS ORDERS DATA"
      columns={columns}
      data={enhancedAllOrders}
      editable={{
        onRowUpdate: handleRowUpdate,
      }}
      icons={{
        Add: forwardRef(() => <Add style={{ color: '#B85042' }} />),
        Clear: forwardRef(() => <Clear style={{ color: '#B85042' }} />),
        Check: forwardRef(() => <Check style={{ color: '#B85042' }} />),
        Delete: forwardRef(() => <Delete style={{ color: '#B85042' }} />),
        DetailPanel: forwardRef(() => <ChevronRight style={{ color: '#B85042' }} />),
        Edit: forwardRef(() => <Edit style={{ color: '#B85042' }} />),
        Export: forwardRef(() => <ArrowUpward style={{ color: '#B85042' }} />),
        Filter: forwardRef(() => <Search />),
        FirstPage: forwardRef(() => <FirstPage style={{ color: '#B85042' }} />),
        LastPage: forwardRef(() => <LastPage style={{ color: '#B85042' }} />),
        NextPage: forwardRef(() => <ChevronRight style={{ color: '#B85042' }} />),
        PreviousPage: forwardRef(() => <ChevronLeft style={{ color: '#B85042' }} />),
        ResetSearch: forwardRef(() => <Clear style={{ color: '#B85042' }} />),
        Search: forwardRef(() => <Search style={{ color: '#B85042' }} />),
        SortArrow: forwardRef(() => <ArrowDownward />),
      }}
      options={{
        headerStyle: {
          backgroundColor: "#B85042",
          color: "#FFF",
          zIndex: "0",
        },
        actionsCellStyle: {
          backgroundColor: "#E7E8D1",
        },
        rowStyle: {
          backgroundColor: "#E7E8D1",
          border: '1px solid #A7BEAE'
        },
        exportButton: true,
      }}
    />
  ) : (
    <div style={{marginTop:"150px", marginBottom:"450px"}}>
      <br />
      <h2 style={{textAlign: "center"}}> NO ASSIGNED ORDERS RIGHT NOW </h2>
    </div>
  )}
</div>

  );
};

export default FindOrders;

