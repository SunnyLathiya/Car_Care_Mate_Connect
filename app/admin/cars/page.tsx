"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable, { Column } from "material-table";
import {
  addCar,
  getAllCars,
  deleteCar,
  updateCar,
} from "@/redux/slices/adminSlices/carSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Car } from "@/app/types";
import Loader from "@/components/common/loader";
import {
  Add,
  AddBox,
  ArrowDownward,
  ArrowUpward,
  Cancel,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  Delete,
  DeleteOutline,
  Edit,
  FirstPage,
  LastPage,
  SaveAlt,
  Search,
} from "@mui/icons-material";
import { ToastError } from "@/components/common/Toast";

function Cars() {
  const { cars, loading, error } = useSelector((state: RootState) => state.car);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      ToastError(error);
    }
  }, [error]);

  const handleRowAdd = async (newRow: Car) => {
    await dispatch(addCar(newRow));
  };

  const handleRowDelete = async (oldRow: Car) => {
    try {
      await dispatch(deleteCar(oldRow._id));
    } catch (error: any) {
      throw error;
    }
  };

  const handleRowUpdate = async (newRow: Car, oldRow?: Car) => {
    if (oldRow) {
      try {
        await dispatch(updateCar(newRow));
      } catch (error) {
        throw error;
      }
    }
  };

  const columns: Column<Car>[] = [
    { title: "Name", field: "name" },
    { title: "Brand", field: "brand" },
  ];

  const enhancedCars = cars.map((car: Car, index: number) => ({
    ...car,
    tableData: { id: index },
  }));

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ marginTop: "100px", marginLeft: "180px" }}>
          <MaterialTable
            title="CARS DATA"
            columns={columns}
            style={{ backgroundColor: "#E7E8D1" }}
            data={enhancedCars}
            editable={{
              onRowAdd: handleRowAdd,
              onRowUpdate: handleRowUpdate,
              onRowDelete: handleRowDelete,
            }}
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
                zIndex: 0,
              },
              actionsCellStyle: {
                backgroundColor: "#E7E8D1",
              },
              rowStyle: {
                backgroundColor: "#E7E8D1",
                border: "1px solid #A7BEAE",
              },
            }}
          />
        </div>
      )}
    </>
  );
}

export default Cars;
