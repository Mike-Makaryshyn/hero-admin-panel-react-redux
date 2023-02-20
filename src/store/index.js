import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';


const stringMiddfleware = (store) => (next) => (action) => {
   // in dispatch by default we can pass only an object.
   // This middleware make real passing string to dispatch method and assign it as action
   // Middleware can work only with dispatch (next = dispatch)
   // if we wanna pass function in dispatch instead of an object we can use redux thunk
   // the biggest reason for this is to add some async function in dispatch instead of obj. Therefore we can work witth request for instance in dispatch directly which makes posiible to reuse this dispatch.
    if(typeof action === 'string') {
      return next({
         type:  action
      })
   }

   return next(action); 
}

// enhancer can work not only with dispatch but also with other thing to improve our store.
// const enhancer  = (createStore) => (...args) => {
//    const store = createStore(...args);

//    const oldDispatch = store.dispatch;
//    store.dispatch = (action) => {
//       if(typeof action === 'string') {
//          return oldDispatch({
//             type:  action
//          })
//       }

//       return oldDispatch(action); 
//    } 

//    return store;
// }

const store = createStore(
                  combineReducers({filters, heroes}), 
                  compose(
                     applyMiddleware(ReduxThunk, stringMiddfleware),
                     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                  )
                  // compose(
                  //    enhancer,
                  //    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                  // )
                  );

export default store;
