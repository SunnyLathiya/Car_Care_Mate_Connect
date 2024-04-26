"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import MaterialTable from "material-table";
import { Add, Check, Clear, Delete, ChevronRight, Edit, ArrowUpward, Search, FirstPage, LastPage, ChevronLeft } from "@mui/icons-material";

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token: string | undefined = Cookies.get("token");
      if (token) {
        try {
          const user: any = jwtDecode(token);
          console.log(user)
          const response = await axios.get(`http://localhost:4000/api/v1/mechanic/findmyorders/${user.id}`);
          // console.log(response.data.orders);
          setOrders(response.data.orders);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error("Token is undefined");
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    { title: "OrderId", field: "_id" },
    { title: "Customer Name", field: "customerName" },
    { title: "Car Name", field: "carName" },
    { title: "Car Number", field: "carNumber" },
    { title: "Address", field: "custAddress" },
    { title: "Service Name", field: "serviceName" },
    { title: "Price", field: "servicePrice" },
    { title: "Status", field: "status" },
  ];

  return (
    <div style={{marginTop:"70px", marginBottom:"20px", marginLeft:"200px"}}>
      <MaterialTable
        title="MY ORDERS DATA"
        columns={columns}
        data={orders}
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
    </div>
  );
};

export default MyOrders;
