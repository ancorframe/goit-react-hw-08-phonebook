import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContactById,
  getContactById,
  getContacts,
  updateContactById,
  updateFavoriteById,
} from './contactsApi';

const extraActions = [
  addContact,
  deleteContactById,
  getContactById,
  getContacts,
  updateContactById,
  updateFavoriteById,
];

const getActions = type => isAnyOf(...extraActions.map(action => action[type]));

const getContactsReducer = (state, action) => {
  state.contacts = action.payload;
};

const getContactByIdReducer = (state, action) => {};

const addContactReducer = (state, action) => {
  state.contacts.push(action.payload);
};

const deleteContactByIdReducer = (state, action) => {
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.contacts.splice(index, 1);
};

const updateContactByIdReducer = (state, action) => {
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.contacts.splice(index, 1, action.payload);
};

const updateFavoriteByIdReducer = (state, action) => {
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.contacts.splice(index, 1, action.payload);
};

const pendingReduser = state => {
  state.isLoading = true;
};

const rejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fulfilledReducer = state => {
  state.isLoading = false;
  state.error = null;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(getContacts.fulfilled, getContactsReducer)
      .addCase(getContactById.fulfilled, getContactByIdReducer)
      .addCase(addContact.fulfilled, addContactReducer)
      .addCase(deleteContactById.fulfilled, deleteContactByIdReducer)
      .addCase(updateContactById.fulfilled, updateContactByIdReducer)
      .addCase(updateFavoriteById.fulfilled, updateFavoriteByIdReducer)
      .addMatcher(getActions('pending'), pendingReduser)
      .addMatcher(getActions('rejected'), rejectedReducer)
      .addMatcher(getActions('fulfilled'), fulfilledReducer);
  },
});

export const contactsReducer = contactsSlice.reducer;
