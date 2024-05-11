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
    <div className="cars_container" style={{marginTop:"70px", marginLeft:"200px"}}>
      {orders?.length ? (
        <MaterialTable
          title="IN PROCESS ORDERS DATA"
          columns={columns}
          data={orders}
          editable={{
            onRowUpdate: handleRowUpdate,
          }}
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
