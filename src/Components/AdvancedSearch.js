import React, { Component } from "react";
import SearchResult from "./SearchResult";

class AdvancedSearch extends Component {
  state = {
    department: null,
    departmentId: 0,
    isHighlight: false,
    showResult: false
  };

  handleInputChange = (event) => {
    this.setState({ departmentId: event.target.value });
  };

  componentDidMount() {
    this.fetchDepartment();
  }

  handleSubmit = (event) => {
    event.preventDefault(); // pour éviter que la page se recharge
    const selectedDepartmentId = event.target.department.value;
    this.setState({ departmentId: selectedDepartmentId, showResult: true });

  };

  fetchDepartment = async () => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/departments`
    );
    const data = await response.json();
    const departments = data.departments;
    const dataSlice = departments
    this.setState({ department: dataSlice });
  };

  render() {
    const { department, departmentId, showResult } = this.state;
    return (
      <div className="flex flex-col gap-5">
        <form onSubmit={this.handleSubmit}>
          <h2>Recherche avancée :</h2>
          <h3>Département :</h3>
          {department?.map((dep, idx) => {
            return (
              <label key={idx}>
                <input
                  type="radio"
                  name="department"
                  value={dep.departmentId}
                  onChange={this.handleInputChange}
                />
                {dep.displayName}
              </label>
            );
          })}
          <br />
          <button
            className="px-4 py-2 border-2 rounded-lg hover:border-black transition-all duration-300"
            type="submit"
          >
            Rechercher
          </button>
        </form>
        { showResult &&
          <SearchResult
            advancedSearch={true}
            departmentId={departmentId}
          />
        }
      </div>
    );
  }
}

export default AdvancedSearch;
