import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import BoxM from '@mui/material/Box';
import PasswordIcon from '@mui/icons-material/Password';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from 'components/Box';
import { EmailForm } from 'components/AuthForns/EmailForm';
import { SpinnerLoader } from 'components/SpinnerLoader/SpinnerLoader';
import { notifyError, notifySuccess } from 'helpers/notify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordUser } from 'redux/authApi';
import { getAuthIsLoading } from 'redux/selectors';
import { Link } from 'components/SingUp/SingUp.styled';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState(null);

  const isLoading = useSelector(getAuthIsLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!email) {
      return;
    }
    dispatch(forgotPasswordUser(email))
      .unwrap()
      .then(() => notifySuccess(`Please check your email`))
      .catch(error => notifyError(`${error}`));
    return () => {};
  }, [dispatch, email]);

  return (
    <>
      {!isLoading ? (
        <>
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
                  <PasswordIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Forgot Password
                </Typography>
                <EmailForm setEmail={setEmail} />
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login">Go to login</Link>
                  </Grid>
                </Grid>
              </BoxM>
            </Container>
        </>
      ) : (
        <>
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
        </>
      )}
    </>
  );
};
