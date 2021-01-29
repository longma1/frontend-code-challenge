import React, { useState } from 'react';
import NoResultCard from './NoResultCard'
import PokemonCard from './PokemonCard'

import './App.css';

var MAX_CARDS_DISPLAYED = 4;

function SearchApp(props) {
    const [searchResults, setSearchResults] = useState(props.pokedex);
    const [orderByCP, setOrderByCP] = useState(false);

    var displayedResults = searchResults.slice(0, MAX_CARDS_DISPLAYED);

    const searchPokemon = (search) => {
        let result = new Set();
        let nameSearch = props.pokedex.filter((pokemon) => {
            return pokemon.Name.includes(search);
        })

        let typeSearch = props.pokedex.filter((pokemon) => {
            return pokemon.Types.includes(search);
        })

        for (let i = 0; i < nameSearch.length; i++) {
            result.add(nameSearch[i]);
        }
        for (let i = 0; i < typeSearch.length; i++) {
            result.add(typeSearch[i]);
        }

        setSearchResults(Array.from(result));
        displayedResults = searchResults.slice(0, MAX_CARDS_DISPLAYED);

        return null;
    }


    const handleChangeSearch = (e) => {
        e.preventDefault();
        searchPokemon(e.target.value);
    }

    const handleChangeOrderBy = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <label htmlFor="maxCP" className="max-cp">
                <input type="checkbox" id="maxCP" value={orderByCP} onChange={handleChangeOrderBy} />
                <small>
                    Maximum Combat Points
                </small>
            </label>
            <input type="text" className="input" placeholder="Pokemon or type" onChange={handleChangeSearch} />
            {props.loading ? <div className="loader"></div> : <></>}
            <ul className="suggestions">
                {displayedResults.length === 0 ? <NoResultCard /> : displayedResults.map((pokemon) => { return <PokemonCard pokemon={pokemon} /> })}
            </ul>
        </>);
}

export default SearchApp;
