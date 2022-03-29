import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi } from "./postApiSlice";
import { userApi } from "./userApiSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  // get state from localStorage
  // preloadedState: loadState(),
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(postApi.middleware, userApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
