import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Match } from '../types/Match'
import type { Hamster } from '../types/Hamster'

const baseUrl = ""

export const matchesApi = createApi({
    reducerPath: 'matchesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),

    endpoints: (builder) => ({
        getAllMatches: builder.query<Match[], void>({
            query: () => `/matches`,
        }),
        getOneMatch: builder.query<Match, string>({
            query: (id) => `/matches/${id}`,
        }),
        addOneMatch: builder.mutation<Match, Match>({
            query: (match) => ({
                url: `/matches`,
                method: 'POST',
                body: match
            }),
        }),
        deleteOneMatch: builder.mutation<Match, string>({
            query: (id) => ({
                url: `/matches/${id}`,
                method: 'DELETE',
            }),
        }),
        getOneMatchWinner: builder.query<Match[], string>({
            query: (id) => `/matchWinners/${id}`,
        }),
        getAllWinners: builder.query<Hamster[], void>({
            query: () => `/winners`,
        }),
        getAllLosers: builder.query<Hamster[], void>({
            query: () => `/losers`,
        }),
        getDefeatedHamsters: builder.mutation<Match[], string>({
            query: (id) => `/matchWinners/${id}`,
        }),
    })
})
export const {
    useGetAllMatchesQuery,
    useGetOneMatchQuery,
    useAddOneMatchMutation,
    useDeleteOneMatchMutation,
    useGetOneMatchWinnerQuery,
    useGetAllWinnersQuery,
    useGetAllLosersQuery,
    useGetDefeatedHamstersMutation

} = matchesApi