
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

import Copyright from "../compution/copyright";

import {useForm} from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const theme = createTheme();

function Register() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(function(){
        setLoading(false)
    }, 3000)
  }, [])

  const handleDataRegister = (dataRegister) => {
    localStorage.setItem("dataregister", JSON.stringify(dataRegister));
    toast.success("Register Success!");
    setTimeout(function () {
      navigate("/login");
    }, 5000);
  };
  
  const schema = yup.object().shape({
    firstName: yup.string().required().min(3).max(10),
    lastName: yup.string().required().min(3).max(10),
    email: yup.string().required().email(),
    password: yup.string().required().min(7).max(20),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  }); 
  
  console.log("check errors >> ", errors)
  
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

    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleDataRegister)} 
          sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName")}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                 <Typography sx={errorTextStyle}
                  >{errors?.firstName?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName")}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
                <Typography sx={errorTextStyle}
                  >{errors?.lastName?.message}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <Typography sx={errorTextStyle}
                  >{errors?.email?.message}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <Typography sx={errorTextStyle}
                  >{errors?.password?.message}</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
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
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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

export default Register