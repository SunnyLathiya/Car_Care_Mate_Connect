"use client";
{
  /* <div style={{position:"relative",width:"88%",overflow:"hidden",backgroundColor:"green", top:"81px", left:"11.5%", zIndex:"-1"}}></div> */
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable, { Column } from "material-table";
import {
  Add,
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
  addService,
  getAllServices,
  deleteService,
  updateService,
} from "@/redux/slices/adminSlices/serviceSlice";
import Loader from "@/components/common/loader";
import { Service } from "@/app/types";

interface ServiceData {
  _id: string;
  name: string;
  price: string;
  description: string;
  timeRequired: string;
  where: string;
  serviceType: string;
}

function Services() {
  const { services } = useSelector((state: RootState) => state.service);

  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ServiceData>({
    _id: "",
    name: "",
    price: "",
    description: "",
    timeRequired: "",
    where: "",
    serviceType: "",
  });

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  console.log("object", services);

  const handleRowAdd = async (newRow: Service) => {
    try {
      if (
        !newRow.name ||
        !newRow.price ||
        !newRow.description ||
        !newRow.timeRequired ||
        !newRow.where
      ) {
        throw new Error("All fields are required");
      }
      setLoading(true);
      await dispatch(addService(newRow));
      setLoading(false);
    } catch (error) {
      console.error("Error occurred while adding new service:", error);
      setLoading(false);
    }
  };

  const handleRowDelete = async (oldRow: Service) => {
    try {
      setLoading(true);
      await dispatch(deleteService(oldRow._id));
      setLoading(false);
    } catch (error) {
      console.error("Error occurred while deleting service:", error);
      setLoading(false);
    }
  };

  const handleRowUpdate = async (
    newRow: Service,
    oldRow: Service | undefined
  ) => {
    if (oldRow) {
      try {
        setLoading(true);
        await dispatch(updateService(newRow));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error occurred while updating car:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const columns: Column<Service>[] = [
    { title: "Name", field: "name" },
    { title: "Price", field: "price" },
    { title: "Description", field: "description" },
    { title: "TimeRequired", field: "timeRequired" },
    { title: "Where", field: "where" },
    { title: "ServiceType", field: "serviceType" },
  ];

  const enhancedServices = services.map(
    (service: Service, index: number) => ({
      ...service,
      tableData: { id: index },
    })
  );
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div style={{ marginTop: "100px", marginLeft: "180px" }}>
        {loading ? (
          <Loader />
        ) : (
          <MaterialTable
            title="SERVICES DATA"
            columns={columns}
            style={{ backgroundColor: "#E7E8D1" }}
            data={enhancedServices}
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
              DetailPanel: () => <ChevronRight style={{ color: "#B85042" }} />,
              Edit: () => <Edit style={{ color: "#B85042" }} />,
              Export: () => <ArrowUpward style={{ color: "#B85042" }} />,
              Filter: () => <Search />,
              FirstPage: () => <FirstPage style={{ color: "#B85042" }} />,
              LastPage: () => <LastPage style={{ color: "#B85042" }} />,
              NextPage: () => <ChevronRight style={{ color: "#B85042" }} />,
              PreviousPage: () => <ChevronLeft style={{ color: "#B85042" }} />,
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
        )}
      </div>
    </div>
  );
}

export default Services;
