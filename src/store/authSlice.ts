import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import { loadState } from "./localStorage";
// interfaces
import { Iuser } from "../interfaces/user";

interface IauthSliceState {
  token: string | null;
  user: Iuser | null;
}

const persistedState = loadState();

const initialState = persistedState
  ? ({
      token: persistedState.auth.token,
      user: persistedState.auth.user,
    } as IauthSliceState)
  : ({ token: null, user: null } as IauthSliceState);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<Iuser>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setToken, setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
