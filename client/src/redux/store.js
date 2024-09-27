import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { useReducer } from "react";
import  userReducer  from "./user/userSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";



const rootReducer = combineReducers({ user:userReducer });
const persistConfig = {
    key: 'root', // key for the root level of state
    version: 1,
    storage,     // storage mechanism (can be localStorage, sessionStorage, etc.)
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})


export const persistor = persistStore(store); // rehydrate state