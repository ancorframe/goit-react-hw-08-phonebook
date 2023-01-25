import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { Box } from './Box';
import { Layout } from './Layout';
import { NotFoundPage } from 'pages/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { PrivateRoute } from 'Helpers/PrivateRoute';
import { RestrictedRoute } from 'Helpers/PublicRoute';
import { SpinnerLoader } from './SpinnerLoader/SpinnerLoader';
import { getAuthIsLoading, getToken } from 'redux/selectors';
import { getCurrent } from 'redux/authApi';
import { notifyError } from 'Helpers/notify';

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
  const token = useSelector(getToken);
  const isLoading = useSelector(getAuthIsLoading);

  useEffect(() => {
    const contoller = new AbortController();
    if (token) {
      dispatch(getCurrent(contoller.signal))
        .unwrap()
        .then()
        .catch(error => notifyError(`${error}`));
    }
    return () => contoller.abort();
  }, [dispatch, token]);

  return (
    <>
      {!isLoading ? (
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
