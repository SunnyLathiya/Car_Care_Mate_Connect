// // "use client"
// // import * as React from 'react';
// // import Avatar from '@mui/material/Avatar';
// // import Button from '@mui/material/Button';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import TextField from '@mui/material/TextField';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Checkbox from '@mui/material/Checkbox';
// // import Link from '@mui/material/Link';
// // import Grid from '@mui/material/Grid';
// // import Box from '@mui/material/Box';
// // import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// // import Typography from '@mui/material/Typography';
// // import Container from '@mui/material/Container';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';

// // function Copyright(props: any) {
// //   return (
// //     <Typography variant="body2" color="text.secondary" align="center" {...props}>
// //       {'Copyright © '}
// //       <Link color="inherit" href="https://mui.com/">
// //         Your Website
// //       </Link>{' '}
// //       {new Date().getFullYear()}
// //       {'.'}
// //     </Typography>
// //   );
// // }

// // // TODO remove, this demo shouldn't need to reset the theme.
// // const defaultTheme = createTheme();

// // const Signup = () => {
// //     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// //             event.preventDefault();
// //             const data = new FormData(event.currentTarget);
// //             console.log({
// //               email: data.get('email'),
// //               password: data.get('password'),
// //             });
// //           };
        
// //           return (
// //             <ThemeProvider theme={defaultTheme}>
// //               <Container component="main" maxWidth="xs">
// //                 <CssBaseline />
// //                 <Box
// //                   sx={{
// //                     marginTop: 8,
// //                     display: 'flex',
// //                     flexDirection: 'column',
// //                     alignItems: 'center',
// //                   }}
// //                 >
// //                   <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
// //                     <LockOutlinedIcon />
// //                   </Avatar>
// //                   <Typography component="h1" variant="h5">
// //                     Sign up
// //                   </Typography>
// //                   <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
// //                     <Grid container spacing={2}>
// //                       <Grid item xs={12} sm={6}>
// //                         <TextField
// //                           autoComplete="given-name"
// //                           name="firstName"
// //                           required
// //                           fullWidth
// //                           id="firstName"
// //                           label="First Name"
// //                           autoFocus
// //                         />
// //                       </Grid>
// //                       <Grid item xs={12} sm={6}>
// //                         <TextField
// //                           required
// //                           fullWidth
// //                           id="lastName"
// //                           label="Last Name"
// //                           name="lastName"
// //                           autoComplete="family-name"
// //                         />
// //                       </Grid>
// //                       <Grid item xs={12}>
// //                         <TextField
// //                           required
// //                           fullWidth
// //                           id="email"
// //                           label="Email Address"
// //                           name="email"
// //                           autoComplete="email"
// //                         />
// //                       </Grid>
// //                       <Grid item xs={12}>
// //                         <TextField
// //                           required
// //                           fullWidth
// //                           name="password"
// //                           label="Password"
// //                           type="password"
// //                           id="password"
// //                           autoComplete="new-password"
// //                         />
// //                       </Grid>
// //                       <Grid item xs={12}>
// //                         <FormControlLabel
// //                           control={<Checkbox value="allowExtraEmails" color="primary" />}
// //                           label="I want to receive inspiration, marketing promotions and updates via email."
// //                         />
// //                       </Grid>
// //                     </Grid>
// //                     <Button
// //                       type="submit"
// //                       fullWidth
// //                       variant="contained"
// //                       sx={{ mt: 3, mb: 2 }}
// //                     >
// //                       Sign Up
// //                     </Button>
// //                     <Grid container justifyContent="flex-end">
// //                       <Grid item>
// //                         <Link href="#" variant="body2">
// //                           Already have an account? Sign in
// //                         </Link>
// //                       </Grid>
// //                     </Grid>
// //                   </Box>
// //                 </Box>
// //                 <Copyright sx={{ mt: 5 }} />
// //               </Container>
// //             </ThemeProvider>
// //           );
  
// // }

// // export default Signup




"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import { signUpSchema } from '@/components/schemas';
import { useRouter } from 'next/navigation';
import { User } from '../types';


interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormikErrors {
  [key: string]: string | undefined;
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {

  const handleSubmit = async (formData: RegisterFormValues) => {
    const user: User = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      user: undefined,
      token: ''
    };
    
    
  };

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: signUpSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
    

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
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
              Sign up
            </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
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
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      autoFocus
                    />

                   {formik.touched.firstName && formik.errors.firstName && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">{formik.errors.firstName}</span>
                    </p>
                  )}

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={formik.values.email}
                    onChange={formik.handleChange}
                    />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">{formik.errors.lastName}</span>
                    </p>
                  )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                      {formik.touched.email && formik.errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">{formik.errors.email}</span>
                    </p>
                  )}

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
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                        {formik.touched.password && formik.errors.password && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">{formik.errors.password}</span>
                    </p>
                  )}
                    
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
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}                          
                    />
                         {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">{formik.errors.confirmPassword}</span>
                    </p>
                  )}
                    
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}



// "use client"
// import React from 'react';
// // import { useRouter } from 'next/router';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useDispatch } from 'react-redux';
// import { userRegister } from '@/redux/slices/userSlice';

// const defaultTheme = createTheme();

// export default function OTPVerification() {
//   // const router = useRouter();
//   const dispatch = useDispatch()

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, val) => {
//     event.preventDefault();
//     console.log(val);

//     const res = await dispatch(userRegister(val:val))

//    };

//   return (
//     <ThemeProvider theme={defaultTheme}>
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
//               OTP Verification
//             </Typography>
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="otp"
//                     label="Enter OTP"
//                     name="otp"
//                     autoComplete="off"
//                   />
//                 </Grid>
//               </Grid>
//               <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                 Verify OTP
//               </Button>
//               <Grid container justifyContent="flex-end">
//                 <Grid item>
//                   <Link href="#" variant="body2">
//                     Resend OTP
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }



