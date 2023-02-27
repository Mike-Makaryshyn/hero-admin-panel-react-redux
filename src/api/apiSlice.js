
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTX Query helps us not to create a state with our data from server but work direct with servers and cached data with redux-toolkit.
// For heroes we used that aproach, for filters we used another where our data from server being stored in global store. 
// Thes aproach reduces amout of code and is more optimized. Simple rule - data from server - use RTX query, some data that depends on our client such as activeFilters(when user click on it) then we use our global state and store it there 
// RTX Query provides is loading, is fetching, is error, error atc. No need to create that on your own. 

export const heroesApi = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
   tagTypes: ['Heroes'],
   endpoints: (builder) => ({
      getHeroes: builder.query({
         query: ()=> '/heroes',
         providesTags: ['Heroes']
      }),
      createHero: builder.mutation({
         query: (hero) => ({
            url: `/heroes`,
            method: 'POST',
            body: hero
         }),
         invalidatesTags: ['Heroes']
      }),
      deleteHero: builder.mutation({
         query: (id) => ({
            url: `/heroes/${id}`,
            method: 'DELETE',
            body: id
         }),
         invalidatesTags: ['Heroes']
      })
   })
})

export const { useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation } = heroesApi;