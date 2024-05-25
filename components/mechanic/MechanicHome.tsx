"use client";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
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

interface MechanicHomeProps {}

const MechanicHome: React.FC<MechanicHomeProps> = () => {
  const router = useRouter();
  const pathname = usePathname();

  const itemList = [
    {
      text: "HOME",
      icon: <HomeIcon />,
      path: "/mechanic/home",
    },
    {
      text: "FIND ORDERS",
      icon: <DriveEtaIcon />,
      path: "/mechanic/findorders",
    },
    {
      text: "MY ORDERS",
      icon: <MonetizationOnIcon />,
      path: "/mechanic/myorders",
    },
    {
      text: "Log Out",
      icon: <ExitToAppIcon />,
      path: "/login",
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
      </Drawer>
    </div>
  );
};

export default MechanicHome;
