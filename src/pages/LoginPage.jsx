// import { Box } from 'components/Box';
// import { Login } from 'components/Login/Login';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { LoginForm } from './LoginForm';
// import { Link } from './Login.styled';
import { LoginForm } from 'components/Login/LoginForm';
import { Link } from 'components/Login/Login.styled';

export const LoginPage = () => {
  return (
    // <Box
    //   as="main"
    //   display="flex"
    //   flexDirection="column"
    //   alignItems="center"
    //   gridGap={3}
    //   pt={5}
    // >
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    // </Box>
  );
};
