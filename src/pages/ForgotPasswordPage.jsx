import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import BoxM from '@mui/material/Box';
import PasswordIcon from '@mui/icons-material/Password';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from 'components/Box';
import { SpinnerLoader } from 'components/SpinnerLoader/SpinnerLoader';
import { notifyError, notifySuccess } from 'helpers/notify';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordUser } from 'redux/authApi';
import { getAuthIsLoading } from 'redux/selectors';
import { Link } from 'components/SingUp/SingUp.styled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const schema = Yup.object().shape({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

export const ForgotPasswordPage = () => {
  const [success, setSuccess] = useState(null);

  const isLoading = useSelector(getAuthIsLoading);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: schema,
    onSubmit: async values => {
      try {
        await dispatch(forgotPasswordUser(values)).unwrap();
        setSuccess(true);
        notifySuccess(`Please check your email`);
      } catch (error) {
        notifyError(`${error}`);
      }
    },
  });

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
                  <PasswordIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Forgot Password
                </Typography>
                <Box as="form" onSubmit={formik.handleSubmit} width="100%">
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Send
                  </Button>
                </Box>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login">Go to login</Link>
                  </Grid>
                </Grid>
              </BoxM>
            </Container>
          ) : (
            <> success go to your email for restore password</>
          )}
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
