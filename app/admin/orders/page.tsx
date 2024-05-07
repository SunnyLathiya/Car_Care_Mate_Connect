"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable, { Column } from "material-table";
import { AppDispatch, RootState } from "@/redux/store";
import { findCompletedOrders, findPlacedOrders, updateOrder } from "@/redux/slices/adminSlices/orderSlice";
import { Check, Clear, Delete, ChevronRight, Edit, ArrowUpward, Search, FirstPage, LastPage, ChevronLeft } from "@mui/icons-material";
import axios from "axios";
import Cookies from 'js-cookie';
// import { lookup } from "dns";

interface Order {
  tableData: any;
  _id: string;
  customerName: string;
  carName: string;
  carNumber: string;
  custAddress: string;
  serviceName: string;
  servicePrice: number;
  mechanicId: string;
}

interface Props {}

const Orders: React.FC<Props> = () => {
  const response = useSelector((state: RootState) => state.order.orders.response);
  const completedResponse = useSelector((state: RootState) => state.order.completedOrders.completedOrder);


  console.log(response)
  console.log(completedResponse)
  const [orders, setOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const dispatch: AppDispatch = useDispatch();


  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [mechanicsLookUp, setMechanicsLookUp] = useState<{ [key: string]: string }>({});

  const authToken = Cookies.get('token');

  // useEffect(() => {
  //   // Fetch mechanic IDs from the API endpoint
  //   axios.get('http://localhost:4000/api/v1/admin/availablemechanics', { headers: { Authorization: `Bearer ${authToken}` } })
  //     .then(response => {
  //       const availableMechanics = response.data.data;

  //       console.log("6", response.data._id)
  //       console.log("7", availableMechanics);

  //       const xyz = availableMechanics.map((item: { _id: any; }) => item._id)

  //       // const updatedMechanicsLookUp = {};

  //       console.log(xyz)
       
  //       setMechanicsLookUp(xyz);

  //     })
  //     .catch(error => {

  //       console.log("9", error)
  //       console.error('Error fetching available mechanics:', error);
  //     });
  // }, []);

  
useEffect(() => {

  axios.get('http://localhost:4000/api/v1/admin/availablemechanics', { 
    headers: { Authorization: `Bearer ${authToken}` } 
  })
  .then(response => {
    const availableMechanics = response.data.data;

    console.log(response.data.data)

    const updatedMechanicsLookUp = availableMechanics.reduce((lookup: { [key: string]: string }, mechanic: { _id: string; id: string }) => {
      lookup[mechanic._id] = mechanic.id;
      return lookup;
    }, {});

    // console.log("lookup", lookup)

    setMechanicsLookUp(updatedMechanicsLookUp);
  })
  .catch(error => {
    console.error('Error fetching available mechanics:', error);
  });
}, []);


  useEffect(() => {
    dispatch(findPlacedOrders());
    if (display) {
      dispatch(findCompletedOrders());
    }
  }, [display, dispatch]);



  // const dynamicMechanicsLookUp: { [key: string]: string } = {
  //   "5f4481fae2fd8a20782f6d82": "Mechanic 1",
  //   "5f448212e2fd8a20782f6d83": "Mechanic 2",
  //   "5f448222e2fd8a20782f6d84": "Mechanic 3",
  //   "662a3883553f4d8ebfdbe2f0": "Mechanic 4",
  // };


  const openTable = () => {
    setDisplay(true);
  };
  const closeTable = () => {
    setDisplay(false);
  };

  const columns: Column<Order>[] = [
    { title: "OrderId", field: "_id", editable: "never" },
    { title: "Customer Name", field: "customerName", editable: "never" },
    { title: "Car Name", field: "carName", editable: "never" },
    { title: "Car Number", field: "carNumber", editable: "never" },
    { title: "Address", field: "custAddress", editable: "never" },
    { title: "Service Name", field: "serviceName", editable: "never" },
    { title: "Price", field: "servicePrice", editable: "never" },
    {
      title: "Assign Mechanic",
      field: "mechanicId",
      // lookup: dynamicMechanicsLookUp,
      lookup:mechanicsLookUp
    },
  ];

  const column: Column<Order>[] = [
    { title: "OrderId", field: "_id" },
    { title: "Customer Name", field: "customerName" },
    { title: "Car Name", field: "carName" },
    { title: "Car Number", field: "carNumber" },
    { title: "Address", field: "custAddress" },
    { title: "Service Name", field: "serviceName" },
    { title: "Price", field: "servicePrice" },
    { title: "Assigned Mechanic", field: "mechanicId" },
  ];


  const handleRowUpdate = async (newRow: Order, oldRow: Order | undefined) => {
    if (oldRow) {
      try {
        await dispatch(updateOrder(newRow));
        setIsError(false);
        setErrorMessages([]);

        console.log("7")
      } catch (error: any) {

        console.log("77")
        
        console.error('Error occurred while updating order:', error);
      }
    }
  };


  const enhancedOrders = response?.map((order: Order, index: number) => ({ ...order, tableData: { id: index } })) || [];
  const completedenhancedOrders = completedResponse?.map((order: Order, index: number) => ({ ...order, tableData: { id: index } })) || [];
  // console.log(enhancedOrders)
  // console.log(completedenhancedOrders)

  return (
    <div style={{marginTop:"70px", marginBottom:"20px", "marginLeft":"190px"}}>
      <br />
      <button onClick={openTable}>See Completed Orders</button>
      <br />

      {enhancedOrders.length > 0 ? (
        <MaterialTable
          title="CURRENT ORDERS DATA"
          columns={columns}
          style={{backgroundColor:"#E7E8D1"}}
          data={enhancedOrders}
          editable={{
            onRowUpdate: handleRowUpdate
          }}
          icons={{
            Check: () => <Check style={{ color: '#B85042' }} />,
            Clear: () => <Clear style={{ color: '#B85042' }} />,
            Delete: () => <Delete style={{ color: '#B85042' }} />,
            DetailPanel: () => <ChevronRight style={{ color: '#B85042' }} />,
            Edit: () => <Edit style={{ color: '#B85042' }} />,
            Export: () => <ArrowUpward style={{ color: '#B85042' }} />,
            Filter: () => <Search style={{ color: '#B85042' }} />,
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
        />) :
        ( <div>
          <br />
          <h2>NO CURRENT ORDERS RIGHT NOW......</h2>
        </div>)
}
      <br />
      <br />
      <br />

      {display ? (
        <div>
          <h1>COMPLETED ORDERS</h1>
          <MaterialTable
            title="COMPLETED ORDERS DATA"
            columns={column}
            style={{backgroundColor:"#E7E8D1"}}
            data={completedenhancedOrders}
            icons={{
              Check: () => <Check style={{ color: '#B85042' }} />,
            Clear: () => <Clear style={{ color: '#B85042' }} />,
            Delete: () => <Delete style={{ color: '#B85042' }} />,
            DetailPanel: () => <ChevronRight style={{ color: '#B85042' }} />,
            Edit: () => <Edit style={{ color: '#B85042' }} />,
            Export: () => <ArrowUpward style={{ color: '#B85042' }} />,
            Filter: () => <Search style={{ color: '#B85042' }} />,
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
          <br />
          <button onClick={closeTable}>Close Table</button>
          <br />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default Orders;
