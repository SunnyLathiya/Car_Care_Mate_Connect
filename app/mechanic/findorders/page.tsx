"use client";
import React, { forwardRef, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import {
  Add,
  Check,
  Clear,
  Delete,
  ChevronRight,
  Edit,
  ArrowUpward,
  Search,
  FirstPage,
  LastPage,
  ChevronLeft,
  ArrowDownward,
  OpenInNew,
} from "@mui/icons-material";
import {
  findMyOrders,
  updateOrder,
} from "@/redux/slices/mechanicSlices/orderManageSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import Axios from "@/redux/APIs/Axios";
import { ToastInfo } from "@/components/common/Toast";
import Loader from "@/components/common/loader";
import { IconButton } from "@material-ui/core";

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
  googleMapsUrl: string;
}
interface NotificationData {
  fcmToken: string;
  customerName: string;
  title: string;
  body: string;
}

const FindOrders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allOrders, loading } = useSelector((state: any) => state.ordermanage);

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
    {
      title: "Location",
      field: "googleMapsUrl",
      editable: "never",
      render: (rowData: { googleMapsUrl: string }) => (
        <IconButton
          color="primary"
          onClick={() => window.open(rowData.googleMapsUrl, "_blank")}
        >
          <OpenInNew />
        </IconButton>
      ),
    },
  ];

  const sendNotification = async ({
    fcmToken,
    customerName,
    title,
    body,
  }: NotificationData): Promise<void> => {
    try {
      const response = await Axios.post("/mechanic/notification", {
        fcmToken,
        customerName,
        title,
        body,
      });

      if (response.status === 200) {
        ToastInfo("Notification Send Successfully!");
      }
    } catch (error: any) {
      throw error;
    }
  };  

  const handleRowUpdate = async (
    newData: Order,
    oldData: Order | undefined
  ): Promise<void> => {
    try {
      dispatch(updateOrder({ id: newData._id, status: newData.status }));

      const fcmToken = newData.fcmToken;
      const customerName = newData.customerName;
      const title = "Order Update";
      const body = `Order ${newData.orderId} status has been updated to ${newData.status}`;

      await sendNotification({ fcmToken, customerName, title, body });
    } catch (error) { throw error}
  };

  const enhancedAllOrders = allOrders?.map((order: Order, index: number) => ({
    ...order,
    tableData: { id: index },
  }));

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              marginTop: "70px",
              marginBottom: "250px",
              marginLeft: "200px",
            }}
          >
            {allOrders?.length > 0 ? (
              <MaterialTable
                title="IN PROCESS ORDERS DATA"
                columns={columns}
                data={enhancedAllOrders}
                editable={{
                  onRowUpdate: handleRowUpdate,
                }}
                icons={{
                  Add: forwardRef(() => <Add style={{ color: "#B85042" }} />),
                  Clear: forwardRef(() => (
                    <Clear style={{ color: "#B85042" }} />
                  )),
                  Check: forwardRef(() => (
                    <Check style={{ color: "#B85042" }} />
                  )),
                  Delete: forwardRef(() => (
                    <Delete style={{ color: "#B85042" }} />
                  )),
                  DetailPanel: forwardRef(() => (
                    <ChevronRight style={{ color: "#B85042" }} />
                  )),
                  Edit: forwardRef(() => <Edit style={{ color: "#B85042" }} />),
                  Export: forwardRef(() => (
                    <ArrowUpward style={{ color: "#B85042" }} />
                  )),
                  Filter: forwardRef(() => <Search />),
                  FirstPage: forwardRef(() => (
                    <FirstPage style={{ color: "#B85042" }} />
                  )),
                  LastPage: forwardRef(() => (
                    <LastPage style={{ color: "#B85042" }} />
                  )),
                  NextPage: forwardRef(() => (
                    <ChevronRight style={{ color: "#B85042" }} />
                  )),
                  PreviousPage: forwardRef(() => (
                    <ChevronLeft style={{ color: "#B85042" }} />
                  )),
                  ResetSearch: forwardRef(() => (
                    <Clear style={{ color: "#B85042" }} />
                  )),
                  Search: forwardRef(() => (
                    <Search style={{ color: "#B85042" }} />
                  )),
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
                    border: "1px solid #A7BEAE",
                  },
                  exportButton: true,
                }}
              />
            ) : (
              <div style={{ marginTop: "150px", marginBottom: "450px" }}>
                <br />
                <h2 style={{ textAlign: "center" }}>
                  NO ASSIGNED ORDERS RIGHT NOW
                </h2>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FindOrders;
