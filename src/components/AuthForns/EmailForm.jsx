import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box } from 'components/Box';

const schema = Yup.object().shape({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

export const EmailForm = ({ setEmail }) => {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: schema,
    onSubmit: values => {
      setEmail(values);
    },
  });

  return (
    <>
      <Box as="form" onSubmit={formik.handleSubmit} width="100%">
        <TextField
          margin="normal"
          fullWidth
          required
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send
        </Button>
      </Box>
    </>
  );
};
