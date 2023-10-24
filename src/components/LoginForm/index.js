import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';
import {validate} from "email-validator";

export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;

  const validateForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    
   
    // Add validation code here

    validate(email) ? setValidEmail(true) : setValidEmail(false);
    regex.test(password) ? setValidPassword(true) : setValidPassword(false)
    return {
      email : validate(email),
      password:regex.test(password)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const {email, password } = validateForm(event);

    email && password ? setShowAlert("success") : setShowAlert("error");
  };

  const inputEmailHandler = (e) => {
    setEmailValue(e.target.value)
  }
  const inputPasswordHandler = (e) => {
    setPasswordValue(e.target.value)
  }

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert severity={showAlert}>Sign in {showAlert}</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              error={!validEmail}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onInput={inputEmailHandler}
              value={emailValue}
              inputProps={{role:"email"}}
            />
            <TextField
              error={!validPassword}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onInput={inputPasswordHandler}
              value={passwordValue}
              inputProps={{role:"password"}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
