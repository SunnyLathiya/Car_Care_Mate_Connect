"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import imgsignup from "../../public/images/Car-Service.jpeg";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import {validateForm, FormErrors} from "../../components/validations/SignupValidation";
import { formFieldStyle } from "@/css/formstyle/formfieldstyle";
import { User } from "../types";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpSide() {
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<RegisterFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormErrors>>({});

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChecked) {
      console.log("Please agree to the terms and conditions");
      return;
    }

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    router.push("/signin");

    const user: User = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      user: undefined,
      token: "",
      _id: undefined,
      data: ""
    };

    dispatch(registerUser(user));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          mt: "5rem",
          backgroundImage: `url(${imgsignup.src})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        style={{ backgroundColor: "#E7E8D1" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            mt: "5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#E7E8D1",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#B85042", color: "#E7E8D1" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" style={{ color: "#B85042" }}>
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="name"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                  autoFocus
                  sx={formFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  sx={formFieldStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  sx={formFieldStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  sx={formFieldStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="ConfirmPassword"
                  type="confirmPassword"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      value="allowExtraEmails"
                      color="primary"
                    />
                  }
                  label="By signing up you agree to the terms and conditions*"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#B85042",
                color: "white",
                "&:hover": {
                  backgroundColor: "#974038",
                },
              }}
              disabled={!isChecked}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/signin"
                  variant="body2"
                  style={{ color: "#B85042" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
