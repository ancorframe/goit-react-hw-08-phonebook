import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import produce from 'immer';
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
  if (!action.payload) {
    return;
  }
  state.contacts = action.payload.contacts;
  state.totalPage = action.payload.totalPage;
  return state;
};

const getContactByIdReducer = (state, action) => {};

const addContactReducer = (state, action) => {
  // state.contacts.push(action.payload.contact);
};

const deleteContactByIdReducer = (state, action) => {
  // const index = state.contacts.findIndex(
  //   contact => contact._id === action.meta.arg
  // );
  // state.contacts.splice(index, 1);
};

const updateContactByIdReducer = (state, action) => {
  const index = state.contacts.findIndex(
    contact => contact._id === action.payload.updateContact._id
  );
  state.contacts.splice(index, 1, action.payload.updateContact);
};

const updateFavoriteByIdReducer = (state, action) => {
  const updatedState = produce(state, draft => {
    const index = draft.contacts.findIndex(
      contact => contact._id === action.payload.update._id
    );
    draft.contacts[index].favorite = action.payload.update.favorite;
  });
  return updatedState;
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
    page: 1,
    totalPage: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    updatePage: (state, action) => {
      state.page = action.payload;
    },
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

export const { updatePage } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
