"use client"
import React, { useEffect, useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import BallotIcon from "@material-ui/icons/Ballot";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { green } from "@mui/material/colors";
// import AdminOrders from "../../../services/member/orders.js/admin_orders";
import { usePathname, useRouter } from "next/navigation";

interface AdminHomeProps {
  // Define your props here
}

const AdminHome: React.FC<AdminHomeProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [orders, setOrders] = useState<any[]>([]);

  // const itemList = [
  //   {
  //     text: "HOME",
  //     icon: <HomeIcon />,
  //     onClick: () => router.push("/admin/home"),
  //   },
  //   {
  //     text: "CARS",
  //     icon: <DriveEtaIcon />,
  //     onClick: () => router.push("/admin/cars"),
  //   },
  //   {
  //     text: "Services",
  //     icon: <BallotIcon />,
  //     onClick: () => router.push("/admin/services"),
  //   },
  //   {
  //     text: "Mechanics",
  //     icon: <SupervisorAccountIcon />,
  //     onClick: () => router.push("/admin/mechanics"),
  //   },
  //   {
  //     text: "Orders",
  //     icon: <MonetizationOnIcon />,
  //     onClick: () => router.push("/admin/orders"),
  //   },
  //   {
  //     text: "Log Out",
  //     icon: <ExitToAppIcon />,
  //     onClick: () => router.push("/signin"),
  //   },
  // ];

  const itemList = [
    {
      text: "HOME",
      icon: <HomeIcon />,
      path: "/admin/home",
    },
    {
      text: "CARS",
      icon: <DriveEtaIcon />,
      path: "/admin/cars",
    },
    {
      text: "SERVICES",
      icon: <BallotIcon />,
      path: "/admin/services",
    },
    {
      text: "MECHANICS",
      icon: <SupervisorAccountIcon />,
      path: "/admin/mechanics",
    },
    {
      text: "ORDERS",
      icon: <MonetizationOnIcon />,
      path: "/admin/orders",
    },
    {
      text: "LOG OUT",
      icon: <ExitToAppIcon />,
      path: "/signin",
    },
  ];

  // const getCompletedOrders = () => {
  //   AdminOrders.findCompletedOrders()
  //     .then((res) => {
  //       setOrders(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getCompletedOrders();
  // }, []);

  return (
    // <div style={{marginTop:"80px", marginBottom:"20px"}}>

    //   <Drawer variant="permanent" style={{marginTop:"50px"}}>
    //     <div style={{backgroundColor:"grey", height:"700px"}}>
    //     <List style={{marginTop:"100px"}}>
    //       {itemList.map((item, index) => {
    //         return (
    //           <ListItem button key={item.text}
    //            onClick={item.onClick}
    //           >
    //             {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
    //             <ListItemText primary={item.text} />
    //           </ListItem>
    //         );
    //       })}
    //     </List>
    //     </div>
    //     <div style={{backgroundColor:"gray"}}></div>
    //   </Drawer>
    // </div>


    <div style={{ marginTop: "80px", marginBottom: "20px" }}>
    <Drawer variant="permanent" style={{ marginTop: "50px" }}>
      <div style={{ backgroundColor: "grey", height: "700px" }}>
        <List style={{ marginTop: "100px" }}>
          {itemList.map((item, index) => {
            const isActive = pathname === item.path;

            return (
              <ListItem
                button
                key={item.text}
                onClick={() => router.push(item.path)}
                style={{
                  color: isActive ? "white" : "black",
                  borderRadius: "5px",
                  transition: "background-color 0.3s ease",
                }}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </div>
      <div style={{ backgroundColor: "gray" }}></div>
    </Drawer>
  </div>




  );
};

export default AdminHome;

