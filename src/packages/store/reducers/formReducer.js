import { createSlice } from "@reduxjs/toolkit";

const FormDataSlice = createSlice({
    name: "FormData",
    initialState: {
        title: "",
        file: null
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setFile: (state, action) => {
            state.file = action.payload;
        },
        clearFormData: (state) => {
            state.title = "";
            state.file = null;
        },

    }
})

export const {setTitle, setFile, clearFormData} = FormDataSlice.actions;

export default FormDataSlice.reducer;
