import { createSlice } from "@reduxjs/toolkit";

const themeReducer = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,
  },
  reducers: {
    changeTheme(state, action) {
      console.log(action);
      switch (action.payload) {
        case "LIGHTMODE":
          return { darkMode: false };

        case "DARKMODE":
          return { darkMode: true };
        default:
          return state;
      }
    },
  },
});

export const themeActions = themeReducer.actions;
export default themeReducer;
