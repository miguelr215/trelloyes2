import React from 'react';
import './App.css';
import List from './List.js';
import STORE from './store.js';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2,4)
    + Math.random().toString(36).substring(2,4);
  return{
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum'
  }
}

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

class App extends React.Component {
  state = {
    store: STORE,
  };
  handleDeleteCard = (cardId) => {
    console.log('delete card running')
    const {lists, allCards} = this.state.store;
    console.log(allCards);
    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }))
    const newCards = omit(allCards, cardId);
    console.log(newCards);
    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  }
  handleAddRandomCard = (listId) => {
    console.log('add random card running')
    const newCard = newRandomCard()
    const newLists = this.state.store.lists.map(list => {
      if(list.id === listId){
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    })
    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  }
  renderList(store){
    const listMap = store.lists.map(list => {
      return(
      <List
          key={list.id}
          id={list.id}
          header={list.header}
          cards={list.cardIds.map(id => store.allCards[id])}
          onDeleteCard={this.handleDeleteCard}
          onAddRandomCard={this.handleAddRandomCard}
        />
        )
    })
    return listMap
  }
  render(){
    const { store } = this.state
    return (
      <main className='App'>
      <header className='App-header'>
        <h1>Trelloyes2!</h1>
      </header>
      <div className='App-list'>
        {this.renderList(store)}
      </div>
      </main>
    );
  }
}

export default App;
