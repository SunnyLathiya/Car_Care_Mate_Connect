// "use client"
// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

// export default function SignIn() {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }


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
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { login } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

interface LoginFormValues {
  email: string;
  password: string;
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

const defaultTheme = createTheme();

export default function SignInSide() {

  const dispatch:AppDispatch=useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState<LoginFormValues>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
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
      [name]: '', // Clear error message when user starts typing
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();

    // Basic client-side validation
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    if (!isChecked) {
      // Show error message or prevent form submission
      console.log('Please agree to the terms and conditions');
      return;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }
    

    try {
      // const data = new FormData(event.currentTarget);
      // const userDetails = {
      //   email: data.get('email'),
      //   password: data.get('password'),
      // };
      // const response = await dispatch(login(userDetails));
      const response = await dispatch(login(formData));

      const token = response.payload.token;
      const decodedToken = jwtDecode(token);
      const accountType = decodedToken.accountType;

      // Redirect based on accountType
      switch (accountType) {
        case 'Customer':
          router.push('/customer/cushome');
          break;
        case 'Admin':
          router.push('/admin/home');
          break;
        case 'Mechanic':
          router.push('/mechanic/home');
          break;
        default:
          router.push('/login');
          break;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle specific error cases if needed
      setErrors({
        ...errors,
        password: 'Invalid email or password', // Display generic error message
      });
    } finally {
      setLoading(false);
    }
  };

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
            <Avatar sx={{ m: 1, bgcolor: '#B85042', color: '#E7E8D1' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate
             onSubmit={handleSubmit} 
             sx={{ mt: 1 }}>
             
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary"  checked={isChecked}
                onChange={handleCheckboxChange} />}
                label="Remember me"
                
              />
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
  Sign In
</Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2" style={{color:'#B85042'}}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2" style={{color:'#B85042'}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
