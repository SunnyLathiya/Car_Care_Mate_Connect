"use client"

{/* <div style={{position:"relative",width:"88%",overflow:"hidden",backgroundColor:"green", top:"81px", left:"11.5%", zIndex:"-1"}}></div> */}

import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable, { Column } from 'material-table';
import { Add, ArrowDownward, ArrowUpward, Cancel, Check, ChevronLeft, ChevronRight, Clear, Delete, DeleteOutline, Edit, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';
import { RootState, AppDispatch } from '@/redux/store';
import { addService, getAllServices, deleteService, updateService } from '@/redux/slices/adminSlices/serviceSlice';
import Loader from '@/components/common/loader';
import { ToastError } from '@/components/common/Toast';

interface ServiceData {
  _id: string;
  name: string;
  price: string;
  description: string;
  timeRequired: string;
  where: string;
  serviceType: string
}

function Services() {
  const {services, loading, error} = useSelector((state: RootState) => state.service);
  
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<ServiceData>({_id:'', name: '', price: '', description:'', timeRequired:'', where:'', serviceType: '' });


  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      ToastError(error);
    }
  }, [error]);


  const handleRowAdd = async (newRow: ServiceData) => {
    try {
      if (!newRow.name || !newRow.price || !newRow.description || !newRow.timeRequired || !newRow.where) {
        ToastError('All fields are required');
        return;
      }
      await dispatch(addService(newRow));
      ToastSuccess("Service added successfully!");
    } catch (error) {
      ToastError('Failed to add service');
    }
  };

  const handleRowDelete = async (oldRow: ServiceData) => {
      await dispatch(deleteService(oldRow._id));
      ToastSuccess("Service deleted successfully!");
  };

  const handleRowUpdate = async (newRow: ServiceData, oldRow: ServiceData | undefined) => {
    if (oldRow) {
        await dispatch(updateService(newRow));
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

    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column"}}>

  <div style={{marginTop:"100px", marginLeft:"180px"}}>
  { loading ? (<Loader/>) : (
    <MaterialTable
    title="SERVICES DATA"
    columns={columns}
    style={{backgroundColor:"#E7E8D1"}}
    data={ enhancedServices }
    editable={{
      onRowAdd: handleRowAdd,
      onRowUpdate: handleRowUpdate,
      onRowDelete: handleRowDelete,
    }}
    icons={{
        Add: forwardRef(() => <Add style={{ color: '#B85042' }} />),
        Clear: forwardRef(() => <Clear style={{ color: '#B85042' }} />) ,
        Check: forwardRef(() => <Check style={{ color: '#B85042' }} />) ,
        Delete: forwardRef(() => <Delete style={{ color: '#B85042' }} />),
        DetailPanel: forwardRef(() => <ChevronRight style={{ color: '#B85042' }} />),
        Edit: forwardRef(() => <Edit style={{ color: '#B85042' }} />),
        Export: forwardRef(() => <ArrowUpward style={{ color: '#B85042' }} />),
        Filter: forwardRef(() => <Search />) ,
        FirstPage: forwardRef(() => <FirstPage style={{ color: '#B85042' }} />),
        LastPage: forwardRef( () => <LastPage style={{ color: '#B85042' }} />),
        NextPage: forwardRef(() => <ChevronRight style={{ color: '#B85042' }} />),
        PreviousPage: forwardRef(() => <ChevronLeft style={{ color: '#B85042' }} />),
        ResetSearch: forwardRef( () => <Clear style={{ color: '#B85042' }} />),
        Search: forwardRef(() => <Search style={{ color: '#B85042' }} />) ,
        SortArrow: forwardRef(() => <ArrowDownward />),
    }}
    options={{
      headerStyle: {
        backgroundColor: "#B85042",
        color: "#FFF",
        zIndex:"0"
      },
      actionsCellStyle: {
        backgroundColor: "#E7E8D1",
      },
      rowStyle: {
        backgroundColor: "#E7E8D1", 
        border: '1px solid #A7BEAE'
      }
    }}
  />
  )}
</div>

</div>
  
);

}

export default Services;
function ToastSuccess(arg0: string) {
  throw new Error('Function not implemented.');
}

