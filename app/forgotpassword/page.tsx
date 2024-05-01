"use client"
// import React, { useState } from 'react';
// import {
//   Avatar,
//   Box,
//   Button,
//   Checkbox,
//   CssBaseline,
//   FormControlLabel,
//   Grid,
//   Link,
//   Paper,
//   TextField,
//   Typography,
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { ToastError, ToastSuccess } from '@/components/common/Toast';

// const ForgotPassword = () => {

// const [email, setEmail] = useState('');
// const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!email) {
//       setError('Please enter your email address.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:4000/api/v1/forgotpassword', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       console.log("response", response);

//       if (!response.ok) {
//         const data = await response.json();
//         setError(data.error || 'Failed to reset password.');
//         ToastError('Failed to reset password.')
//       } else {
//         ToastSuccess("Password reset instructions sent to your email.");
//       }
//     } catch (error: any) {
//       console.error('Error resetting password:', error);
//       setError('Failed to reset password. Please try again.');
//       ToastError('Failed to reset password. Please try again.')
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//     setError(''); 
//   };

//   return (
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             mt: '5rem',
//             backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
//             backgroundRepeat: 'no-repeat',
//             backgroundColor: (t) =>
//               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               mt: '5rem',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Forgot Password
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      


//           <TextField
//           margin="normal"
//           required
//           fullWidth
//           id="email"
//           label="Email Address"
//           name="email"
//           autoComplete="email"
//           autoFocus
//           value={email}
//           onChange={handleChange}
//           error={!!error}
//           helperText={error}
//         />
//         <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//           Reset Password
//         </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="/signin" variant="body2">
//                     Back to Sign In
//                   </Link>
//                 </Grid>
           
//                 <Grid item>
//                   <Link href="/signup" variant="body2">
//                     Don't have an account? Sign Up
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//   );
// };

// export default ForgotPassword;


import { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper, Avatar, Link, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Loader from '@/components/loader';
import { ToastError, ToastSuccess } from '@/components/common/Toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true); // Set loading state to true during request

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
        ToastError('Failed to reset password.')
      } else {
        setError('');
        // Display success message or toast
        ToastSuccess("Password reset instructions sent to your email.");
      }
    } catch (error: any) {
      console.error('Error resetting password:', error);
      setError('Failed to reset password. Please try again.');
    }

    setLoading(false); // Set loading state back to false after request completes
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  return (
    <>
        {loading && <Loader/>}
    
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* <CssBaseline /> */}
      {/* <Loader/> */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          mt: '5rem',
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
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
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Reset Password
            </Button>
 
            <Grid container>
              <Grid item xs>
                <Link href="/signin" variant="body2">
                  Back to Sign In
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
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

