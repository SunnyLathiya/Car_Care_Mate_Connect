"use client";
import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable, { Column } from "material-table";
import { AppDispatch, RootState } from "@/redux/store";
import {
  allorders,
  findCompletedOrders,
} from "@/redux/slices/adminSlices/orderSlice";
import {
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
  Info,
} from "@mui/icons-material";
import { Order } from "@/app/types";
import { format } from "date-fns";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ToastError } from "@/components/common/Toast";
import Loader from "@/components/common/loader";

interface Props {}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DialogContainer = styled.div`
  width: 80%;
  max-width: 800px;
  animation: ${fadeIn} 0.5s;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const DialogTitleStyled = styled(DialogTitle)`
  background-color: #b85042;
  color: #fff;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const DialogContentStyled = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

const Label = styled(Typography)`
  font-weight: bold;
  color: #333;
`;

const Value = styled(Typography)`
  color: #555;
`;

const Orders: React.FC<Props> = () => {
  const { orders, loading, error } = useSelector((state: RootState) => state.order);
  const completedResponse = useSelector(
    (state: RootState) => state.order.completedOrders
  );

  const dispatch: AppDispatch = useDispatch();

  const [display, setDisplay] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    dispatch(allorders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      ToastError(error);
    }
  }, [error]);

  useEffect(() => {
    if (display) {
      dispatch(findCompletedOrders());
    }
  }, [display, dispatch]);

  const openTable = () => {
    setDisplay(true);
  };
  const closeTable = () => {
    setDisplay(false);
  };

  const handleOpen = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const columns: Column<Order>[] = [
    { title: "OrderId", field: "orderId" },
    { title: "Customer Name", field: "customerName" },
    { title: "Car Name", field: "carName" },
    { title: "Car Number", field: "carNumber" },
    { title: "Address", field: "custAddress" },
    { title: "Service Name", field: "serviceName" },
    { title: "Price", field: "servicePrice" },
    { title: "Mechanic Name", field: "mechanicName" },
    {
      title: "Date of Order",
      field: "requestedOn",
      render: (rowData) => format(new Date(rowData.requestedOn), "dd-MM-yyyy"),
    },
    { title: "Order Status", field: "status" },
  ];

  const column: Column<Order>[] = [
    { title: "OrderId", field: "orderId" },
    { title: "Customer Name", field: "customerName" },
    { title: "Car Name", field: "carName" },
    { title: "Car Number", field: "carNumber" },
    { title: "Address", field: "custAddress" },
    { title: "Service Name", field: "serviceName" },
    { title: "Price", field: "servicePrice" },
    { title: "Assigned Mechanic", field: "mechanicId" },
  ];

  const enhancedOrders =
    orders?.map((order: Order, index: number) => ({
      ...order,
      tableData: { id: index },
    })) || [];

  const completedenhancedOrders =
    completedResponse?.map((order: Order, index: number) => ({
      ...order,
      tableData: { id: index },
    })) || [];

  return (
    <div style={{ marginTop: "70px", marginBottom: "20px", marginLeft: "190px" }}>

      { loading ? (<Loader/>)  : 
      (<>
      <br />
      <button onClick={openTable}>See Completed Orders</button>
      <br />

      {enhancedOrders.length > 0 ? (
        <MaterialTable
          title="CURRENT ORDERS DATA"
          columns={columns}
          style={{ backgroundColor: "#E7E8D1" }}
          data={enhancedOrders}
          icons={{
            Clear: forwardRef(() => <Clear style={{ color: "#B85042" }} />),
            Check: forwardRef(() => <Check style={{ color: "#B85042" }} />),
            Delete: forwardRef(() => <Delete style={{ color: "#B85042" }} />),
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
            Search: forwardRef(() => <Search style={{ color: "#B85042" }} />),
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
          actions={[
            {
              icon: () => <Info style={{ color: "#B85042" }} />,
              tooltip: "View Details",
              onClick: (event, rowData) => handleOpen(rowData as Order),
            },
          ]}
        />
      ) : (
        <div>
          <br />
          <h2>NO CURRENT ORDERS RIGHT NOW......</h2>
        </div>
      )}
      <br />
      <br />
      <br />

      {display ? (
        <div>
          <h1>COMPLETED ORDERS</h1>
          <MaterialTable
            title="COMPLETED ORDERS DATA"
            columns={column}
            style={{ backgroundColor: "#E7E8D1" }}
            data={completedenhancedOrders}
            icons={{
              Clear: forwardRef(() => <Clear style={{ color: "#B85042" }} />),
              Check: forwardRef(() => <Check style={{ color: "#B85042" }} />),
              Delete: forwardRef(() => <Delete style={{ color: "#B85042" }} />),
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
              Search: forwardRef(() => <Search style={{ color: "#B85042" }} />),
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
          <br />
          <button onClick={closeTable}>Close Table</button>
          <br />
          <br />
          <br />
        </div>
      ) : null}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitleStyled>Order Details</DialogTitleStyled>
        <DialogContentStyled>
          {selectedOrder && (
            <>
              <Row>
                <Label>Order ID:</Label>
                <Value>{selectedOrder.orderId}</Value>
              </Row>
              <Row>
                <Label>Customer Name:</Label>
                <Value>{selectedOrder.customerName}</Value>
              </Row>
              <Row>
                <Label>Car Name:</Label>
                <Value>{selectedOrder.carName}</Value>
              </Row>
              <Row>
                <Label>Car Number:</Label>
                <Value>{selectedOrder.carNumber}</Value>
              </Row>
              <Row>
                <Label>Address:</Label>
                <Value>{selectedOrder.custAddress}</Value>
              </Row>
              <Row>
                <Label>Service Name:</Label>
                <Value>{selectedOrder.serviceName}</Value>
              </Row>
              <Row>
                <Label>Price:</Label>
                <Value>{selectedOrder.servicePrice}</Value>
              </Row>
              <Row>
                <Label>paymentStatus:</Label>
                <Value>{selectedOrder.paymentStatus}</Value>
              </Row>
              <Row>
                <Label>Mechanic Name:</Label>
                <Value>{selectedOrder.mechanicName}</Value>
              </Row>
              <Row>
                <Label>Date of Order:</Label>
                <Value>
                  {format(new Date(selectedOrder.requestedOn), "dd-MM-yyyy")}
                </Value>
              </Row>
              <Row>
                <Label>Time of order:</Label>
                <Value>
                  {format(new Date(selectedOrder?.requestedOn), "HH:mm:ss")}
                </Value>
              </Row>
              <Row>
                <Label>Status:</Label>
                <Value>{selectedOrder.status}</Value>
              </Row>
              <Row>
                <Label>Date of last update order:</Label>
                <Value>
                  {format(
                    new Date(
                      selectedOrder.lastUpdated || selectedOrder.requestedOn
                    ),
                    "dd-MM-yyyy"
                  )}
                </Value>
              </Row>
              <Row>
                <Label>Time of last update order:</Label>
                <Value>
                  {format(
                    new Date(
                      selectedOrder.lastUpdated || selectedOrder.requestedOn
                    ),
                    "HH:mm:ss"
                  )}
                </Value>
              </Row>
              <Row>
                <Label>MechanicId:</Label>
                <Value>{selectedOrder.Id}</Value>
              </Row>
            </>
          )}
        </DialogContentStyled>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </>)}
    </div>
  );
};

export default Orders;
