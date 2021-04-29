import { Component } from 'react';
import request from 'superagent';
import './App.css';
import React from 'react';
import Header from '../src/Header/Header.js';
import PokemonList from '../src/PokemonList.js';

const POKEMON_API_URL = 'https://pokedex-alchemy.herokuapp.com/api/pokedex';

class App extends Component {
  state = {
    pokemon: null,
    loading: false,
    search: '',
    page: 1
  }

  componentDidMount() {
    this.fetchPokemon();
  }

  async fetchPokemon() {
    const { search, page } = this.state;

    this.setState({ loading: true });

    try {
      const response = await request
        .get(POKEMON_API_URL)
        .query({ pokemon: search })
        .query({ page: page });

      this.setState({ pokemon: response.body.results });
    }
    catch (err) {
      console.log(err);
    }
    finally {
      this.setState({ loading: false });
    }
  }

  handleSearch = ({ search }) => {
    this.setState(
      { search: search, page: 1 },
      () => this.fetchPokemon()
    );
  }

  handlePrevPage = () => {
    this.setState(
      { page: Math.max(this.state.page - 1, 1) },
      () => this.fetchPokemon()
    );
  }

  handleNextPage = () => {
    this.setState(
      { page: this.state.page + 1 },
      () => this.fetchPokemon()
    );
  }

  render() {
    const { pokemon, loading, page } = this.state;

    return (
      <div className="App">

        <Header />

        {/* <section className="search-options">
          <Search onSearch={this.handleSearch} />
          <Paging
            page={page}
            onPrev={this.handlePrevPage}
            onNext={this.handleNextPage}
          />
        </section> */}

        <main>
          {pokemon && (pokemon.length
            ? <PokemonList pokemon={pokemon} />
            : <p>Sorry no pokemon...(</p>)
          }

          {loading && <img className="loading" src="loading.gif" alt="loading" />}

        </main>

      </div>
    );
  }

}

export default App;
