"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ToastError, ToastSuccess } from "@/components/common/Toast";
import { useRouter } from "next/navigation";
import imgsignup from "../../../public/images/Car-Service.jpeg"

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (error) {
      ToastError(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please enter a new password and confirm password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const token = new URLSearchParams(window.location.search).get("token");

    try {
      const response = await fetch(
        `https://car-care-mate-connect-backend.onrender.com/api/v1/changepasswordwithtoken/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword,
            confirmNewPassword: confirmPassword,
          }),
        }
      );


      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to update password.");
      } else {
        ToastSuccess("Password Change Successfully!");
        router.push("/signin");
      }
    } catch (error) {
      setError("Failed to update password. Please try again.");
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

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
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            mt: "5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#B85042', color: '#E7E8D1' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{color:"#B85042"}}>
            Change Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="newPassword"
              label="New Password"
              autoComplete="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#A7BEAE',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#B85042',
                  },
                  '&:hover fieldset': {
                    borderColor: '#B85042',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#B85042',
                  },
                  '&.Mui-focused .MuiInputLabel-root': {
                    color: '#B85042',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              autoComplete="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!error}
              helperText={error}
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#A7BEAE',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#B85042',
                  },
                  '&:hover fieldset': {
                    borderColor: '#B85042',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#B85042',
                  },
                  '&.Mui-focused .MuiInputLabel-root': {
                    color: '#B85042',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#B85042', 
                color: 'white', 
                '&:hover': {
                  backgroundColor: '#974038',
                },
              }}
            >
              Change Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/signin" variant="body2" style={{color:'#B85042'}}>
                  Back to Sign In
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" style={{color:'#B85042'}}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;


