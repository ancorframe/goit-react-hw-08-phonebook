import { AppBar } from 'components/AppBar/AppBar';
import { Box } from 'components/Box';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Box>
        <AppBar />
        <Suspense fullback={null}>
          <Outlet />
        </Suspense>
      </Box>
    </>
  );
};
