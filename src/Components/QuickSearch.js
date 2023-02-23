import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Style/App.css";

class QuickSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  handleClear = () => {
    this.setState({ searchValue: "" });
  };

  render() {
    const { searchValue } = this.state;
    const linkUrl = searchValue === "" ? "?search=\"\"" : `?search=${searchValue}`;
    return (
      <div className="flex justify-center gap-10 p-4 flex-col border-black">
        <form className="flex justify-center gap-5">
          <input
            className="bg-gray-200 py-2.5 px-4 rounded-lg"
            type="text"
            placeholder="Rechercher..."
            name="searchInput"
            value={searchValue}
            onChange={(event) =>
              this.setState({ searchValue: event.target.value })
            }
          />
          <Link
            to={`/result${linkUrl}`}
            className="bg-black hover:bg-white hover:text-black hover:border-black text-white font-bold py-2 px-4 rounded-lg border-2 border-black transition-colors duration-300"
            type="submit"
          >
            Rechercher
          </Link>
        </form>
      </div>
    );
  }
}

export default QuickSearch;
