import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FormFieldsState {
  type: string;
  label: string;
  name: string;
  required?: boolean;
  options?: string[];
}

interface FormState {
  value: { fields: FormFieldsState[] | null };
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
      state.value = initialState.value;
    },
  },
});

export const { updateFormData, resetFormData } = formDataSlice.actions;
