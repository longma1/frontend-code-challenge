import React, { useState, useRef } from 'react';
import NoResultCard from './NoResultCard'
import PokemonCard from './PokemonCard'

import './App.css';

var MAX_CARDS_DISPLAYED = 4;

function SearchApp(props) {
    const searchResults = useRef(props.pokedex);

    const [displayedResults, setDisplayedResults] = useState(searchResults.current.slice(0, MAX_CARDS_DISPLAYED));
    const [orderByCP, setOrderByCP] = useState(false);



    const searchPokemon = (search) => {
        let result = new Set();
        let nameSearch = props.pokedex.filter((pokemon) => {
            return pokemon.Name.includes(search);
        })

        let typeSearch = props.pokedex.filter((pokemon) => {
            return pokemon.Types.filter((type) => type.includes(search)).length > 0;
        })

        for (let i = 0; i < nameSearch.length; i++) {
            result.add(nameSearch[i]);
        }
        for (let i = 0; i < typeSearch.length; i++) {
            result.add(typeSearch[i]);
        }

        searchResults.current = Array.from(result);

        updateDisplay();

        return null;
    }

    const updateDisplay = () => {
        if (!orderByCP) {
            setDisplayedResults(searchResults.current.slice(0, MAX_CARDS_DISPLAYED));
        }
        else {
            console.log(orderByCP);
            let orderedResults = searchResults.current.sort((a, b) => { return (a.MaxCP < b.MaxCP) });
            setDisplayedResults(orderedResults.slice(0, MAX_CARDS_DISPLAYED));
        }
    }


    const handleChangeSearch = (e) => {
        e.preventDefault();
        searchPokemon(e.target.value);
    }

    const handleChangeOrderBy = (e) => {
        e.preventDefault();
        setOrderByCP(e.target.value);
        updateDisplay();
    }

    if (props.loading) {
        return <div className="loader"></div>
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
            <ul className="suggestions">
                {displayedResults.length === 0 ? <NoResultCard key="NoResultCard" /> : displayedResults.map((pokemon) => {
                    return <PokemonCard key={pokemon.Number} pokemon={pokemon} />
                })}
            </ul>
        </>);
}

export default SearchApp;
