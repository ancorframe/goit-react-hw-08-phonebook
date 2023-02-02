import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { Box } from './Box';
import { Layout } from './Layout';
import { NotFoundPage } from 'pages/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { PrivateRoute } from 'helpers/PrivateRoute';
import { RestrictedRoute } from 'helpers/PublicRoute';
import { SpinnerLoader } from './SpinnerLoader/SpinnerLoader';
import {  getToken } from 'redux/selectors';
import { getCurrent } from 'redux/authApi';
import { notifyError } from 'helpers/notify';
import { useState } from 'react';

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

const VerifyPage = lazy(() =>
  import('../pages/VerifyPage').then(module => ({
    default: module.VerifyPage,
  }))
);

const ForgotPasswordPage = lazy(() =>
  import('../pages/ForgotPasswordPage').then(module => ({
    default: module.ForgotPasswordPage,
  }))
);

const RestorePasswordPage = lazy(() =>
  import('../pages/RestorePasswordPage').then(module => ({
    default: module.RestorePasswordPage,
  }))
);

const SettingsPage = lazy(() =>
  import('../pages/SettingsPage').then(module => ({
    default: module.SettingsPage,
  }))
);

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  // const isLoading = useSelector(getAuthIsLoading);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const contoller = new AbortController();
    if (token) {
      (async () => {
        try {
          await dispatch(getCurrent(contoller.signal));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          notifyError(`${error}`);
        }
      })();
    }
    if (!token) {
      setIsLoading(false);
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
              <Route
                path="verify/:token"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<VerifyPage />}
                  />
                }
              />
              <Route
                path="forgotPassword"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<ForgotPasswordPage />}
                  />
                }
              />
              <Route
                path="restorePassword/:token"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<RestorePasswordPage />}
                  />
                }
              />
              <Route
                path="userSettings"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<SettingsPage />}
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
