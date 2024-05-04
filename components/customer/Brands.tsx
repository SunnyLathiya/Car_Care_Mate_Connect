"use client"
import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CircularProgress, Typography, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "@/css/customers/Brands.module.css"
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Brands: React.FC = () => {

  const [brands, setBrands] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("");
  const router = useRouter();
  
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const retrieveBrands = () => {
    axios.get('http://localhost:4000/api/v1/admin/findallbrands')
      .then((response) => {
        setBrands(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  useEffect(() => {
    retrieveBrands();
  }, []);

  const getCarCard = (brand: any) => {
    return (
      <Grid item xs={6} sm={4} md={3} lg={2} key={brand}>
        <Card className={`${styles.card}`} onClick={() => router.push(`/customer/cushome/cars/${encodeURIComponent(brands[brand])}`)}>
          <CardContent>
            <Typography style={{fontSize:"xx-large"}}>{brands[brand]}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div className={`${styles.brand}`}>
      <h1 className={`${styles.title}`}>Available Brands</h1>

      <div className={`${styles.search}`}>
        <SearchIcon className={`${styles.searchIcon}`} />
        <TextField className={`${styles.searchInput}`} label="Search for Brands" onChange={handleSearchChange} InputLabelProps={{
    sx: {
      color: '#B85042', // Red color for label text
    },
  }}  />
      </div>

      {brands ? (
        <Grid container spacing={3} item className={`${styles.grid_container}`}>
          {Object.keys(brands).map((brand) => brands[brand].includes(filter) && getCarCard(brand))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Brands;

