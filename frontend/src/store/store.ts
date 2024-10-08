import {configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
    user : userReducer
});


const store = configureStore({
    reducer: rootReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export { store};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;