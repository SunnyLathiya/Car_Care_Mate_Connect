

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useSnackbar } from 'notistack';
// import { addCar, getAllCars } from '@/redux/slices/carSlice';
// import { AppDispatch, RootState } from '@/redux/store';
// import MaterialTable, { Column } from "material-table";
// import { AddBox, DeleteOutline, Edit, SaveAlt, Search, Cancel } from '@material-ui/icons';

// interface CarData {
//   name: string;
//   brand: string;
//   tableData?: any; // Add tableData property to CarData interface
// }

// function Cars() {
//   const { cars } = useSelector((state: RootState) => state.car);
//   const { enqueueSnackbar } = useSnackbar();
//   const dispatch: AppDispatch = useDispatch();
//   const [formData, setFormData] = useState<CarData>({ name: '', brand: '' });
  
//   useEffect(() => {
//     dispatch(getAllCars());
//   }, []);

//   const columns = [
//     { title: "Name", field: "name" },
//     { title: "Brand", field: "brand" },
//   ];

//   const handleRowAdd = async (newData: CarData) => {
//     try {
//       await dispatch(addCar(formData));
//       enqueueSnackbar('Car added successfully', {
//         variant: 'success',
//       });
//       setFormData({ name: '', brand: '' });
//     } catch (error) {
//       console.error('Error occurred while adding car:', error);
//       enqueueSnackbar('Failed to add car', {
//         variant: 'error',
//       });
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//       <div style={{ marginTop: '90px', marginBottom: '20px', marginLeft: '180px', width: '85%' }}>
//       <MaterialTable
//         title="CARS DATA"
//         columns={columns}
//         data={cars.map((car: CarData) => ({ ...car, tableData: {} }))}
//         editable={{
//           onRowAdd: handleRowAdd,
//         }}
//         icons={{
//           Add: () => <AddBox />,
//           Edit: () => <Edit />,
//           Delete: () => <DeleteOutline />,
//           Save: () => <SaveAlt />,
//           Clear: () => <Cancel />,
//           Search: () => <Search />,
//           FirstPage: () => <span>First</span>,
//           LastPage: () => <span>Last</span>,
//           NextPage: () => <span>Next</span>,
//           PreviousPage: () => <span>Previous</span>,
//         }}
    
//         options={{
//           headerStyle: {
//             backgroundColor: "#01579b",
//             color: "#FFF",
//           },
//           actionsCellStyle: {
//             backgroundColor: "#FFF",
//           },
//         }}
//       />
//     </div>
//   );
// }

// export default Cars;


// "use client"
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useSnackbar } from 'notistack';
// import { addCar, getAllCars, deleteCar, updateCar } from '@/redux/slices/carSlice';
// import { AppDispatch, RootState } from '@/redux/store';
// import MaterialTable, { Column } from 'material-table';
// import { AddBox, Cancel, DeleteOutline, Edit, SaveAlt, Search } from '@mui/icons-material';
// import { alpha } from '@material-ui/core/styles';


// interface CarData {
//   name: string;
//   brand: string;
// }

// function Cars() {
//   const { cars } = useSelector((state: RootState) => state.car);
//   const { enqueueSnackbar } = useSnackbar();
//   const dispatch: AppDispatch = useDispatch();
//   const [formData, setFormData] = useState<CarData>({ name: '', brand: '' });

//   useEffect(() => {
//     dispatch(getAllCars());
//   }, [dispatch]);

//   // const handleRowAdd = async () => {
//   //   try {
//   //     await dispatch(addCar(formData));
//   //     enqueueSnackbar('Car added successfully', {
//   //       variant: 'success',
//   //     });
//   //     setFormData({ name: '', brand: '' });
//   //   } catch (error) {
//   //     console.error('Error occurred while adding car:', error);
//   //     enqueueSnackbar('Failed to add car', {
//   //       variant: 'error',
//   //     });
//   //   }
//   // };
  
//   const handleRowAdd = async () => {
//     try {
//       // Ensure that both name and brand are provided in the formData
//       if (!formData.name || !formData.brand) {
//         throw new Error('Name and brand are required.');
//       }
      
//       await dispatch(addCar(formData));
//       enqueueSnackbar('Car added successfully', {
//         variant: 'success',
//       });
//       setFormData({ name: '', brand: '' });
//     } catch (error) {
//       console.error('Error occurred while adding car:', error);
//       enqueueSnackbar('Failed to add car', {
//         variant: 'error',
//       });
//     }
//   };
  
  

//   const handleRowDelete = async (oldData: CarData) => {
//     try {
//       await dispatch(deleteCar(oldData._id)); // Pass the carId to deleteCar action
//       enqueueSnackbar('Car deleted successfully', {
//         variant: 'success',
//       });
//     } catch (error) {
//       console.error('Error occurred while deleting car:', error);
//       enqueueSnackbar('Failed to delete car', {
//         variant: 'error',
//       });
//     }
//   };

//   const handleRowUpdate = async (newData: CarData, oldData: CarData | undefined) => {
//     if (oldData) {
//       try {
//         await dispatch(updateCar(newData));
//         enqueueSnackbar('Car updated successfully', {
//           variant: 'success',
//         });
//       } catch (error) {
//         console.error('Error occurred while updating car:', error);
//         enqueueSnackbar('Failed to update car', {
//           variant: 'error',
//         });
//       }
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const columns: Column<CarData>[] = [
//     { title: 'Name', field: 'name' },
//     { title: 'Brand', field: 'brand' },
//   ];

//   // function handleRowUpdate(newData: CarData, oldData?: CarData | undefined): Promise<any> {
//   //   throw new Error('Function not implemented.');
//   // }

//   return (
//     <div style={{ marginTop: '90px', marginBottom: '20px', marginLeft: '180px', width: '85%' }}>
//       <MaterialTable
//         title="CARS DATA"
//         columns={columns}
//         data={cars.map((car: CarData) => ({ ...car, tableData: {} }))}
//         editable={{
//           onRowAdd: handleRowAdd,
//           onRowUpdate: handleRowUpdate,
//           onRowDelete: handleRowDelete,
//         }}
//         icons={{
//           Add: () => <AddBox />,
//           Edit: () => <Edit />,
//           Delete: () => <DeleteOutline />,
//           Save: () => <SaveAlt />,
//           Clear: () => <Cancel />,
//           Search: () => <Search />,
//           FirstPage: () => <span>First</span>,
//           LastPage: () => <span>Last</span>,
//           NextPage: () => <span>Next</span>,
//           PreviousPage: () => <span>Previous</span>,
//         }}
//         options={{
//           headerStyle: {
//             backgroundColor: "#01579b",
//             color: "#FFF",
//           },
//           actionsCellStyle: {
//             backgroundColor: "#FFF",
//           },
//         }}
//       />
//     </div>
//   );
// }

// export default Cars;

"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable, { Column } from 'material-table';
import { Add, AddBox, ArrowUpward, Cancel, Check, ChevronLeft, ChevronRight, Clear, Delete, DeleteOutline, Edit, FirstPage, LastPage, SaveAlt, Search } from '@mui/icons-material';
import { RootState, AppDispatch } from '@/redux/store';
import { addCar, getAllCars, deleteCar, updateCar } from '@/redux/slices/adminSlices/carSlice';
import { ToastInfo } from '@/components/common/Toast';
import Loader from '@/components/loader';

interface CarData {
  _id: string;
  name: string;
  brand: string;
}

function Cars() {
  const { cars, success, loading , error} = useSelector((state: RootState) => state.car);

  console.log("hyy", error)
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<CarData>({ name: '', brand: '', _id:'' });


  useEffect(() => {
    if (success) {
      ToastInfo("All Cars Page!")
      
      console.log("loader", loading)
    }
    dispatch(getAllCars());

    
    console.log("loader", loading)

  }, [dispatch, success]);

  const handleRowAdd = async (newRow: CarData) => {
    try {
      if (!newRow.name || !newRow.brand) {
        throw new Error('Name and brand are required.');
      }
      
      await dispatch(addCar(newRow));

    } catch (error) {
      console.error('Error occurred while adding car:', error);
    }
  };

  const handleRowDelete = async (oldRow: CarData) => {
    try {
      await dispatch(deleteCar(oldRow._id)); // Pass the carId to deleteCar action
    } catch (error) {
      console.error('Error occurred while deleting car:', error);
    }
  };

  const handleRowUpdate = async (newRow: CarData, oldRow: CarData | undefined) => {
    if (oldRow) {
      try {
        await dispatch(updateCar(newRow));
      } catch (error) {
        console.error('Error occurred while updating car:', error);
  
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const columns: Column<CarData>[] = [
    { title: 'Name', field: 'name' },
    { title: 'Brand', field: 'brand' },
  ];

const enhancedCars = cars.map((car: CarData, index: number) => ({ ...car, tableData: { id: index } }));

const customIconStyles = {
  root: {
    color: 'red', // Set color of all icons to red
  },
};

return (

  <>

{loading && <Loader/>}

  
<div style={{ minHeight:"100vh", display:"flex", flexDirection:"column"}}>


  <div style={{marginTop:"100px", marginLeft:"180px"}}>
    <MaterialTable
      title="CARS DATA"
      columns={columns}
      data={enhancedCars}
      editable={{
        onRowAdd: handleRowAdd,
        onRowUpdate: handleRowUpdate,
        onRowDelete: handleRowDelete,
      }}
      icons={{
        Add: () => <Add style={{ color: '#B85042' }} />,
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
        }
      }}
    />
  </div>


  {loading && <Loader/>}




  </div>

  {loading && <Loader/>}

  
  
  </>

);

}

export default Cars;

