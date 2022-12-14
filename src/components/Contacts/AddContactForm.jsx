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
import { ToastContainer, toast } from 'react-toastify';
import { useGetContactQuery, useCreateContactMutation } from 'API/contactsApi';

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(13, 'Too Short!')
    .max(13, 'Too Long!')
    .required('Required'),
});

export const ContactForm = () => {
  const notify = text =>
    toast.success(`${text}`, {
      theme: 'dark',
    });

  const nameId = nanoid();
  const numberId = nanoid();
  const { data } = useGetContactQuery();
  const [addContact] = useCreateContactMutation();

  const initialValues = {
    name: '',
    number: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: values => {
      if (data.find(i => i.name.toLowerCase() === values.name.toLowerCase())) {
        return notify(`${values.name} is already in contacts.`);
      }
      addContact(values)
        .unwrap()
        .then(({ name }) => {
          notify(`${name} was added`);
          formik.resetForm();
        })
        .catch(({ error }) => notify(`${error}`));
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
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id={numberId}
              name="number"
              label="Number"
              type="tel"
              value={formik.values.number}
              onChange={formik.handleChange}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
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
