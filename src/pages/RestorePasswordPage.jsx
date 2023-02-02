import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import BoxM from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from 'components/Box';
import { SpinnerLoader } from 'components/SpinnerLoader/SpinnerLoader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { restorePasswordUser } from 'redux/authApi';
import { getAuthIsLoading } from 'redux/selectors';
import { notifyError, notifySuccess } from 'helpers/notify';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const schema = Yup.object().shape({
  password: Yup.string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export const RestorePasswordPage = () => {
  const navigate = useNavigate();
  const isLoading = useSelector(getAuthIsLoading);
  const [password, setPassword] = useState(null);
  const { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }
    if (password) {
      (async () => {
        try {
          await dispatch(restorePasswordUser({ password, token })).unwrap();
          notifySuccess(`password  changed`);
          navigate('/login');
        } catch (error) {
          notifyError(`${error}`);
        }
      })();
    }
  }, [dispatch, navigate, password, token]);

  const formik = useFormik({
    initialValues: { password: '' },
    validationSchema: schema,
    onSubmit: values => {
      setPassword(values);
    },
  });

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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box as="form" onSubmit={formik.handleSubmit} width="100%">
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send
                </Button>
              </Box>{' '}
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
