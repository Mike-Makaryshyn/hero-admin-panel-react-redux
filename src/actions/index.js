export const fetchHeroes = (request) => (dispatch) => {
   dispatch(heroesFetching);
   request("http://localhost:3001/heroes")
      .then((heroes) => dispatch(heroesFetched(heroes)))
      .catch(() => dispatch(heroesFetchingError()));
};

export const heroesFetching = () => {
   return {
      type: "HEROES_FETCHING",
   };
};

export const heroesFetched = (heroes) => {
   return {
      type: "HEROES_FETCHED",
      payload: heroes,
   };
};

export const heroesFetchingError = () => {
   return {
      type: "HEROES_FETCHING_ERROR",
   };
};

export const fetchFilters = (request) => (dispatch) => {
   dispatch(filtersFetching);
   request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
};

export const filtersFetching = () => {
   return {
      type: "FILTERS_FETCHING",
   };
};

export const filtersFetched = (filters) => {
   return {
      type: "FILTERS_FETCHED",
      payload: filters,
   };
};

export const filtersFetchingError = () => {
   return {
      type: "FILTERS_FETCHING_ERROR",
   };
};

export const activeFilterChanged = (filter) => {
   return {
      type: "ACTIVE_FILTER_CHANGED",
      payload: filter,
   };
};

export const deleteHero = (request, id) => (dispatch) => {
   request(`http://localhost:3001/heroes/${id}`, 'DELETE')
   .then((data) => console.log('delete'))
   .then((data) => dispatch({type: "HERO_DELETED", payload: id}))
   .catch(err => console.log(err))
}

export const heroCreate = (heroes) => {
   return {
      type: "HERO_CREATED",
      payload: heroes,
   };
};
