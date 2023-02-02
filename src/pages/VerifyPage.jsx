import { Box } from 'components/Box';
import { notifyError, notifySuccess } from 'helpers/notify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { verifyUser } from 'redux/authApi';
import { getAuthIsLoading, getError } from 'redux/selectors';
import { SpinnerLoader } from '../components/SpinnerLoader/SpinnerLoader';
import { useNavigate } from 'react-router-dom';

export const VerifyPage = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getAuthIsLoading);
  const navigate = useNavigate();
  const error = useSelector(getError);
  useEffect(() => {
    if (!token) {
      return;
    }
    (async () => {
      try {
        await dispatch(verifyUser(token)).unwrap();
        notifySuccess(`verification success`);
        navigate('/login');
      } catch (error) {
        notifyError(`${error}`);
      }
    })();
  }, [dispatch, navigate, token]);
  if (error) {
    return <>error</>;
  }
  return (
    <>
      {!isLoading ? (
        <>success</>
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
