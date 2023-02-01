// import Button from '@mui/material/Button';
import { Box } from 'components/Box';
// import { notifyError } from 'helpers/notify';
import { useDispatch, useSelector } from 'react-redux';
// import { logout } from 'redux/authApi';
import { getUser } from 'redux/selectors';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

export const UserMenu = () => {
  // const dispatch = useDispatch();
  const user = useSelector(getUser);

  // const handleLogout = () => {
  //   dispatch(logout())
  //     .unwrap()
  //     .then()
  //     .catch(error => notifyError(`${error}`));
  // };

  return (
    <>
      <Box ml="auto" display="flex" alignItems="center" gridGap={4}>
        {/* <p>{user.name}</p> */}
        {/* <p>{user.email}</p> */}
        {/* <p>{user.subscription}</p> */}
        <Box
          as="img"
          src={user.avatarURL}
          alt=""
          width="40px"
          height="40px"
          borderRadius="50%"
        />
        <Link to='/userSettings'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <SettingsIcon />
        </Avatar>
        </Link>
        
        {/* <Button
          variant="outlined"
          type="button"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button> */}
      </Box>
    </>
  );
};
