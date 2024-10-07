import { configureStore } from "@reduxjs/toolkit";

import FormDataSlice from "./reducers/formReducer"

const store = configureStore({
  reducer: {
    formData: FormDataSlice,
  },
});

export default store;
