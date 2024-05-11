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
          const response = await axios.get(`http://localhost:4000/api/v1/mechanic/findmyorders/${user.id}`);
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
          Add: () => <Add style={{ color: '#B85042' }} />,
          Check: () => <Check style={{ color: '#B85042' }} />,
          Clear: () => <Clear style={{ color: '#B85042' }} />,
          Delete: () => <Delete style={{ color: '#B85042' }} />,
          DetailPanel: () => <ChevronRight style={{ color: '#B85042' }} />,
          Edit: () => <Edit style={{ color: '#B85042' }} />,
          Export: () => <ArrowUpward style={{ color: '#B85042' }} />,
          Filter: () => <Search />,
          FirstPage: () => <FirstPage style={{ color: '#B85042' }} />,
          LastPage: () => <LastPage style={{ color: '#B85042' }} />,
          NextPage: () => <ChevronRight style={{ color: '#B85042' }} />,
          PreviousPage: () => <ChevronLeft style={{ color: '#B85042' }} />,
          ResetSearch: () => <Clear style={{ color: '#B85042' }} />,
          Search: () => <Search style={{ color: '#B85042' }} />,
          SortArrow: () => <ArrowUpward/>,
        }}
        options={{
          headerStyle: {
            backgroundColor: "#B85042",
            color: "#FFF",
            zIndex:"0",
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
    </div>
  );
};

export default MyOrders;
