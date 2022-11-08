import { Box } from 'components/Box';
import { useStatus } from 'Redux/Selectors';
import { ButtonLink } from './AppBar.styled';
import { UserMenu } from '../UserMenu/UserMenu';

export const AppBar = () => {
  const { isLoggedIn } = useStatus();

  return (
    <Box as="header" borderBottom="normal" mb={3}>
      <Box as="nav" display="flex" gridGap={4} p={4}>
        <ButtonLink to="contacts">Contacts</ButtonLink>
        {!isLoggedIn && (
          <Box ml="auto" gridGap={4} display="flex" alignItems="center">
            <ButtonLink to="register">Register</ButtonLink>
            <ButtonLink to="login">Login</ButtonLink>
          </Box>
        )}

        {isLoggedIn && <UserMenu />}
      </Box>
    </Box>
  );
};
