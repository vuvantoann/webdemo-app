import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

import {useForm} from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Copyright from '../compution/copyright';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultTheme = createTheme();

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(function(){
        setLoading(false)
    }, 3000)
  }, [])

  const handleDataLogin = (dataLogin) => {
    let dataRegister = JSON.parse(localStorage.getItem("dataregister"))
    if(dataLogin.email === dataRegister.email && dataLogin.password === dataRegister.password) {
      toast.success("you have successfuly loged in!")
      setTimeout(function() {
        navigate('/')
      }, 5000)
    }else{
      toast.error("you have failed to log in!")
    }
  }
  
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(7).max(20),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  }); 

  const errorTextStyle = {
    color: 'red',
    fontSize: '15px',
    marginTop: '15px',
    
  };
  
  const StyledCircularProgress = styled(CircularProgress)({
    position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  });
  

  return (<>
    {loading ? <StyledCircularProgress size={24} color="inherit" /> :

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box 
          component="form" 
          noValidate 
          onSubmit={handleSubmit(handleDataLogin)}
          sx={{ mt: 1 }}>
            <TextField
             {...register("email")}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Typography sx={errorTextStyle}>{errors?.email?.message}</Typography>
            <TextField
            {...register("password")}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Typography sx={errorTextStyle}>{errors?.password?.message}</Typography>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>}
  </>);
}

export default Login