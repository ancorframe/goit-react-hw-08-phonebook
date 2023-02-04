import { createSelector } from '@reduxjs/toolkit';

const store = state => state;
const contacts = state => state.contacts.contacts;
const filterValue = state => state.filter.value;

export const getFilteredContacts = createSelector(
  [contacts, filterValue],
  (contacts, filterValue) => {
    const normalizedFilter = filterValue.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
export const getAllContacts = createSelector(
  store,
  state => state.contacts.contacts
);

export const getFilter = createSelector(store, state => state.filterValue);

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

export const getPage = createSelector(store, state => state.contacts.page);

export const getTotalPage = createSelector(
  store,
  state => state.contacts.totalPage
);

export const getFilterQuery = createSelector(
  store,
  state => state.filter.favorite
);
