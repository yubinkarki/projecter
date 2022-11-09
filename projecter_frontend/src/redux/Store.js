import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import loginReducer from "./reducers/LoginReducer";
import userReducer from "./reducers/UserReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
