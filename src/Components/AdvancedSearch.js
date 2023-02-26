import React, { Component } from "react";
import SearchResult from "./SearchResult";

class AdvancedSearch extends Component {
  state = {
    department: null,
    departmentId: 0,
    isHighlight: false,
    showResult: false,
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
    const dataSlice = departments;
    this.setState({ department: dataSlice });
  };

  render() {
    const { department, departmentId, showResult } = this.state;
    return (
      <div className="flex flex-col gap-5">
        <form onSubmit={this.handleSubmit}>
          <h2 className="text-xl font-bold">Recherche avancée :</h2>
          <h3 className="font-bold">Département :</h3>
          <div className="border-collapse">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                {department?.map((dep, idx) => {
                  return (
                    <label key={idx} className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-gray-600"
                        name="department"
                        value={dep.departmentId}
                        onChange={this.handleInputChange}
                      />
                      <span className="ml-2">{dep.displayName}</span>
                    </label>
                  );
                })}
              </div>
          </div>
          <br />
          <button
            className="bg-black hover:bg-white hover:text-black hover:border-black text-white font-bold py-2 px-4 rounded-lg border-2 border-black transition-colors duration-300"
            type="submit"
          >
            Rechercher
          </button>
        </form>
        {showResult && (
          <SearchResult advancedSearch={true} departmentId={departmentId} />
        )}
      </div>
    );
  }
}

export default AdvancedSearch;
