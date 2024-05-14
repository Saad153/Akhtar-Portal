import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
  companies:{}
}

export const companySlice = createSlice({
  name: 'company',
  initialState:initialState,
  reducers: {
    addCompany: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { addCompany } = companySlice.actions

export default companySlice.reducer