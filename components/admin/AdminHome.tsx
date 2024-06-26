"use client";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import BallotIcon from "@material-ui/icons/Ballot";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { usePathname, useRouter } from "next/navigation";

interface AdminHomeProps {}

const AdminHome: React.FC<AdminHomeProps> = () => {
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <div style={{ marginTop: "80px", marginBottom: "20px" }}>
      <Drawer variant="permanent" style={{ marginTop: "50px" }}>
        <div style={{ backgroundColor: "#A7BEAE", height: "100%" }}>
          <List style={{ marginTop: "100px" }}>
            {itemList.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => router.push(item.path)}
                  style={{
                    color: isActive ? "#B85042" : "black",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {item.icon && (
                    <ListItemIcon
                      style={{ color: isActive ? "#B85042" : "black" }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  )}
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
