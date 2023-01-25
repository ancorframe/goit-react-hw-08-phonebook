import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (signal, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts', { signal });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
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
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/contacts/${id}/favorite`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
