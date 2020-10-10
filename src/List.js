import React from 'react';
import './List.css';
import Card from './Card.js';

export default function List(props){
    return(
        <section className='List'>
        <header className='List-header'><h2>{props.header}</h2></header>
        <div className='List-cards'>
            {props.cards.map(function(card){
                return (
                    <Card 
                        title={card.title} 
                        content={card.content} 
                        key={card.id}
                        id={card.id}
                        onDeleteCard={props.onDeleteCard}
                    />
                );
                }
                )}
                <button
                    type='button'
                    onClick={() => props.onAddRandomCard(props.id)}>
                        + Add Random Card
                </button>
            
        </div>
        </section>
    )
}

List.defaultProps = {
    onAddRandomCard: () => {},
}