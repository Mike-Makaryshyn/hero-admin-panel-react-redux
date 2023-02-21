import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	filters: [],
	filtersLoadingStatus: "idle",
	activeFilter: "all",
};

// createSlice give us opportuniti to wtite mutable code 
// it's reweriting it under the hood
// So, while using redux-toolkit(createSlice method) you can skip mutation thing
// In case you wanted to make ne objects with rest operator ...  and not mutate old obj you can just write kewword return and then redux-toolkit won't transform that code.
// In other words you don't need to wtite this:
//          return {
// 				...state,
// 				filters: action.payload,
// 				filtersLoadingStatus: "idle",
// 			};
// INSTEAD YOU JUST WRITE THIS:
//          {
//             state.filters = action.payload;
//             state.filtersLoadingStatus = 'idle';
//           }
const filtersSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      filtersFetching: state => {
         state.filtersLoadingStatus = 'loading';
      },
      filtersFetched: (state, action) => {
         state.filtersLoadingStatus = 'idle';
         state.filters = action.payload;
      },
      filtersFetchingError: state => {
         state.filtersLoadingStatus = 'error';
      },
      activeFilterChanged: (state, action) => {
         state.activeFilter = action.payload;
      },

   }
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {
   filtersFetching,
   filtersFetched,
   filtersFetchingError,
   activeFilterChanged
} = actions;