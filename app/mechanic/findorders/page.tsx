"use client"
import React, { useState, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Add, Check, Clear, Delete, ChevronRight, Edit, ArrowUpward, Search, FirstPage, LastPage, ChevronLeft } from "@mui/icons-material";

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
}

const FindOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userD, setUserD] = useState<any>();

  useEffect(() => {
    const fetchOrders = async () => {
      const token: string | undefined = Cookies.get("token");
      console.log(token)
      if (token) {
        try {
          const user: any = jwtDecode(token);
          console.log(user)
          setUserD(user);
          const response = await axios.get(`http://localhost:4000/api/v1/mechanic/findInprocessorders/${user.id}`);
          setOrders(response.data.response);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error("Token is undefined");
      }
    };

    fetchOrders();
  }, []);

  const dynamicMechanicsLookUp = {
    ACCEPTED: "ACCEPTED",
    REJECT: "REJECTED",
    COMPLETED: "COMPLETED",
  };

  const columns: Column<Order>[] = [
    { title: "OrderId", field: "_id", editable: "never" },
    { title: "Customer Name", field: "customerName", editable: "never" },
    { title: "Car Name", field: "carName", editable: "never" },
    { title: "Car Number", field: "carNumber", editable: "never" },
    { title: "Address", field: "custAddress", editable: "never" },
    { title: "Service Name", field: "serviceName", editable: "never" },
    { title: "Price", field: "servicePrice", editable: "never" },
    { title: "Status", field: "status", lookup: dynamicMechanicsLookUp },
  ];

  const handleRowUpdate = async (newData: Order, oldData: Order | undefined): Promise<void> => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/v1/mechanic/updateorder/${newData._id}`, { status: newData.status });
      const dataUpdate = [...orders];
      const index = oldData ? oldData.tableData.id : 0;
      dataUpdate[index] = newData;
      setOrders([...dataUpdate]);
    } catch (error) {
      console.error("Update failed! Server error");
    }
  };


  return (
    <div className="cars_container" style={{marginTop:"70px", marginBottom:"20px", marginLeft:"200px"}}>
      {orders.length ? (
        <MaterialTable
          title="IN PROCESS ORDERS DATA"
          columns={columns}
          data={orders}
          editable={{
            onRowUpdate: handleRowUpdate,
          }}
          icons={{
            Add: Add,
            Check: Check,
            Clear: Clear,
            Delete: Delete,
            DetailPanel: ChevronRight,
            Edit: Edit,
            Export: ArrowUpward,
            Filter: Search,
            FirstPage: FirstPage,
            LastPage: LastPage,
            NextPage: ChevronRight,
            PreviousPage: ChevronLeft,
            ResetSearch: Clear,
            Search: Search,
            SortArrow: ArrowUpward,
          }}
          options={{
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
              zIndex:"0",
            },
            exportButton: true,
          }}
        />
     ) : (
        <div>
          <br />
          <h2>&nbsp;&nbsp;NO ASSIGNED ORDERS RIGHT NOW</h2>
        </div>
      )}
    </div>
  );
};

export default FindOrders;
