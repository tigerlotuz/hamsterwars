import { configureStore } from "@reduxjs/toolkit";
import { hamsterApi } from "../features/hamsterApi";
import { matchesApi } from "../features/matchesApi";
// import hamsterReducer from '../features/hamsterSlice'


export const store = configureStore({
    reducer: {
        [hamsterApi.reducerPath]: hamsterApi.reducer,
        [matchesApi.reducerPath]: matchesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(hamsterApi.middleware, matchesApi.middleware)
})

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>