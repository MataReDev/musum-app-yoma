import React, { Component } from "react";
import Object from "./Object";

import '../Style/App.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  handleSearch = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = async (event) => {
    console.log("recherche");
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

  render() {
    const { data } = this.state;
    const items = Array.isArray(data) ? data : [];
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
        </form>
        <div className="flex flex-wrap gap-3 content-center justify-center">
          {items.map(
            (element, index) => (
                <Object key={index} object={element} />
            )
          )}
        </div>
      </div>
    );
  }
}

export default SearchBar;
