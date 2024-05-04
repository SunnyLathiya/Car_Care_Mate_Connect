


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
import imgsignup from '../../public/images/Car-Service.jpeg'
import { useDispatch } from 'react-redux';
import { registerUser } from '@/redux/slices/userSlice';
import carSlice from '@/redux/slices/adminSlices/carSlice';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';


interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<RegisterFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isChecked, setIsChecked] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<RegisterFormValues>>({});

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
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChecked) {
      // Show error message or prevent form submission
      console.log('Please agree to the terms and conditions');
      return;
    }

    const errors: Partial<RegisterFormValues> = {};
    if (!formData.firstName) {
  errors.firstName = 'First Name is required';
} else if (formData.firstName.length < 2) {
  errors.firstName = 'First Name should be at least 2 characters';
} else if (!/^[a-zA-Z\-]+$/.test(formData.firstName)) {
  errors.firstName = 'First Name should only contain letters and hyphens';
}

// Validate Last Name
if (!formData.lastName) {
  errors.lastName = 'Last Name is required';
} else if (formData.lastName.length < 2) {
  errors.lastName = 'Last Name should be at least 2 characters';
} else if (!/^[a-zA-Z\-]+$/.test(formData.lastName)) {
  errors.lastName = 'Last Name should only contain letters and hyphens';
}

// Validate Email
if (!formData.email) {
  errors.email = 'Email is required';
} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  errors.email = 'Email is invalid';
}

// Validate Password
if (!formData.password) {
  errors.password = 'Password is required';
} else if (formData.password.length < 8) {
  errors.password = 'Password must be at least 8 characters';
} else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)) {
  errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one digit';
}

// Validate Confirm Password
if (!formData.confirmPassword) {
  errors.confirmPassword = 'Confirm Password is required';
} else if (formData.password !== formData.confirmPassword) {
  errors.confirmPassword = 'Passwords do not match';
}

    // Set errors if any
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

  

    console.log('Form submitted:', formData);
    router.push('/signin')

    dispatch(registerUser(formData));
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };


  useEffect(() => {
    document.body.style.overflow = "hidden";
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
            backgroundImage: `url(${imgsignup.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{backgroundColor:"#E7E8D1"}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              mt: '5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor:'#E7E8D1'
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}

<Avatar sx={{ m: 1, bgcolor: '#B85042', color: '#E7E8D1' }}>
  <LockOutlinedIcon />
</Avatar>


            <Typography component="h1" variant="h5" style={{color:"#B85042"}}>
              Sign up
            </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
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
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: '#A7BEAE', // Default label color
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#B85042', // Default border color
                          },
                          '&:hover fieldset': {
                            borderColor: '#B85042', // Border color on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#B85042', // Border color when focused
                          },
                          '&.Mui-focused .MuiInputLabel-root': {
                            color: '#B85042', // Label color when focused
                          },
                        },
                      }} 
                      
                      
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
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: '#A7BEAE', // Default label color
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#B85042', // Default border color
                          },
                          '&:hover fieldset': {
                            borderColor: '#B85042', // Border color on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#B85042', // Border color when focused
                          },
                          '&.Mui-focused .MuiInputLabel-root': {
                            color: '#B85042', // Label color when focused
                          },
                        },
                      }} 
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
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: '#A7BEAE', // Default label color
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#B85042', // Default border color
                          },
                          '&:hover fieldset': {
                            borderColor: '#B85042', // Border color on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#B85042', // Border color when focused
                          },
                          '&.Mui-focused .MuiInputLabel-root': {
                            color: '#B85042', // Label color when focused
                          },
                        },
                      }}       
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
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: '#A7BEAE', // Default label color
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#B85042', // Default border color
                          },
                          '&:hover fieldset': {
                            borderColor: '#B85042', // Border color on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#B85042', // Border color when focused
                          },
                          '&.Mui-focused .MuiInputLabel-root': {
                            color: '#B85042', // Label color when focused
                          },
                        },
                      }}               
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
                    sx={{
                      '& .MuiInputLabel-root': {
                        color: '#A7BEAE', // Default label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#B85042', // Default border color
                        },
                        '&:hover fieldset': {
                          borderColor: '#B85042', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#B85042', // Border color when focused
                        },
                        '&.Mui-focused .MuiInputLabel-root': {
                          color: '#B85042', // Label color when focused
                        },
                      },
                    }}                                             
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
                {/* <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isChecked}
                >
                  Sign Up
                </Button> */}

<Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{
    mt: 3,
    mb: 2,
    backgroundColor: '#B85042', // Set background color
    color: 'white', // Set text color to white
    '&:hover': {
      backgroundColor: '#974038', // Adjust hover background color
    },
  }}
  disabled={!isChecked}
>
  Sign Up
</Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/signin" variant="body2" style={{color:'#B85042'}}>
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
