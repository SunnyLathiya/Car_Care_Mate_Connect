"use client";
import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
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
  Info,
  OpenInNew,
} from "@mui/icons-material";
import Loader from "@/components/common/loader";
import { fetchOrders } from "@/redux/slices/mechanicSlices/orderManageSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Order } from "@/app/types";
import { ToastError } from "@/components/common/Toast";
import { format } from "date-fns";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

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

const MyOrders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mechanicorders, loading, error } = useSelector(
    (state: RootState) => state.ordermanage
  );

  const [open, setOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      ToastError(error);
    }
  }, [error]);

  const handleOpen = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const columns = [
    { title: "OrderId", field: "orderId" },
    { title: "Customer Name", field: "customerName" },
    { title: "Car Name", field: "carName" },
    { title: "Car Number", field: "carNumber" },
    { title: "Address", field: "custAddress" },
    { title: "Service Name", field: "serviceName" },
    { title: "Price", field: "servicePrice" },
    { title: "Status", field: "status" },
    {
      title: "Location",
      field: "googleMapsUrl",
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

  const enhancedAllOrders = mechanicorders?.map(
    (order: Order, index: number) => ({ 
      ...order, 
      tableData: { id: index },
      googleMapsUrl: order.googleMapsUrl || '' 
    })
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ marginTop: "70px", marginBottom: "182px", marginLeft: "200px" }}>
          <MaterialTable
            title="MY ORDERS DATA"
            columns={columns}
            data={enhancedAllOrders}
            icons={{
              Add: forwardRef(() => <Add style={{ color: "#B85042" }} />),
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
              LastPage: forwardRef(() => <LastPage style={{ color: "#B85042" }} />),
              NextPage: forwardRef(() => (
                <ChevronRight style={{ color: "#B85042" }} />
              )),
              PreviousPage: forwardRef(() => (
                <ChevronLeft style={{ color: "#B85042" }} />
              )),
              ResetSearch: forwardRef(() => <Clear style={{ color: "#B85042" }} />),
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
                onClick: (event, rowData: any) => handleOpen(rowData),
              },
            ]}
          />
        </div>
      )}

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
                <Label>Payment Status:</Label>
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
                <Label>Time of Order:</Label>
                <Value>
                  {format(new Date(selectedOrder.requestedOn), "HH:mm:ss")}
                </Value>
              </Row>
              <Row>
                <Label>Status:</Label>
                <Value>{selectedOrder.status}</Value>
              </Row>
              <Row>
                <Label>Date of Last Update:</Label>
                <Value>
                  {format(
                    new Date(selectedOrder.lastUpdated || selectedOrder.requestedOn),
                    "dd-MM-yyyy"
                  )}
                </Value>
              </Row>
              <Row>
                <Label>Time of Last Update:</Label>
                <Value>
                  {format(
                    new Date(selectedOrder.lastUpdated || selectedOrder.requestedOn),
                    "HH:mm:ss"
                  )}
                </Value>
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
    </>
  );
};

export default MyOrders;
