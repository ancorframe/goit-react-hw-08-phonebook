import { Box } from 'components/Box';
// import { SingUp } from 'components/SingUp/SingUp';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import BoxM from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SingUpForm } from 'components/SingUp/SingUpForm';
import { Link } from 'components/SingUp/SingUp.styled';
import { useSelector } from 'react-redux';
import { getAuthIsLoading } from 'redux/selectors';
import { SpinnerLoader } from 'components/SpinnerLoader/SpinnerLoader';
// import { Link } from './SingUp.styled';

export const SingUpPage = () => {
  const isLoading = useSelector(getAuthIsLoading);

  return (
    <>
      {!isLoading ? (
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
          <BoxM
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AppRegistrationIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <SingUpForm />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </BoxM>
        </Container>
      ) : (
        // </Box>
        <Box
          as="main"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <SpinnerLoader />
        </Box>
      )}
    </>
  );
};
