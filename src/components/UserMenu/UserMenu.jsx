import Button from '@mui/material/Button';
import { Box } from 'components/Box';
import { notifyError } from 'Helpers/notify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/authApi';
import { getUser } from 'redux/selectors';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then()
      .catch(error => notifyError(`${error}`));
  };

  return (
    <>
      <Box ml="auto" display="flex" alignItems="center" gridGap={4}>
        {/* <p>{user.name}</p> */}
        <p>{user.email}</p>
        <Box as='img' src={user.avatarURL} alt='' width='40px' height='40px' borderRadius='50%'/>
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
