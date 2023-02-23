
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { v4 as uuid } from 'uuid';
import store from '../../store';

import { heroCreated } from '../heroesList/heroesSlice';
import { selectAll } from '../heroesFilters/filtersSlice';

const HeroesAddForm = () => {
   const [heroName, setHeroName] = useState('');
   const [heroDescription, setHeroDescription] = useState('');
   const [heroElement, setHeroElement] = useState('');

   const {filtersLoadingStatus}  = useSelector (state => state.filters);
   const filters = selectAll(store.getState());

   const dispatch = useDispatch();
   const {request} = useHttp();


   function resetInputs () {
      setHeroName('');
      setHeroDescription('');
      setHeroElement('');
   }
   function onSubmit(e) {
      e.preventDefault();

      const newHero = {
         id: uuid(),
         name: heroName,
         description: heroDescription,
         element: heroElement
      }
     
      request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
         .then(data => console.log('success'))
         .then(data => dispatch(heroCreated(newHero)))
         .catch(err  => console.log(err));
      resetInputs();
   }

   const renderFilters = (filters, status) => {
      if (status === "loading") {
          return <option>Loading elements</option>
      } else if (status === "error") {
          return <option>Loadng error</option>
      }
      
      if (filters && filters.length > 0 ) {
          return filters.map(({name, label}) => {
              // eslint-disable-next-line
              if (name === 'all')  return;

              return <option key={name} value={name}>{label}</option>
          })
      }
  }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Hero's name</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What's my name?"
                    value={heroName}
                    onChange={(e)=> setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="What I am able of?"
                    style={{"height": '130px'}}
                    value={heroDescription}
                    onChange={(e)=> setHeroDescription(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Hero's element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e)=> setHeroElement(e.target.value)}>
                    <option >My power is...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;