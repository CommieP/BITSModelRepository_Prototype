import { configureStore } from "@reduxjs/toolkit";

import FormDataSlice from "./reducers/formReducer"
import UserDataSlice from "./reducers/userReducer"

const store = configureStore({
  reducer: {
    formData: FormDataSlice,
    userData: UserDataSlice
  },
});

export default store;
