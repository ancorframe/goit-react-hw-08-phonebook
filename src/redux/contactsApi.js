import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/contacts';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (signal) => {
    try {
      const response = await axios.get('/',{signal});
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getContactById = createAsyncThunk(
  'contacts/getContactById',
  async id => {
    try {
      const response = await axios.get(`/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    try {
      const response = await axios.post(`/${contact.id}`, contact);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteContactById = createAsyncThunk(
  'contacts/deleteContactById',
  async id => {
    try {
      const response = await axios.delete(`/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateContactById = createAsyncThunk(
  'contacts/updateContactById',
  async contact => {
    const { id } = contact;
    try {
      const response = await axios.put(`/${id}`, contact);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateFavoriteById = createAsyncThunk(
  'contacts/updateFavoriteById',
  async id => {
    try {
      const response = await axios.patch(`/${id}/favorite`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
