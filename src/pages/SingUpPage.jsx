import { Box } from 'components/Box';
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
import { useDispatch, useSelector } from 'react-redux';
import { getAuthIsLoading, getUser } from 'redux/selectors';
import { SpinnerLoader } from 'components/SpinnerLoader/SpinnerLoader';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { notifyError, notifySuccess } from 'helpers/notify';
import { resendVerifyEmailUser } from 'redux/authApi';

export const SingUpPage = () => {
  const [success, setSuccess] = useState(null);
  const user = useSelector(getUser);
  const isLoading = useSelector(getAuthIsLoading);
  const dispatch = useDispatch();
  const handleClick = async () => {
    const request = { email: user.email };
    try {
      await dispatch(resendVerifyEmailUser(request)).unwrap();
      notifySuccess(`We send you again. Please check email!`);
    } catch (error) {
      notifyError(`${error}`);
    }
  };

  return (
    <>
      {!isLoading ? (
        <>
          
          {!success ? (
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
                <SingUpForm setSuccess={setSuccess} />
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login">Already have an account? Sign in</Link>
                  </Grid>
                </Grid>
              </BoxM>
            </Container>
          ) : (
            <Box
              as="main"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gridGap={3}
              pt={5}
            >
              <Typography component="h1" variant="h5">
                Please check the email and follow the link.
              </Typography>
              <Typography component="h3" variant="h5">
                If you did not receive the email,
                {
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleClick}
                  >
                    click here
                  </Button>
                }
                to resend
              </Typography>
            </Box>
          )}
          
        </>
      ) : (
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
