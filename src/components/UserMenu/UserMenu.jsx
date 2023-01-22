import Button from '@mui/material/Button';

import { Box } from 'components/Box';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/authApi';
import { getUser } from 'redux/selectors';


export const UserMenu = () => {
  const dispatch = useDispatch();
const user = useSelector(getUser)
  const handleLogout = () => {
   dispatch(logout())
  };
  return (
    <>
      <Box ml="auto" display="flex" alignItems="center" gridGap={4}>
        <p>{user.name}</p>
        <p>{user.email}</p>

        <Button
          variant="outlined"
          type="button"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </>
  );
};
