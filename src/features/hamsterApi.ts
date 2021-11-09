import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Hamster, HamsterUpdate } from '../types/Hamster'

const baseUrl = 'https://tigerlotuz-hamsterwars.herokuapp.com'

export const hamsterApi = createApi({
    reducerPath: 'hamsterApi',
    baseQuery: fetchBaseQuery({ baseUrl }),

    endpoints: (builder) => ({
        getAllHamsters: builder.query<Hamster[], void>({
            query: () => `/hamsters`,
        }),
        getOneHamster: builder.query<Hamster, string>({
            query: (id) => `/hamsters/${id}`,
        }),
        getFirstRandomHamster: builder.query<Hamster, void>({
            query: () => `/hamsters/random`,
        }),
        getSecondRandomHamster: builder.query<Hamster, void>({
            query: () => `/hamsters/random`,
        }),
        getCutestHamster: builder.query<Hamster[], void>({
            query: () => `/hamsters/cutest`,
        }),
        addOneHamster: builder.mutation<Hamster, Hamster>({
            query: (hamster) => ({
                url: `/hamsters`,
                method: 'POST',
                body: hamster
            }),
        }),
        updateOneHamster: builder.mutation<Hamster, HamsterUpdate>({
            query: ({ hamster, id }) => ({
                url: `/hamsters/${id}`,
                method: 'PUT',
                body: hamster
            }),
        }),
        deleteOneHamster: builder.mutation<Hamster, string>({
            query: (id) => ({
                url: `/hamsters/${id}`,
                method: 'DELETE',
            }),
        }),
    })
})
export const {
    useGetAllHamstersQuery,
    useGetOneHamsterQuery,
    useGetFirstRandomHamsterQuery,
    useGetSecondRandomHamsterQuery,
    useGetCutestHamsterQuery,
    useAddOneHamsterMutation,
    useUpdateOneHamsterMutation,
    useDeleteOneHamsterMutation
} = hamsterApi