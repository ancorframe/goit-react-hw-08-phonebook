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
import { notifyError } from 'helpers/notify';
import { PasswordForm } from 'components/AuthForns/PasswordForm';
import { useNavigate } from 'react-router-dom';

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
      dispatch(restorePasswordUser({ password, token }))
        .unwrap()
        .then(() => navigate('/login'))
        .catch(error => {
          notifyError(`${error}`);
        });
    }
    return () => {};
  }, [dispatch, navigate, password, token]);

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
              <PasswordForm setPassword={setPassword} />
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
