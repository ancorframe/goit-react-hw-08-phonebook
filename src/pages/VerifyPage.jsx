import { Box } from 'components/Box';
import { notifyError } from 'helpers/notify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { verifyUser } from 'redux/authApi';
import { getAuthIsLoading } from 'redux/selectors';
import { SpinnerLoader } from '../components/SpinnerLoader/SpinnerLoader';
import { useNavigate } from 'react-router-dom';

export const VerifyPage = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getAuthIsLoading);
  const navigate = useNavigate();


  useEffect(() => {

    if (!token) {
      return;
    }
    // const controller = new AbortController();
    // const { signal } = controller;
    dispatch(verifyUser(token))
      .unwrap()
      .then(()=>navigate('/login'))
      .catch(error => notifyError(`${error}`));
    return () => {
      // controller.abort();
    };
  }, [dispatch, navigate, token]);

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
