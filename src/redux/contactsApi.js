import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const filterQuery = state.filter.favorite;
      const page = state.contacts.page;
      const options = {
        params: {
          favorite: filterQuery,
          page,
        },
      };
      const response = await axios.get('/contacts?', options);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const getContactById = createAsyncThunk(
  'contacts/getContactById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/contacts`, contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteContactById = createAsyncThunk(
  'contacts/deleteContactById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateContactById = createAsyncThunk(
  'contacts/updateContactById',
  async ({ values, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/contacts/${id}`, values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateFavoriteById = createAsyncThunk(
  'contacts/updateFavoriteById',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/contacts/${id}/favorite`, body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
