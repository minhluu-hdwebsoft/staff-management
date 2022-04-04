import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import employeeSaga from "../modules/Employee/saga";
import employeeReducer from "../modules/Employee/slice";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }).concat(saga),
});

saga.run(employeeSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
