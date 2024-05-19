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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import Loader from "@/components/common/loader";
import { formFieldStyle } from "@/css/formstyle/formfieldstyle";
import { User } from "../types";
import imgsignup from "../../public/images/Car-Service.jpeg";

interface LoginFormValues {
  email: string;
  password: string;
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();

    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!isChecked) {
      setError("Please agree to the terms and conditions")
      return;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const user: User = {
        email: formData.email,
        password: formData.password,
        user: undefined,
        token: "",
        _id: undefined,
        data: ""
      };
      const response = await dispatch(login(user));

      const token = response.payload.token;
      const decodedToken: any = jwtDecode(token);
      const accountType = decodedToken.accountType;

      switch (accountType) {
        case "Customer":
          router.push("/customer/cushome");
          break;
        case "Admin":
          router.push("/admin/home");
          break;
        case "Mechanic":
          router.push("/mechanic/home");
          break;
        default:
          router.push("/login");
          break;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrors({
        ...errors,
        password: "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
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
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={formFieldStyle}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={formFieldStyle}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="By signing you agree to the terms and conditions"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#B85042", // Set background color
                    color: "white", // Set text color to white
                    "&:hover": {
                      backgroundColor: "#974038", // Adjust hover background color
                    },
                  }}
                  disabled={!isChecked}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="/forgotpassword"
                      variant="body2"
                      style={{ color: "#B85042" }}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="/signup"
                      variant="body2"
                      style={{ color: "#B85042" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
