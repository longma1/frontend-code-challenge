import React from 'react';

const PokemonCard = (props) => {
    let types = [];

    for (let i = 0; i < props.pokemon.Types.length; i++) {
        types.push(<span key={props.pokemon.Number + props.pokemon.Types[i]} className={"type " + props.pokemon.Types[i].toLowerCase()}> {props.pokemon.Types[i]}</span >);
    }

    return (
        <li>
            <img src={props.pokemon.img} alt="" />
            <div className="info">
                <h1>{props.pokemon.Name}</h1>
                {types}
            </div>
        </li>
    )
}

export default PokemonCard;