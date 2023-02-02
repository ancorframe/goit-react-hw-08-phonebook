import { Box } from 'components/Box';
import { getStatus, getUser } from 'redux/selectors';
import { ButtonLink } from './AppBar.styled';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

export const AppBar = () => {
  const isLoggedIn = useSelector(getStatus);
  const user = useSelector(getUser);

  return (
    <Box as="header" borderBottom="normal" mb={3}>
      <Box as="nav" display="flex" gridGap={4} p={4} alignItems="center">
        <ButtonLink to="contacts">Contacts</ButtonLink>
        {!isLoggedIn && (
          <Box ml="auto" gridGap={4} display="flex" alignItems="center">
            <ButtonLink to="register">Register</ButtonLink>
            <ButtonLink to="login">Login</ButtonLink>
          </Box>
        )}
        {isLoggedIn && (
          <Box ml="auto" display="flex" alignItems="center" gridGap={4}>
            <Box
              as="img"
              src={user.avatarURL}
              alt=""
              width="40px"
              height="40px"
              borderRadius="50%"
            />
            <Link to="/userSettings">
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <SettingsIcon />
              </Avatar>
            </Link>
          </Box>
        )}
      </Box>
      <ToastContainer />
    </Box>
  );
};
