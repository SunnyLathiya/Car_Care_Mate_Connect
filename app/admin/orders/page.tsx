"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable, { Column } from "material-table";
import { AppDispatch, RootState } from "@/redux/store";
import { findCompletedOrders, findPlacedOrders, updateOrder } from "@/redux/slices/adminSlices/orderSlice";
import { Check, Clear, Delete, ChevronRight, Edit, ArrowUpward, Search, FirstPage, LastPage, ChevronLeft } from "@mui/icons-material";

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



  // useEffect(() => {
  //   dispatch(findPlacedOrders());
  //   dispatch(findCompletedOrders());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(findPlacedOrders());
    if (display) {
      dispatch(findCompletedOrders());
    }
  }, [display, dispatch]);



  const dynamicMechanicsLookUp: { [key: string]: string } = {
    "5f4481fae2fd8a20782f6d82": "Mechanic 1",
    "5f448212e2fd8a20782f6d83": "Mechanic 2",
    "5f448222e2fd8a20782f6d84": "Mechanic 3",
    "662a3883553f4d8ebfdbe2f0": "Mechanic 4",
  };


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
      lookup: dynamicMechanicsLookUp,
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
      } catch (error) {
        console.error('Error occurred while updating order:', error);
      }
    }
  };


  const enhancedOrders = response?.map((order: Order, index: number) => ({ ...order, tableData: { id: index } })) || [];
  const completedenhancedOrders = completedResponse?.map((order: Order, index: number) => ({ ...order, tableData: { id: index } })) || [];
  console.log(enhancedOrders)
  console.log(completedenhancedOrders)

  return (
    <div style={{marginTop:"70px", marginBottom:"20px", "marginLeft":"180px"}}>
      <br />
      <button onClick={openTable}>See Completed Orders</button>
      <br />

      {enhancedOrders.length > 0 ? (
        <MaterialTable
          title="CURRENT ORDERS DATA"
          columns={columns}
          data={enhancedOrders}
          editable={{
            onRowUpdate: handleRowUpdate
          }}
          icons={{
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
            data={completedenhancedOrders}
            icons={{
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
