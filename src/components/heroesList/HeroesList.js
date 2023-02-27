import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

   const { data: heroes = [], isLoading, isError } = useGetHeroesQuery();
   const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
      const filteredHeroes = heroes.slice();

      if(activeFilter === 'all') return filteredHeroes;

      return heroes.filter(item => item.element === activeFilter)
    }, [heroes, activeFilter])


    function onDelete(id) {
      deleteHero(id);
    }

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
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
