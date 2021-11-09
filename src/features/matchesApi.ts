import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Match } from '../types/Match'

const baseUrl = 'https://tigerlotuz-hamsterwars.herokuapp.com'

export const matchesApi = createApi({
    reducerPath: 'matchesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),

    endpoints: (builder) => ({
        getAllMatches: builder.query<Match[], void>({
            query: () => `/matches`,
        }),

    })
})
export const {
    useGetAllMatchesQuery,

} = matchesApi