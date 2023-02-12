import React, { Component } from "react";
import Object from "./Object";

import "../Style/App.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      startIndex: 0,
      endIndex: 20,
    };
  }

  handleSearch = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${this.state.query}`
      );
      const temp = await response.json();
      this.setState({ data: temp.objectIDs });
    } catch (error) {
      console.error(error);
    }
  };

  handleSeeMore = () => {
    this.setState((prevState) => {
      return {
        startIndex: 0,
        endIndex: prevState.endIndex + 20,
      };
    });
  };

  handleSeeLess = () => {
    this.setState((prevState) => {
      return {
        startIndex: 0,
        endIndex: prevState.endIndex - 20,
      };
    });
  };

  handleClear = () => {
    this.setState({
      query: '',
      data: null,
      startIndex: 0,
      endIndex: 20,
    });
  }

  render() {
    const { data, startIndex, endIndex } = this.state;
    const displayItems = data?.slice(startIndex, endIndex);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Rechercher..."
            value={this.state.query}
            onChange={this.handleSearch}
          />
          <button type="submit">Rechercher</button>
          {data && (
            <button type="button" onClick={this.handleClear}>
              Réinitialiser
            </button>
          )}
        </form>
        <div className="flex flex-wrap gap-3 content-center justify-center">
          {displayItems?.map((element, index) => (
            <Object key={index} object={element} />
          ))}
        </div>
        {endIndex > 20 && (
          <button onClick={this.handleSeeLess}>Voir moins</button>
        )}
        {endIndex < data?.length && (
          <button onClick={this.handleSeeMore}>Voir plus</button>
        )}
      </div>
    );
  }
}

export default SearchBar;
