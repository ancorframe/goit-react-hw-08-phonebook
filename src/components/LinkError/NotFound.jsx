import { Box } from 'components/Box';
import { HomeLink } from './NotFound.styled';

export const NotFound = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <h1>Page Not Found! Please check URL!!</h1>
      <HomeLink to="/">Go Home</HomeLink>
    </Box>
  );
};
