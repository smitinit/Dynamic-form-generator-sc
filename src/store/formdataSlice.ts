import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormFieldsState {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  options?: string[];
}

interface FormState {
  value: {
    fields: FormFieldsState[];
  };
}

const initialState: FormState = {
  value: {
    fields: [
      {
        type: "input",
        label: "Name",
        id: "name",
        required: true,
      },
      {
        type: "checkbox",
        label: "Subscribe to Newsletter",
        id: "subscribe",
      },
      {
        type: "radio",
        label: "Gender",
        id: "gender",
        options: ["Male", "Female"],
      },
      {
        type: "select",
        label: "Country",
        id: "country",
        options: ["USA", "Canada", "UK", "Other"],
      },
    ],
  },
};

export const formDataSlice = createSlice({
  name: "formdata",

  initialState,

  reducers: {
    updateFormData: (state, action: PayloadAction<FormFieldsState>) => {
      state.value.fields.push(action.payload);
    },
    resetFormData: (state) => {
      state.value.fields = [];
    },
    toggleRequire: (state, action: PayloadAction<string>) => {
      const field = state.value.fields.find(
        (field) => field.id === action.payload,
      );
      if (field) {
        field.required = !field.required;
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.value.fields = state.value.fields.filter(
        (field) => field.id !== action.payload,
      );
    },
  },
});

export const { updateFormData, resetFormData, toggleRequire, deleteField } =
  formDataSlice.actions;
