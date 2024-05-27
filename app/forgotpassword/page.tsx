"use client"
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper, Avatar, Link, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Loader from '@/components/common/loader';
import { ToastError, ToastSuccess } from '@/components/common/Toast';
import imgsignup from "../../public/images/Car-Service.jpeg";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      ToastError(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true); 
    try {
      const response = await fetch('http://localhost:4000/api/v1/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to reset password.');
      } else {
        setError('');
        ToastSuccess("Password reset instructions sent to your email.");
      }
    } catch (error: any) {
      setError('Failed to reset password. Please try again.');
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  return (
    <>
        {loading && <Loader/>}
    
    <Grid container component="main" sx={{ height: '100vh' }} style={{backgroundColor:"#E7E8D1"}}>
     
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          mt: '5rem',
          backgroundImage: `url(${imgsignup.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundColor: "#E7E8D1" }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            mt: '5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#B85042', color: '#E7E8D1' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{color:"#B85042"}}>
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange}
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
            <Button type="submit"
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
              Reset Password
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
    </>
  );
};

export default ForgotPassword;

