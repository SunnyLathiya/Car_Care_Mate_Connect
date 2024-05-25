"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "@/css/customers/Brands.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { allBrands } from "@/redux/slices/customer/cusFunctionsSlice";
// import Notification from "../Notification";

export interface Brand {
  [x: string]: any;
  _id: string;
  name: string;
}

const Brands: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const router = useRouter();
  const { brands, loading } = useSelector(
    (state: RootState) => state.cusFunctions
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(allBrands());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const getBrandCard = (brand: any) => {
    return (
      <Grid item xs={5} sm={4} md={3} lg={2} key={brand._id}>
        <Card
          className={styles.card}
          onClick={() =>
            router.replace(
              `/customer/cushome/cars/${encodeURIComponent(brand)}`
            )
          }
        >
          <CardContent>
            <Typography style={{ fontSize: "large" }}>{brand}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const filteredBrands = brands.filter((brand: Brand) =>
    brand.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.brand}>
      {/* <Notification /> */}
      <h1 className={styles.title}>Available Brands</h1>
      <div className={styles.search}>
        <SearchIcon className={styles.searchIcon} />
        <TextField
          className={styles.searchInput}
          label="Search for Brands"
          value={filter}
          onChange={handleSearchChange}
          InputLabelProps={{ sx: { color: "#B85042" } }}
        />
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} className={styles.grid_container}>
          {filteredBrands.map((brand: Brand) => getBrandCard(brand))}
        </Grid>
      )}
    </div>
  );
};

export default Brands;
