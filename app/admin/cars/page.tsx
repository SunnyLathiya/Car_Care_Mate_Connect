"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable, { Column } from "material-table";
import {
  Add,
  AddBox,
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
import { RootState, AppDispatch } from "@/redux/store";
import {
  addCar,
  getAllCars,
  deleteCar,
  updateCar,
} from "@/redux/slices/adminSlices/carSlice";
import { ToastInfo } from "@/components/common/Toast";
import Loader from "@/components/common/loader";
import { Car } from "@/app/types";

function Cars() {
  const { cars, loading } = useSelector((state: RootState) => state.car);
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "", brand: "", _id: "" });

  useEffect(() => {
    dispatch(getAllCars());
    console.log("loading", loading);
  }, [dispatch]);

  const handleRowAdd = async (newRow: Car) => {
    try {
      if (!newRow.name || !newRow.brand) {
        throw new Error("Name and brand are required.");
      }

      await dispatch(addCar(newRow));
    } catch (error) {
      console.error("Error occurred while adding car:", error);
    }
  };

  const handleRowDelete = async (oldRow: Car) => {
    try {
      await dispatch(deleteCar(oldRow._id)); // Pass the carId to deleteCar action
    } catch (error) {
      console.error("Error occurred while deleting car:", error);
    }
  };

  const handleRowUpdate = async (newRow: Car, oldRow: Car | undefined) => {
    if (oldRow) {
      try {
        await dispatch(updateCar(newRow));
      } catch (error) {
        console.error("Error occurred while updating car:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
                Add: () => <Add style={{ color: "#B85042" }} />,
                Check: () => <Check style={{ color: "#B85042" }} />,
                Clear: () => <Clear style={{ color: "#B85042" }} />,
                Delete: () => <Delete style={{ color: "#B85042" }} />,
                DetailPanel: () => (
                  <ChevronRight style={{ color: "#B85042" }} />
                ),
                Edit: () => <Edit style={{ color: "#B85042" }} />,
                Export: () => <ArrowUpward style={{ color: "#B85042" }} />,
                Filter: () => <Search style={{ color: "#B85042" }} />,
                FirstPage: () => <FirstPage style={{ color: "#B85042" }} />,
                LastPage: () => <LastPage style={{ color: "#B85042" }} />,
                NextPage: () => <ChevronRight style={{ color: "#B85042" }} />,
                PreviousPage: () => (
                  <ChevronLeft style={{ color: "#B85042" }} />
                ),
                ResetSearch: () => <Clear style={{ color: "#B85042" }} />,
                Search: () => <Search style={{ color: "#B85042" }} />,
                SortArrow: () => <ArrowUpward />,
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
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Cars;
