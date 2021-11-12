import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Hamster, HamsterUpdate, HamsterCreate } from '../types/Hamster'

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
        addOneHamster: builder.mutation<Hamster, HamsterCreate>({
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
        deleteOneHamster: builder.mutation<Hamster, any>({
            query: (id) => ({
                url: `/hamsters/${id}`,
                method: 'DELETE',
            }),
        }),
        getOneHamsterById: builder.mutation<Hamster, any>({
            query: (id) => `/hamsters/${id}`,
        }),
        getOneRandomHamster: builder.mutation<Hamster, void>({
            query: () => `/hamsters/random`,
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
    useDeleteOneHamsterMutation,
    useGetOneHamsterByIdMutation,
    useGetOneRandomHamsterMutation
} = hamsterApi