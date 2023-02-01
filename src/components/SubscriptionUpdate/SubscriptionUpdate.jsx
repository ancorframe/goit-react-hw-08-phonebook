import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { updateContactById } from 'redux/contactsApi';
import { notifyError, notifySuccess } from 'helpers/notify';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { FormControlLabel } from '@mui/material';

export const SubscriptionUpdate = ({ close }) => {
  const formik = useFormik({
    initialValues: {
      name: value.name,
      email: value.email,
      phone: value.phone,
      favorite: value.favorite,
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(updateContactById({ values, id }))
        .unwrap()
        .then(() => {
          notifySuccess(`Contact modified`);
          close();
        })
        .catch(error => notifyError(`${error}`));
    },
  });

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '15px',
            borderRadius: '4px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ModeEditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit contact
          </Typography>
          <Box as="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              required
              id={numberId}
              name="phone"
              label="Phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
