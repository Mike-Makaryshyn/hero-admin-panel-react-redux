import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { createSelector } from 'reselect';

import { fetchHeroes, heroDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

   const filteredHeroesSelector = createSelector(
      // createSelector is used for otimization useSelect since it rerender on every state change (for instance click on all filter server times == several rerenders of our component)
      (state) => state.filters.activeFilter,
      (state) => state.heroes.heroes,
      (activeFilter,  heroes) => { 
         if(activeFilter === 'all') return heroes;
     
         return heroes.filter(item => item.element === activeFilter)
      }
   )

   const filteredHeroes = useSelector(filteredHeroesSelector);

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
       dispatch(fetchHeroes(request));
      // eslint-disable-next-line
    }, []);
    

    function onDelete(id) {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
         .then((data) => console.log('delete'))
         .then((data) => dispatch(heroDelete(id)))
         .catch(err => console.log(err))
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
               <CSSTransition
                    timeout={0}
                    classNames="hero">
                  <h5 className="text-center mt-5">No heroes yet</h5>
               </CSSTransition>
            ) 
        }

        return arr.map(({id, ...props}) => {
            return (
               <CSSTransition 
                        key={id}
                        timeout={500}
                        classNames="hero">
                  <HeroesListItem key={id} onDelete={() => onDelete(id)} {...props}/>
               </CSSTransition>
            ) 
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
      <TransitionGroup component="ul">
         {elements}
       </TransitionGroup>
    )
}

export default HeroesList;
