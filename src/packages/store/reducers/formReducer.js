import { createSlice } from "@reduxjs/toolkit";

const FormDataSlice = createSlice({
    name: "FormData",
    initialState: {
        firstName:"",
        lastName: "",
        file: null
    },
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setFile: (state, action) => {
            state.file = action.payload;
        },
        clearFormData: (state) => {
            state.firstName = "";
            state.lastName = "";
            state.file = null;
        },

    }
})

export const {setFirstName, setLastName, setFile, clearFormData} = FormDataSlice.actions;

export default FormDataSlice.reducer;
