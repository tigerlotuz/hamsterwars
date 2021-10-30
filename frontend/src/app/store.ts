import { configureStore } from "@reduxjs/toolkit";
import { hamsterApi } from "../features/hamsterApi";
// import hamsterReducer from '../features/hamsterSlice'


export const store = configureStore({
    reducer: {
        [hamsterApi.reducerPath]: hamsterApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(hamsterApi.middleware)
})

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>