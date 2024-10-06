import { configureStore } from "@reduxjs/toolkit";

import FormDataSlice from "./reducers/formReducer"

const store = configureStore({
  reducer: {
    FormDataReducer: FormDataSlice,
  },
});

export default store;
