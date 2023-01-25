import React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { update } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onChange = e => {
    const value = e.target.value.trim();
    dispatch(update(value));
  };

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
            <PersonSearchIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Find contact by name
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            name="filter"
            label="Name"
            value={filter}
            onChange={onChange}
          />
        </Box>
      </Container>
    </>
  );
};
