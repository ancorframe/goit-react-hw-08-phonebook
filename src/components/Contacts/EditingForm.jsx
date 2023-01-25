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

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(13, 'Too Short!')
    .max(13, 'Too Long!')
    .required('Required'),
});

export const EditingForm = ({ value, close }) => {
  const { _id: id } = value;
  const nameId = nanoid();
  const numberId = nanoid();
  const emailId = nanoid();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: value.name,
      email: value.email,
      phone: value.phone,
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(updateContactById({ values, id }))
        .unwrap()
        .then(() => notifySuccess(`Contact modified`))
        .catch(error => notifyError(`${error}`));
      close();
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
              required
              fullWidth
              id={nameId}
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id={emailId}
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
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

EditingForm.propTypes = {
  close: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
};
