import { createSlice } from "@reduxjs/toolkit";

const FormDataSlice = createSlice({
    name: "FormData",
    initialState: {
        firstName:""
    },
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
    }
})

export const FormDataActions = FormDataSlice.actions;

export default FormDataSlice.reducer;
