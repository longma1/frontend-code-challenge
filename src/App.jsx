import React, { useState, useEffect } from 'react';
import './App.css';
import SearchApp from './SearchApp';

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => {
    const [pokedex, SetPokedex] = useState([])

    useEffect(() => {
        fetch(URL_PATH)
            .then((response) => {
                response.json().then(data => {
                    SetPokedex(data);
                });
            })
    }, []
    );

    return <SearchApp pokedex={pokedex} loading={pokedex.length === 0} />;
}

export default App