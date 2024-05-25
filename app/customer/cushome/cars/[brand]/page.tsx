"use client";
import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CircularProgress, Typography, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "@/css/customers/Brands.module.css";
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import CarSlides from "@/components/customer/CarSlides";
import { fetchCarsByBrand } from "@/redux/slices/customer/cusFunctionsSlice";

const Brands: React.FC = () => {
  const router = useRouter();
  const { brand } = useParams<{ brand: string }>();
  const [filter, setFilter] = useState<string>("");
  
  const dispatch = useDispatch<AppDispatch>();
  const { cars, loading } = useSelector((state: RootState) => state.cusFunctions);

  useEffect(() => {
    if (brand) {
      dispatch(fetchCarsByBrand(brand));
    }
  }, [dispatch, brand]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const getCarCard = (car: any) => {
    return (
      <Grid item xs={6} sm={4} md={3} lg={2} key={car._id}>
        <Card className={styles.card} onClick={() => router.replace(`/customer/cushome/services/${car._id}`)}>
          <CardContent>
            <Typography style={{ fontSize: "large" }}>{car.name}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const filteredCars = cars.filter((car) => car.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div style={{ backgroundColor: "white" }}>
      <CarSlides />
      <div className={styles.brand}>
        <h1 className={styles.title}>{`Available ${brand} Cars`}</h1>

        <div className={styles.search}>
          <SearchIcon className={styles.searchIcon} />
          <TextField
            className={styles.searchInput}
            label="Search for Cars"
            onChange={handleSearchChange}
          />
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3} className={styles.grid_container}>
            {filteredCars.map((car) => getCarCard(car))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Brands;
