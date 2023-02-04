import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: '',
    // page: 1,
    // totalPage: 0,
    favorite: null,
  },
  reducers: {
    updateValue: (state, action) => {
      state.value = action.payload;
    },
    // updatePage: (state, action) => {
    //   state.page = action.payload;
    // },
    // updateTotalPage: (state, action) => {
    //   state.totalPage = action.payload;
    // },
    updateFilterQuery: (state, action) => {
      state.favorite = action.payload;
    },
  },
});

export const { updateValue, updateFilterQuery } = filterSlice.actions;

export default filterSlice.reducer;
