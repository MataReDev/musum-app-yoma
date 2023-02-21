import React, { Component } from "react";
import Object from "./Object";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      startIndex: 0,
      endIndex: 20,
      showHighlightedOnly: false,
    };
  }

  componentDidUpdate() {
    this.searchItem();
  }

  searchItem = async () => {
    try {
      const endpoint = this.state.showHighlightedOnly 
        ? `https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=${this.props.searchValue}`
        : `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${this.props.searchValue}`;
      const response = await fetch(endpoint);
      const temp = await response.json();
      this.setState({ data: temp.objectIDs });
    } catch (error) {
      console.error(error);
    }
  };
  

  handleSeeLess = () => {
    this.setState((prevState) => {
      const newEndIndex = prevState.endIndex - 20;
      return {
        startIndex: 0,
        endIndex: newEndIndex < 20 ? 20 : newEndIndex,
      };
    });
  };

  handleSeeMore = () => {
    this.setState((prevState) => {
      const newEndIndex = prevState.endIndex + 20;
      return {
        startIndex: 0,
        endIndex:
          newEndIndex > this.state.data.length
            ? this.state.data.length
            : newEndIndex,
      };
    });
  };

  handleClear = () => {
    this.props.onClearSearch("");
  };

  toggleHighlightedOnly = () => {
    this.setState((prevState) => ({
      showHighlightedOnly: !prevState.showHighlightedOnly,
    }));
  };

  render() {
    const { data, startIndex, endIndex, showHighlightedOnly } = this.state;
    let items = data?.slice(startIndex, endIndex);
    return (
      <div className="flex flex-wrap gap-3 content-center justify-center">
        {data !== null ? (
          <div className="flex flex-row gap-5">
            <button
              className="bg-white hover:bg-gray-300 border-black text-black font-bold py-2 px-4 rounded-lg border-2  transition-colors duration-300"
              onClick={this.toggleHighlightedOnly}
            >
              {showHighlightedOnly ? "Show All" : "Show Highlighted Only"}
            </button>
            <button
              className="bg-black hover:bg-white hover:text-black hover:border-black text-white font-bold py-2 px-4 rounded-lg border-2 border-black transition-colors duration-300"
              type="button"
              onClick={this.handleClear}
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        )}

        <div
          className="flex flex-wrap justify-center items-stretch gap-4"
          style={{ alignItems: "stretch" }}
        >
          {items?.map((element, index) => (
            <Object key={index} object={element} />
          ))}
        </div>

        {data?.length > 0 && endIndex > 20 && (
          <button
            className="bg-black hover:bg-white hover:text-black hover:border-black text-white font-bold py-2 px-4 rounded-lg border-2 border-black transition-colors duration-300"
            onClick={this.handleSeeLess}
          >
            - Voir moins
          </button>
        )}
        {data?.length > 20 && (
          <button
            className="bg-black hover:bg-white hover:text-black hover:border-black text-white font-bold py-2 px-4 rounded-lg border-2 border-black transition-colors duration-300"
            onClick={this.handleSeeMore}
          >
            + Voir plus
          </button>
        )}
      </div>
    );
  }
}

export default SearchResult;
