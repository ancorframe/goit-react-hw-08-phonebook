import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';

const schema = Yup.object().shape({
  password: Yup.string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export const PasswordForm = ({ setPassword }) => {
  const formik = useFormik({
    initialValues: { password: '' },
    validationSchema: schema,
    onSubmit: values => {
      setPassword(values);
    },
  });

  return (
    <>
      <Box as="form" onSubmit={formik.handleSubmit} width='100%'>
        <TextField
          margin="normal"
          fullWidth
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
