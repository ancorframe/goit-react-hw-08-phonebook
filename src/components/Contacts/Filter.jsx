import React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterQuery, updateValue } from 'redux/filterSlice';
import { getFilter, getFilterQuery } from 'redux/selectors';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getContacts } from 'redux/contactsApi';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const filterQuery = useSelector(getFilterQuery);

  const onChange = e => {
    const value = e.target.value.trim();
    dispatch(updateValue(value));
  };
  const onSelectChange = e => {
    console.log(e.target.value);
    dispatch(updateFilterQuery(e.target.value));
    dispatch(getContacts());
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
            autoComplete="off"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Filter by favorite
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterQuery}
              label="Filter by favorite"
              onChange={onSelectChange}
            >
              <MenuItem value={null}>All</MenuItem>
              <MenuItem value={'true'}>All favorite</MenuItem>
              <MenuItem value={'false'}>All not fovorite</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>
    </>
  );
};
