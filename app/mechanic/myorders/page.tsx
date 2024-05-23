"use client";
import React, { useEffect, forwardRef } from "react";
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
} from "@mui/icons-material";
import Loader from "@/components/common/loader";
import { fetchOrders } from "@/redux/slices/mechanicSlices/orderManageSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Order } from "@/app/types";
import { ToastError } from "@/components/common/Toast";

const MyOrders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mechanicorders, loading, error } = useSelector(
    (state: RootState) => state.ordermanage
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      ToastError(error);
    }
  }, [error]);

  const columns = [
    { title: "OrderId", field: "orderId" },
    { title: "Customer Name", field: "customerName" },
    { title: "Car Name", field: "carName" },
    { title: "Car Number", field: "carNumber" },
    { title: "Address", field: "custAddress" },
    { title: "Service Name", field: "serviceName" },
    { title: "Price", field: "servicePrice" },
    { title: "Status", field: "status" },
  ];

  if (loading) {
    return <Loader />;
  }

  const enhancedAllOrders = mechanicorders?.map(
    (order: Order, index: number) => ({ ...order, tableData: { id: index } })
  );

  return (
    (loading ? (<Loader/>) : (
      <div
      style={{marginTop: "70px", marginBottom: "182px", marginLeft: "200px" }}
    >
      <MaterialTable
        title = "MY ORDERS DATA"
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
      />
    </div>
    ) )
  );
};

export default MyOrders;
