"use client"

{/* <div style={{position:"relative",width:"88%",overflow:"hidden",backgroundColor:"green", top:"81px", left:"11.5%", zIndex:"-1"}}></div> */}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import MaterialTable, { Column } from 'material-table';
import { Add, AddBox, ArrowUpward, Cancel, Check, ChevronLeft, ChevronRight, Clear, Delete, DeleteOutline, Edit, FirstPage, LastPage, SaveAlt, Search } from '@mui/icons-material';
import { RootState, AppDispatch } from '@/redux/store';
import { addService, getAllServices, deleteService, updateService } from '@/redux/slices/adminSlices/serviceSlice';
import { Bounce, toast } from 'react-toastify';
import Loader from '@/components/loader';

interface ServiceData {
  name: string;
  price: string;
  description: string;
  timeRequired: string;
  where: string;
  serviceType: string
}

function Services() {
  // const { services } = useSelector((state: RootState) => state.service);
  const {services} = useSelector((state: RootState) => state.service);
  // console.log(loading);
  // const data = [...servicese]
  // console.log(data);
  
  // console.log(services).
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ServiceData>({ name: '', price: '', description:'', timeRequired:'', where:'', serviceType: '' });

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const handleRowAdd = async (newRow: ServiceData) => {
    try {
      if (!newRow.name || !newRow.price || !newRow.description || !newRow.timeRequired || !newRow.where) {
        throw new Error('All fields are required');
      }
      setLoading(true)
      await dispatch(addService(newRow));
      setLoading(false)
    } catch (error) {
      console.error('Error occurred while adding new service:', error);
      setLoading(false)
    }
  };

  const handleRowDelete = async (oldRow: ServiceData) => {
    try {
      setLoading(true)
      await dispatch(deleteService(oldRow._id));
      setLoading(false)
    } catch (error) {
      console.error('Error occurred while deleting service:', error);
      setLoading(false)
    }
  };

  const handleRowUpdate = async (newRow: ServiceData, oldRow: ServiceData | undefined) => {
    if (oldRow) {
      try {
        setLoading(true)
        await dispatch(updateService(newRow));
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error occurred while updating car:', error);
        
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const columns: Column<ServiceData>[] = [
    { title: 'Name', field: 'name' },
    { title: 'Price', field: 'price' },
    { title: 'Description', field: 'description' },
    { title: 'TimeRequired', field: 'timeRequired' },
    { title: 'Where', field: 'where' },
    { title: 'ServiceType', field: 'serviceType' },
  ];

  const enhancedServices = services.map((service:ServiceData, index: number) => ({ ...service, tableData: { id: index } }));
  return (

  <div style={{marginTop:"100px", marginLeft:"180px"}}>
  { loading ? (<Loader/>) : (
    <MaterialTable
    title="Services Data"
    columns={columns}
    data={ enhancedServices }
    editable={{
      onRowAdd: handleRowAdd,
      onRowUpdate: handleRowUpdate,
      onRowDelete: handleRowDelete,
    }}
    icons={{
      Add: Add,
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
      },
      actionsCellStyle: {
        backgroundColor: "#FFF",
      },
    }}
  />
  )}
</div>
  
);

}

export default Services;
