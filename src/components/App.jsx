import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { Box } from './Box';
import { Layout } from './Layout';
import { NotFoundPage } from 'pages/NotFoundPage';
// import { useGetCurrentMutation } from 'redux/authApi';
import { useDispatch, useSelector } from 'react-redux';
// import { updateUser, updateStatus } from 'redux/authSlice';
// import { useToken } from '../redux/selectors';
import { PrivateRoute } from 'Helpers/PrivateRoute';
import { RestrictedRoute } from 'Helpers/PublicRoute';
import { SpinnerLoader } from './SpinnerLoader/SpinnerLoader';
import {  getToken } from 'redux/selectors';
import { getCurrent } from 'redux/authApi';

const SingUpPage = lazy(() =>
  import('../pages/SingUpPage').then(module => ({
    default: module.SingUpPage,
  }))
);
const LoginPage = lazy(() =>
  import('../pages/LoginPage').then(module => ({
    default: module.LoginPage,
  }))
);
const ContactsPage = lazy(() =>
  import('../pages/ContactsPage').then(module => ({
    default: module.ContactsPage,
  }))
);

export const App = () => {
  const dispatch = useDispatch();
    // const isLoggedIn = useSelector(getStatus);
const token = useSelector(getToken)



  useEffect(() => {
    if (token) {
      dispatch(getCurrent);
    }
  }, [dispatch, token]);

  return (
    <>
      {/* {!isLoading ? ( */}
        <Box px={3}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="login" />} />
              <Route
                path="register"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<SingUpPage />}
                  />
                }
              />
              <Route
                path="login"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<LoginPage />}
                  />
                }
              />
              <Route
                path="contacts"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<ContactsPage />}
                  />
                }
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      {/* ) : ( */}
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
      {/* )} */}
    </>
  );
};
