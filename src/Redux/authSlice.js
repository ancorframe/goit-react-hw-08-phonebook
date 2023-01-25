import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, login, logout, getCurrent, updateSubscription, updateAvatar, forgotPasswordUser, restorePasswordUser } from './authApi';

const extraActions = [
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  forgotPasswordUser,
  restorePasswordUser,
];

const getActions = type => isAnyOf(...extraActions.map(action => action[type]));

const registerReducer = (state, action) => {};

const loginReducer = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const logoutReducer = (state, action) => {
  state.user = { name: '', email: '' };
  state.token = null;
  state.isLoggedIn = false;
};

const getCurrentReducer = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const updateSubscriptionReducer = (state, action) => {
  state.subscription = action.payload;
};

const updateAvatarReducer = (state, action) => {};

const forgotPasswordUserReducer = (state, action) => {};

const restorePasswordUserReducer = (state, action) => {};

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

const initialState = {
  user: {
    name: '',
    email: '',
    subscription: '',
    avatarURL: '',
  },
  token: null,
  isLoggedIn: false,
  isLoading:false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, registerReducer)
      .addCase(login.fulfilled, loginReducer)
      .addCase(logout.fulfilled, logoutReducer)
      .addCase(getCurrent.fulfilled, getCurrentReducer)
      .addCase(updateSubscription.fulfilled, updateSubscriptionReducer)
      .addCase(updateAvatar.fulfilled, updateAvatarReducer)
      .addCase(forgotPasswordUser.fulfilled, forgotPasswordUserReducer)
      .addCase(restorePasswordUser.fulfilled, restorePasswordUserReducer)
      .addMatcher(getActions('pending'), pendingReduser)
      .addMatcher(getActions('rejected'), rejectedReducer)
      .addMatcher(getActions('fulfilled'), fulfilledReducer);
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
