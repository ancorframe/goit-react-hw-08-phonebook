import { createSelector } from '@reduxjs/toolkit';

const store = state => state;
const contacts = state => state.contacts;
const filter = state => state.filter.value;
export const getFilteredContacts = createSelector(
  [contacts, filter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact => {
      return contact.toLowerCase().includes(normalizedFilter);
    });
  }
);

export const getAllContacts = createSelector(store, state => state.contacts.contacts);

export const getIsLoading = createSelector(store, state => state.contacts.isLoading);

export const getError = createSelector(store, state => state.contacts.error);

export const getFilter = createSelector(store, state => state.filter);

export const getUser = createSelector(store, state => state.auth.user);

export const getToken = createSelector(store, state => state.auth.token);

export const getStatus = createSelector(store, state => state.auth.isLoggedIn);
