import { createSelector } from '@reduxjs/toolkit';

const store = state => state;
const contacts = state => state.contacts.contacts;
const filterQuery = state => state.filter.value;

export const getFilteredContacts = createSelector(
  [contacts, filterQuery],
  (contacts, filterQuery) => {
    const normalizedFilter = filterQuery.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
export const getAllContacts = createSelector(
  store,
  state => state.contacts.contacts
);

export const getFilter = createSelector(store, state => state.filterQuery);

export const getIsLoading = createSelector(
  store,
  state => state.contacts.isLoading
);

export const getAuthIsLoading = createSelector(
  store,
  state => state.auth.isLoading
);

export const getError = createSelector(store, state => state.contacts.error);

export const getUser = createSelector(store, state => state.auth.user);

export const getToken = createSelector(store, state => state.auth.token);

export const getStatus = createSelector(store, state => state.auth.isLoggedIn);
