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

// initial data with dummy data
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
    // simply push the new field object to the array
    updateFormData: (state, action: PayloadAction<FormFieldsState>) => {
      state.value.fields.push(action.payload);
    },

    // reset the array to []
    resetFormData: (state) => {
      state.value.fields = [];
    },

    // toggle by id
    toggleRequire: (state, action: PayloadAction<string>) => {
      // find the element from the array
      const field = state.value.fields.find(
        (field) => field.id === action.payload,
      );
      if (field) {
        // if on then off , off then on
        field.required = !field.required;
      }
    },

    // delete by id
    deleteField: (state, action: PayloadAction<string>) => {
      state.value.fields = state.value.fields.filter(
        (field) => field.id !== action.payload,
      );
    },
  },
});

// export the functions
export const { updateFormData, resetFormData, toggleRequire, deleteField } =
  formDataSlice.actions;
