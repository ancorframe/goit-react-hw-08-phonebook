import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { Box } from 'components/Box';
import { useFormik } from 'formik';
// import { useSignupMutation } from 'redux/authApi';
import { useDispatch } from 'react-redux';
// import { updateToken } from '../../redux/authSlice';
import { register } from 'redux/authApi';
import { toast } from 'react-toastify';


const validationSchema = Yup.object().shape({
  // name: Yup.string('Enter your name').required('name is required'),
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export const SingUpForm = () => {
  // const [verify, setVerify] = useState(null);
  const notify = text =>
    toast.success(`${text}`, {
      theme: 'dark',
    });
  const dispatch = useDispatch();
  const controller = new AbortController();

  const initialValues = {
    // name: '',
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(register(values, controller))
        .unwrap()
        .then(originalPromiseResult => {
          console.log(originalPromiseResult);
          notify('check your email to verify');
          // setVerify(true);
          // handle result here
        });
    },
  });

  //   if (cancellSignal) {
  //   controller.abort();
  // }

  return (
    <>
  
        <Box as="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          {/* <TextField
          margin="normal"
          fullWidth
          required
          id="name"
          name="name"
          label="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        /> */}
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
            Register
          </Button>
        </Box>

    </>
  );
};
