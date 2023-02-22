import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import "../Style/App.css";
import SearchResult from "./SearchResult";

class QuickSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  handleClear = () => {
    this.setState({ searchValue: "", });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const searchInput = this.state.searchValue;
    console.log("handleSubmit -> searchInput", searchInput);
    if (searchInput === "") {
      return;
    }
    this.setState({ searchValue: searchInput });
  };

  handleChange = (e) => {
    this.setState({ searchValue: e.target.value });
    if (window.location.pathname !== "/") {
      useNavigate("/");
    }
  };

  render() {
    const { searchValue } = this.state;
    return (
      <div className="flex justify-center gap-10 p-4 flex-col border-black">
        <form
          className="flex justify-center gap-5"
          onSubmit={this.handleSubmit}
        >
          <input
            className="bg-gray-200 py-2.5 px-4 rounded-lg"
            type="text"
            placeholder="Rechercher..."
            name="searchInput"
            value={searchValue}
            onChange={this.handleChange}
          />
          <button
            className="bg-black hover:bg-white hover:text-black hover:border-black text-white font-bold py-2 px-4 rounded-lg border-2 border-black transition-colors duration-300"
            type="submit"
          >
            Rechercher
          </button>
        </form>
        {searchValue && searchValue !== "" && (
          <SearchResult searchValue={searchValue} onClearSearch={this.handleClear}/>
        )}
      </div>
    );
  }
}

export default QuickSearch;
