import { configureStore } from "@reduxjs/toolkit";
import states from "./slices/statesSlice";

export default configureStore({
  reducer: {
    states: states,
  },
});
