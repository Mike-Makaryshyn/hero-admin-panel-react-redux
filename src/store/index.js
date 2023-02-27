import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filtersSlice';
import { heroesApi } from '../api/apiSlice';

// our custom middleware
const stringMiddfleware = (store) => (next) => (action) => {
   //dispatch by default we can pass only an object.
   // This middleware make real passing string to dispatch method and assign it as action
   // Middleware can work only with dispatch (next = dispatch)
   // if we wanna pass function in dispatch instead of an object we can use redux thunk
   // the biggest reason for this is to add some async function in dispatch instead of obj. Therefore we can work witth request for instance  in in dispatch directly which makes posiible to reuse this dispatch.
    if(typeof action === 'string') {
      return next({
         type:  action
      })
   }

   return next(action); 
}

const store = configureStore({
   reducer: { filters, [heroesApi.reducerPath]: heroesApi.reducer },
   // redux-toolkid includes popular middlewares such as thunk by default (getDefaultMiddleware) 
   //  and you can add new middleware with concat method
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddfleware, heroesApi.middleware),
   devTools: process.env.NODE_ENV !== 'production',
})

export default store;
