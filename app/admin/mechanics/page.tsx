
"use client"
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import MaterialTable, { Column } from "material-table";
import { getAllMechanics, getAllAvailableMechanics, deleteMechanic } from "@/redux/slices/adminSlices/adminMechSlice";
import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AddBox, Cancel, DeleteOutline, SaveAlt, Add, Edit, Delete, Search, Check, Clear, ArrowUpward, FirstPage, LastPage, ChevronLeft, ChevronRight } from "@mui/icons-material";

interface MechanicData {
  [x: string]: string;
  name: string;
  email: string;
  password: string;
  mobile: string;
}

interface Props {}

const Mechanic: React.FC<Props> = () => {
  const   mechanicsList  = useSelector((state: RootState) => state.adminMech.allmechanics);
  const dispatch: AppDispatch = useDispatch();
  // const [mechanic, setMechanic] = useState<MechanicData>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [mechName, setMechName] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [display, setdisplay] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      const token = Cookies.get('token');
      const response = await axios.post("http://localhost:4000/api/v1/admin/register", {
        email,
        mechName,
        number,
        password
      }, { headers: {
        Authorization: `Bearer ${token}`,
      },});

      console.log(response);
      if(response.data.status === "success"){
        router.push('/admin/mechanics');
        setdisplay(false)
      }
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
        toast.error(error.message);
    }
  };


  console.log(mechanicsList)
  useEffect(() => {
    dispatch(getAllAvailableMechanics(undefined));
  }, [dispatch]);


  const columns: Column<MechanicData>[] = [
    { title: "ID", field: "id" },
    { title: "Name", field: "mechName" },
    { title: "Email", field: "email" },
    { title: "Mobile", field: "number" },
    { title: "Status", field: "status" },
  ];

  

  const handleRowDelete = async (oldRow: MechanicData) => {
    try {
      await dispatch(deleteMechanic(oldRow._id)); // Pass the carId to deleteCar action
      
    } catch (error) {
      console.error('Error occurred while deleting car:', error);
    }
  };



  // const handleRowUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // Prevent default form submission behavior
  //   try {
  //     const response = await axios.patch("http://localhost:4000/api/v1/admin/updatemechanic/:mechId", { 
  //       email,
  //       mechName,
  //       number,
  //       status
  //     });
  //     if(response.data.message === "Mechanic Details Updated Successfully"){
  //       router.push('/');
  //     }
  //     if (response.data.success) {
  //       response.data.message
  //     } else {
  //       throw new Error(response.data.message);
  //     }
  //   } catch (error: any) {
  //        error(error.message);
  //   }
  // };

  const openForm = () => {
    setdisplay(true);
  };

  const closeForm = () => {
    setdisplay(false);
  };

  const enhancedMechanics = mechanicsList.map((mechanic: MechanicData, index: number) => ({ ...mechanic, tableData: { id: index } }));

  return (

  <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column"}}>

    <div style={{marginTop:"75px", marginBottom:"20px", marginLeft:"190px"}}>
      <h3 style={{zIndex:"0"}}>Mechanic Operations</h3>
      <br />
      <button onClick={openForm} style={{backgroundColor:"#B85042", color:"white"}}>Add Mechanic</button>
      <br />
      <MaterialTable
        title="MECHANIC DATA"
        columns={columns}
        style={{backgroundColor:"#E7E8D1"}}
        data={enhancedMechanics}
        editable={{
           onRowDelete: handleRowDelete,
          //  onRowUpdate: handleRowUpdate
        }}
        icons={{
          Add: () => <Add style={{ color: '#B85042' }} />,
          Check: () => <Check style={{ color: '#B85042' }} />,
          Clear: () => <Clear style={{ color: '#B85042' }} />,
          Delete: () => <Delete style={{ color: '#B85042' }} />,
          DetailPanel: () => <ChevronRight style={{ color: '#B85042' }} />,
          Edit: () => <Edit style={{ color: '#B85042' }} />,
          Export: () => <ArrowUpward style={{ color: '#B85042' }} />,
          Filter: () => <Search />,
          FirstPage: () => <FirstPage style={{ color: '#B85042' }} />,
          LastPage: () => <LastPage style={{ color: '#B85042' }} />,
          NextPage: () => <ChevronRight style={{ color: '#B85042' }} />,
          PreviousPage: () => <ChevronLeft style={{ color: '#B85042' }} />,
          ResetSearch: () => <Clear style={{ color: '#B85042' }} />,
          Search: () => <Search style={{ color: '#B85042' }} />,
          SortArrow: () => <ArrowUpward style={{ color: '#B85042' }}/>,
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
            backgroundColor: "#E7E8D1", // Set row background color to red
            border: '1px solid #A7BEAE'
          }
        }}
        components={{
          // Override the DeleteAction component to customize the delete confirmation dialog
          DeleteAction: (props: any) => (
            <props.action.component {...props.action}>
              <props.action.icon
                {...props.action.iconProps}
                onClick={(event: any) => props.action.onClick(event, props.data)}
                style={{ color: 'red' }}
              />
              <Cancel onClick={() => props.action.onCancel(props.data)} />
            </props.action.component>
          ),
        }}
      /> 

      {display ? (
        <Container maxWidth="xs" style={{ 
          marginTop: "10px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '15px', fontSize: '1.2rem', color: '#333', fontWeight:"bold" }}>Create Mechanic Account</h4>
            <form
             onSubmit={handleSubmit} 
             style={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="name"
                    name="mechName"
                    variant="outlined"
                    fullWidth
                    label="Name"
                    value={mechName}
                    onChange={(e) => setMechName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Number"
                    name="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: '25px', backgroundColor:"#B85042" }}
              >
                CREATE ACCOUNT
              </Button>
            </form>
          </div>
          <Button onClick={closeForm} style={{ marginTop: '15px' }}>
            Close Form
          </Button>
        </Container>
        
      ) : null}
    </div>

    </div>
  );
};

export default Mechanic;
