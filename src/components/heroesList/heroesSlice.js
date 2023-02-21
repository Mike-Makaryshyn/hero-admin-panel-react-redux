import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

// createSlice give us opportuniti to wtite mutable code 
// it's reweriting it under the hood
// So, while using redux-toolkit(createSlice method) you can skip mutation thing
// In case you wanted to make ne objects with rest operator ...  and not mutate old obj you can just write kewword return and then redux-toolkit won't transform that code.
// In other words you don't need to wtite this:
//          return {
// 				...state,
// 				heroes: action.payload,
// 				heroesLoadingStatus: "idle",
// 			};
// INSTEAD YOU JUST WRITE THIS:
//          {
//             state.heroes = action.payload;
//             state.heroesLoadingStatus = "idle";
//           }
const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes = action.payload;
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = "error";
    },
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroDeleted: (state, action) => {
      state.heroes.filter((hero) => hero.id !== action.payload);
    },
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const { 
      heroesFetching, 
      heroesFetched,
      heroesFetchingError,
      heroCreated, 
      heroDeleted 
   } = actions;
