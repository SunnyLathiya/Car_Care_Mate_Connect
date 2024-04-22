import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, TextField } from "@material-ui/core";
import { NextPage } from "next";
import CarSlides from "./CarSlides";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";

export interface Car {
    _id: string;
    name: string;
}

interface Props {
    match: any; 
    history: any;
}

const Cars: NextPage<Props> = ({ match, history }) => {
    const router = useRouter();
    const { brand } = router.query;

    const [cars, setCars] = useState<Car[]>([]);
    const [filter, setFilter] = useState<string>("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const retrieveCars = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/admin/findbybrand", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ brand })
            });
            if (response.ok) {
                const data = await response.json();
                setCars(data);
            } else {
                console.error("Failed to retrieve cars");
            }
        } catch (error) {
            console.error("Error retrieving cars:", error);
        }
    };

    useEffect(() => {
        if (brand) {
            retrieveCars();
        }
    }, [brand]);

    const getCarCards = (car: Car): JSX.Element => {
        return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={car._id}>
                <Card
                    className="card"
                    onClick={() => history.push(`/cust_home/services/${car._id}`)}
                >
                    <CardContent>
                        <Typography>{car.name}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    return (
        <div>
            <CarSlides />
            <div className="brand">
                <h1 className="title">{`Available ${brand} Cars`}</h1>

                <div className="search">
                    <SearchIcon className="searchIcon" />
                    <TextField
                        className="searchInput"
                        label="Search for Cars"
                        onChange={handleSearchChange}
                    />
                </div>

                <Grid container spacing={3} className="grid_container">
                    {/* {cars.map((car) =>
                        car.name.toLowerCase().includes(filter.toLowerCase()) && getCarCards(car)
                    )} */}
                    <h1>fefsg</h1>
                    <h1>fbdfbd</h1>
                </Grid>
            </div>
        </div>
    );
};

export default Cars;
