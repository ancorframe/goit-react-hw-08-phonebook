import React from 'react';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';
import { getAllContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsApi';
import { useDispatch, useSelector } from 'react-redux';
import { notifyError, notifySuccess, notifyWarning } from 'helpers/notify';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { FormControlLabel } from '@mui/material';

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

export const ContactForm = () => {
  const nameId = nanoid();
  const numberId = nanoid();
  const emailId = nanoid();
  const favoriteId = nanoid();
  const contacts = useSelector(getAllContacts);
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    favorite: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: values => {
      if (
        contacts.find(
          contact => contact.name.toLowerCase() === values.name.toLowerCase()
        )
      ) {
        return notifyWarning(`${values.name} is already in contacts.`);
      }
      dispatch(addContact(values))
        .unwrap()
        .then(() => notifySuccess(`Contact add to contacts book`))
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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ContactPhoneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Contact
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id={favoriteId}
                  name="favorite"
                  checked={formik.values.favorite}
                  onChange={formik.handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
              }
              label="favorite"
            />

            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Add contact
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
};
