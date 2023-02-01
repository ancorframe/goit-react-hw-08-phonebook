import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import BoxM from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateAvatar, updateSubscription } from 'redux/authApi';
import { getUser } from 'redux/selectors';
import { notifyError, notifySuccess } from 'helpers/notify';
import { Box } from 'components/Box';
import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

export const SettingsPage = () => {
  const user = useSelector(getUser);
  const [selectedImage, setSelectedImage] = useState(null);
  const [subscription, setSubscription] = useState(user.subscription);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then()
      .catch(error => notifyError(`${error}`));
  };

  const uploadAvatar = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', selectedImage);
    dispatch(updateAvatar(formData))
      .unwrap()
      .then(() => notifySuccess(`Avatar updated`))
      .catch(error => notifyError(`${error}`));
  };

  const onSubscription = e => {
    setSubscription(e.target.value);
  };

  const changeSubscription = () => {
    dispatch(updateSubscription({ subscription }))
      .unwrap()
      .then(() => notifySuccess(`Subscription updated`))
      .catch(error => notifyError(`${error}`));
  };
  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <BoxM
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <SettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Settings
          </Typography>
          <Box width="100%" mt="15px">
            <p>Email: {user.email}</p>
          </Box>
          <Box width="100%" mb="15px" mt="15px">
            <p>Subscription: {user.subscription}</p>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt='15px'
            >
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Update Subscription
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={subscription}
                  onChange={onSubscription}
                >
                  <FormControlLabel
                    value="starter"
                    control={<Radio />}
                    label="starter"
                  />
                  <FormControlLabel
                    value="pro"
                    control={<Radio />}
                    label="pro"
                  />
                  <FormControlLabel
                    value="business"
                    control={<Radio />}
                    label="business"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                variant="contained"
                type="button"
                size="small"
                onClick={changeSubscription}
                disabled={subscription === user.subscription}
              >
                Save
              </Button>
            </Box>
          </Box>
          <Grid container justifyContent="space-between" alignItems="center">
            <Box
              as="img"
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : user.avatarURL
              }
              alt=""
              width="100px"
              height="100px"
              borderRadius="50%"
            />
            <Box>
              <Box display="flex" flexDirection="column" gridGap="20px">
                <form onSubmit={uploadAvatar}>
                  <input
                    type="file"
                    name="myImage"
                    accept=".jpg, .jpeg, .png"
                    onChange={event => {
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                  <Box display="flex" justifyContent="space-between" mt='25px'>
                    <Button
                      variant="outlined"
                      type="button"
                      size="small"
                      onClick={() => setSelectedImage(null)}
                      disabled={!selectedImage}
                    >
                      Cancell
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      disabled={!selectedImage}
                    >
                      Save
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Grid>
          <Box width="100%" display="flex" justifyContent="flex-end" mt="25px">
            <Button
              variant="outlined"
              type="button"
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </BoxM>
      </Container>
    </>
  );
};
