import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  value: Record<string, unknown>;
}

const initialState: FormState = {
  value: { fields: [] },
};

export const formDataSlice = createSlice({
  name: "formdata",

  initialState,

  reducers: {
    updateFormData: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.value = { ...state.value, ...action.payload };
    },
    resetFormData: (state) => {
      state.value = {};
    },
  },
});

export const { updateFormData, resetFormData } = formDataSlice.actions;
