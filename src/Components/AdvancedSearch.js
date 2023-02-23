import React, { Component } from "react";
import SearchResult from "./SearchResult";

class AdvancedSearch extends Component {
  state = {
    department: "",
    isHighlight: false,
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {};

  fetchDepartment = async () => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/departments`
    );
    const data = await response.json();
    if (data && data.departments) {
      console.log(dep);
      setDepartment(data);
    }
  };

  render() {
    return (
      <div className="flex flex-col gap-5">
        <form onSubmit={this.handleSubmit}>
          <h2>Recherche avancée :</h2>
          <h3>Département :</h3>
          <label>
            <input
              type="radio"
              name="department"
              value="Ancient Near Eastern Art"
              onChange={this.handleInputChange}
            />
            Ancient Near Eastern Art
          </label>
          <label>
            <input
              type="radio"
              name="department"
              value="Egyptian Art"
              onChange={this.handleInputChange}
            />
            Egyptian Art
          </label>
          <label>
            <input
              type="radio"
              name="department"
              value="Greek and Roman Art"
              onChange={this.handleInputChange}
            />
            Greek and Roman Art
          </label>
          <label>
            <input
              type="radio"
              name="department"
              value="Asian Art"
              onChange={this.handleInputChange}
            />
            Asian Art
          </label>
          <br />
          <button type="submit">Rechercher</button>
        </form>
        <SearchResult advancedSearch={true} />
      </div>
    );
  }
}

export default AdvancedSearch;
